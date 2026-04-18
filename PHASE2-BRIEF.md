# FlightForge Phase 2. Modernize Build Brief

## Context
- **Frontend:** Next.js 14 static export at `/Users/m3_ai_factory/Projects/flightforge-ai/`
- **API Gateway:** Cloudflare Worker at `flightforge.ai/api/*` (same-origin), see `workers/api-gateway/worker.js` for exact routes and response shapes
- **Deploy:** `npm run build && npx wrangler pages deploy out --project-name flightforge --branch main`
- **Design:** Light theme, Inter font, sky blue (#2563EB) + navy (#0F172A) + amber (#F59E0B)

## Worker API Endpoints (already deployed, DO NOT modify the worker)

### POST `/api/gemini/chat`
Request: `{ message: string, persona: "captain_reynolds" | "jordan", enforceGate?: boolean }`
Response: `{ response: string, persona: string, citationAccepted: boolean, citationValidation: { hasCitation, citations[], citationCount, hasSpecificPage } | null, suggestsMastery: boolean, latencyMs: number }`

### POST `/api/create-checkout`
Response: `{ url: string, sessionId: string }`: redirect user to `url`

### GET `/api/verify-session?session_id=XXX`
Response: `{ valid: boolean, customerEmail?: string, status?: string }`

### GET `/api/health`
Response: health status with service availability

## Tasks (in order)

### Task 1: Rewire Chat Page (`app/chat/page.tsx`)
- Change `API_BASE_URL` from `https://flightforge-api.moe3rd.workers.dev` to empty string `""` (same-origin calls to `/api/*`)
- Fix response parsing: the Worker returns `data.response` NOT `data.reply`: update accordingly
- Add a persona selector UI at the top of the chat: toggle between "Captain Reynolds" (Socratic CFI) and "Jordan" (overconfident student). Default to "captain_reynolds". Send selected persona in the API request body.
- After each assistant message, display Citation Gate status inline:
  - If `citationValidation.hasCitation` is true: show a green badge "✅ Citation Validated" with the matched references
  - If `citationValidation.hasCitation` is false: show a subtle gray badge "📝 No citation detected"
  - If `suggestsMastery` is true: show a gold badge "🏆 Mastery Demonstrated!"
  - If `citationAccepted` is true: show "📚 FAA Reference Accepted"
- Keep the existing chat UI layout and styling but make these additions fit the light theme
- Remove the `openai` package import if present anywhere in this file

### Task 2: Wire Stripe Checkout on Landing Page (`app/page.tsx`)
- Find the pricing section CTA buttons ("Start Free Demo" and the paid tier buttons)
- Wire the paid pricing button(s) to call `POST /api/create-checkout` and redirect to `session.url`
- The free demo button should navigate to `/chat`
- Add loading state on the checkout button while the API call is in flight

### Task 3: Build Success Page (`app/success/page.tsx`)
- Create `app/success/page.tsx`
- On mount, read `session_id` from URL search params
- Call `GET /api/verify-session?session_id=XXX`
- Show success state if `valid === true`: "Welcome aboard! Your FlightForge subscription is active." with a CTA to go to `/chat`
- Show error state if `valid === false`: "Something went wrong. Please contact support@flightforge.ai"
- Use the same light theme and styling as the rest of the site

### Task 4: Remove OpenAI dependency
- Run `npm uninstall openai`
- Search all files for any remaining `openai` imports and remove them
- The project uses Gemini via the CF Worker, no OpenAI SDK needed

### Task 5: Build and verify
- Run `npm run build` to verify static export works with no errors
- If there are TypeScript errors, fix them
- Do NOT deploy, just ensure it builds cleanly

## Design Notes
- Keep the existing Tailwind/shadcn component system
- Persona selector: simple segmented control or dropdown, not a full page
- Citation badges: small inline elements below assistant messages, not modal/popup
- Everything should match the existing light theme (white bg, navy text, blue/amber accents)

## DO NOT
- Modify the Cloudflare Worker (`workers/` directory)
- Change the landing page design/layout beyond adding Stripe button wiring
- Add any new npm dependencies beyond what's already in package.json
- Add dark mode
- Change the logo or nav

When completely finished, run this command to notify me:
openclaw system event --text "Done: FlightForge Phase 2. Chat wired to Gemini Worker, persona selector + Citation Gate UI added, Stripe checkout connected, success page built, OpenAI removed" --mode now
