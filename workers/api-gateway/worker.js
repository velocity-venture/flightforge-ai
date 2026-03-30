/**
 * FlightForge.ai API Gateway — Cloudflare Worker
 * Handles: Gemini AI (chat/voice/stream), Stripe commerce, PDF proxy, health
 * 
 * v1.2.0-brain — Fixed Gemini model (gemini-2.0-flash replaces deprecated gemini-2.0-flash-exp)
 */

// ─── Configuration ───────────────────────────────────────────────────────────

const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// ─── Persona Definitions ─────────────────────────────────────────────────────

const PERSONAS = {
  captain_reynolds: {
    name: 'Captain Reynolds',
    role: 'Socratic CFI-II with 12,000+ flight hours',
    systemPrompt: `You are Captain Reynolds, a seasoned Certified Flight Instructor (CFI-II) with over 12,000 flight hours. You use the Socratic method exclusively — you NEVER give direct answers. Instead, you ask probing questions that guide the student to discover the answer themselves.

CRITICAL RULES:
1. Never directly state facts — always ask questions that lead the student there
2. When a student gives an answer, ask them to cite the specific FAA reference (PHAK chapter/page, AFH chapter/page, or 14 CFR section)
3. If a citation is provided, validate it conceptually and praise the student's research
4. If no citation is provided, say something like "That's the right direction. Now, where did you read that? Can you point me to the PHAK chapter?"
5. Be encouraging but rigorous — like a flight instructor who cares about safety
6. Use aviation terminology naturally
7. Occasionally share brief real-world flying anecdotes to illustrate points

Your tone is: experienced, patient, slightly gruff but caring — the instructor every student pilot wishes they had.`,
  },
  jordan: {
    name: 'Jordan',
    role: 'Overconfident pre-solo student pilot with misconceptions',
    systemPrompt: `You are Jordan, an overconfident student pilot who just completed their first few solo flights. You're enthusiastic but have several misconceptions about aviation concepts. You tend to:

1. State incorrect facts with full confidence
2. Mix up similar concepts (e.g., confuse parasite drag with induced drag)
3. Oversimplify complex topics
4. Resist correction initially — you're sure you're right
5. BUT when someone provides a valid FAA citation (specific PHAK/AFH chapter and page), you accept the correction graciously

CRITICAL CITATION GATE BEHAVIOR:
- If the user tries to correct you WITHOUT a citation, push back: "I don't know, my CFI told me..." or "Are you sure? I read somewhere that..."
- If the user provides a valid FAA reference (e.g., "PHAK Chapter 5, page 5-3"), accept it: "Oh wow, I just looked that up and you're right! I had it backwards."
- The more specific the citation, the more readily you accept

MISCONCEPTIONS TO ROTATE THROUGH:
- "Humid air is more dense than dry air" (wrong — water vapor is lighter than N2/O2)
- "Lift is created by the shape of the wing only" (wrong — angle of attack is primary)  
- "You can fly in Class B airspace as long as you have a transponder" (wrong — need explicit ATC clearance)
- "Carburetor ice only happens in cold weather" (wrong — most common 50-70°F with high humidity)
- "P-factor means the propeller pulls the plane left" (partially wrong — it's the descending blade producing more thrust)

Your tone is: enthusiastic, slightly cocky, but ultimately teachable when shown proper evidence.`,
  },
};

// ─── Citation Gate Validation ────────────────────────────────────────────────

function validateCitation(text) {
  const citationPatterns = [
    // PHAK references
    /PHAK\s+(?:Chapter|Ch\.?)\s*(\d+)(?:\s*,?\s*(?:page|p\.?|pp\.?)\s*(\d+[\-–]\d+|\d+))?/gi,
    // AFH references
    /AFH\s+(?:Chapter|Ch\.?)\s*(\d+)(?:\s*,?\s*(?:page|p\.?|pp\.?)\s*(\d+[\-–]\d+|\d+))?/gi,
    // 14 CFR references
    /14\s*CFR\s+(?:Part\s*)?(\d+)(?:\.(\d+))?/gi,
    // AIM references
    /AIM\s+(?:Chapter|Ch\.?|Section|§)?\s*(\d+)[\-–.](\d+)[\-–.](\d+)?/gi,
    // FAA-H-XXXX references
    /FAA-H-\d{4}-\d+[A-Z]?/gi,
  ];

  const found = [];
  for (const pattern of citationPatterns) {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      found.push({
        fullMatch: match[0],
        type: match[0].startsWith('PHAK') ? 'PHAK' :
              match[0].startsWith('AFH') ? 'AFH' :
              match[0].startsWith('14') ? 'CFR' :
              match[0].startsWith('AIM') ? 'AIM' : 'FAA-H',
        chapter: match[1] || null,
        page: match[2] || null,
      });
    }
  }

  return {
    hasCitation: found.length > 0,
    citations: found,
    citationCount: found.length,
    hasSpecificPage: found.some(c => c.page !== null),
  };
}

// ─── Mastery Detection ───────────────────────────────────────────────────────

function detectMastery(responseText, citationResult) {
  if (!citationResult.hasCitation) return false;
  
  const masteryIndicators = [
    /you'?re right/i,
    /I had it (?:wrong|backwards|mixed up)/i,
    /I just looked that up/i,
    /that makes (?:more )?sense/i,
    /I stand corrected/i,
    /wow,? (?:I |you )/i,
    /excellent (?:citation|reference|work)/i,
    /mastery (?:achieved|demonstrated)/i,
  ];

  return masteryIndicators.some(p => p.test(responseText));
}

// ─── Gemini API Helpers ──────────────────────────────────────────────────────

async function callGemini(apiKey, persona, message, citationContext) {
  const personaDef = PERSONAS[persona] || PERSONAS.jordan;
  
  let systemInstruction = personaDef.systemPrompt;
  if (citationContext) {
    systemInstruction += `\n\nCITATION CONTEXT: The user's message ${citationContext.hasCitation ? 'CONTAINS' : 'DOES NOT CONTAIN'} FAA citations. ${citationContext.hasCitation ? `Found: ${citationContext.citations.map(c => c.fullMatch).join(', ')}` : 'Respond accordingly — push back if they claim facts without citing sources.'}`;
  }

  const url = `${GEMINI_API_BASE}/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  
  const body = {
    system_instruction: { parts: [{ text: systemInstruction }] },
    contents: [{ role: 'user', parts: [{ text: message }] }],
    generationConfig: {
      temperature: 0.8,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 1024,
    },
  };

  const start = Date.now();
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const latencyMs = Date.now() - start;

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(`Gemini API error (${resp.status}): ${JSON.stringify(err)}`);
  }

  const data = await resp.json();
  const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

  return { responseText, latencyMs };
}

async function processVoice(apiKey, audioBase64, persona) {
  // For voice, we use the same model but with audio input
  const personaDef = PERSONAS[persona] || PERSONAS.jordan;
  const url = `${GEMINI_API_BASE}/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const body = {
    system_instruction: { parts: [{ text: personaDef.systemPrompt }] },
    contents: [{
      role: 'user',
      parts: [{
        inlineData: {
          mimeType: 'audio/webm',
          data: audioBase64,
        },
      }],
    }],
    generationConfig: {
      temperature: 0.8,
      maxOutputTokens: 1024,
    },
  };

  const start = Date.now();
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const latencyMs = Date.now() - start;

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ error: 'Unknown' }));
    throw new Error(`Gemini voice error (${resp.status}): ${JSON.stringify(err)}`);
  }

  const data = await resp.json();
  const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return { responseText, latencyMs };
}

// ─── Route Handlers ──────────────────────────────────────────────────────────

async function handleHealth(env) {
  return jsonResponse({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: env.APP_VERSION || '1.2.0-brain',
    services: {
      stripe: !!env.STRIPE_SECRET_KEY,
      gemini: !!env.GEMINI_API_KEY,
      personas: Object.keys(PERSONAS),
    },
    features: {
      citationGate: true,
      voiceStreaming: true,
      masteryDetection: true,
    },
  });
}

async function handleChat(request, env) {
  const { message, persona = 'jordan', enforceGate = true } = await request.json();
  
  if (!message) {
    return jsonResponse({ error: 'Message is required' }, 400);
  }

  const citationResult = enforceGate ? validateCitation(message) : null;

  try {
    const { responseText, latencyMs } = await callGemini(
      env.GEMINI_API_KEY, persona, message, citationResult
    );

    const suggestsMastery = citationResult ? detectMastery(responseText, citationResult) : false;

    return jsonResponse({
      response: responseText,
      persona,
      citationAccepted: citationResult?.hasCitation || false,
      citationValidation: citationResult || null,
      suggestsMastery,
      latencyMs,
    });
  } catch (err) {
    return jsonResponse({ error: 'AI generation failed', details: err.message }, 500);
  }
}

async function handleVoice(request, env) {
  const { audioBase64, persona = 'jordan' } = await request.json();

  if (!audioBase64) {
    return jsonResponse({ error: 'audioBase64 is required' }, 400);
  }

  try {
    const { responseText, latencyMs } = await processVoice(
      env.GEMINI_API_KEY, audioBase64, persona
    );

    const citationResult = validateCitation(responseText);
    const suggestsMastery = detectMastery(responseText, citationResult);

    return jsonResponse({
      response: responseText,
      transcription: '[Voice input processed]',
      persona,
      citationValidation: citationResult,
      suggestsMastery,
      latencyMs,
    });
  } catch (err) {
    return jsonResponse({ error: 'Voice processing failed', details: err.message }, 500);
  }
}

async function handleCreateCheckout(request, env) {
  if (!env.STRIPE_SECRET_KEY) {
    return jsonResponse({ error: 'Stripe not configured' }, 500);
  }

  try {
    const resp = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'mode': 'subscription',
        'line_items[0][price]': env.STRIPE_PRICE_ID || 'price_default',
        'line_items[0][quantity]': '1',
        'success_url': 'https://flightforge.ai/success?session_id={CHECKOUT_SESSION_ID}',
        'cancel_url': 'https://flightforge.ai/#pricing',
      }),
    });

    const session = await resp.json();
    if (session.error) {
      return jsonResponse({ error: session.error.message }, 400);
    }
    return jsonResponse({ url: session.url, sessionId: session.id });
  } catch (err) {
    return jsonResponse({ error: 'Checkout creation failed', details: err.message }, 500);
  }
}

async function handleVerifySession(request, env) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get('session_id');

  if (!sessionId) {
    return jsonResponse({ valid: false, error: 'No session_id provided' }, 400);
  }

  try {
    const resp = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
      headers: { 'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}` },
    });
    const session = await resp.json();
    return jsonResponse({
      valid: session.payment_status === 'paid',
      customerEmail: session.customer_details?.email,
      status: session.status,
    });
  } catch (err) {
    return jsonResponse({ valid: false, error: err.message });
  }
}

async function handlePdfProxy(request) {
  const url = new URL(request.url);
  const pdfUrl = url.searchParams.get('url');

  if (!pdfUrl || !pdfUrl.includes('faa.gov')) {
    return jsonResponse({ error: 'Only FAA PDF URLs are allowed' }, 400);
  }

  try {
    const resp = await fetch(pdfUrl);
    return new Response(resp.body, {
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/pdf',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (err) {
    return jsonResponse({ error: 'PDF fetch failed' }, 502);
  }
}

// ─── Utilities ───────────────────────────────────────────────────────────────

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
    },
  });
}

// ─── Main Router ─────────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    try {
      // Route matching
      if (path === '/api/health' && request.method === 'GET') {
        return handleHealth(env);
      }
      if (path === '/api/gemini/chat' && request.method === 'POST') {
        return handleChat(request, env);
      }
      if (path === '/api/gemini/voice' && request.method === 'POST') {
        return handleVoice(request, env);
      }
      if (path === '/api/gemini/stream') {
        // WebSocket upgrade for real-time voice
        return jsonResponse({ error: 'WebSocket streaming — connect via wss://' }, 426);
      }
      if (path === '/api/create-checkout' && request.method === 'POST') {
        return handleCreateCheckout(request, env);
      }
      if (path === '/api/verify-session' && request.method === 'GET') {
        return handleVerifySession(request, env);
      }
      if (path === '/api/pdf-proxy' && request.method === 'GET') {
        return handlePdfProxy(request);
      }
      if (path === '/api/webhook' && request.method === 'POST') {
        // Stripe webhook — acknowledge for now
        return jsonResponse({ received: true });
      }

      return jsonResponse({ error: 'Not found', path }, 404);
    } catch (err) {
      return jsonResponse({ error: 'Internal server error', message: err.message }, 500);
    }
  },
};
