"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const API_BASE_URL = "";

type Persona = "captain_reynolds" | "jordan";

interface CitationValidation {
  hasCitation: boolean;
  citations: string[];
  citationCount: number;
  hasSpecificPage: boolean;
}

interface AssistantMeta {
  citationValidation: CitationValidation | null;
  suggestsMastery: boolean;
  citationAccepted: boolean;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  meta?: AssistantMeta;
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>}>
      <ChatPageInner />
    </Suspense>
  );
}

function CitationBadges({ meta }: { meta?: AssistantMeta }) {
  if (!meta) return null;

  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {meta.citationAccepted && (
        <span className="inline-flex items-center gap-1 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-2.5 py-0.5">
          📚 FAA Reference Accepted
        </span>
      )}
      {meta.citationValidation?.hasCitation ? (
        <span className="inline-flex items-center gap-1 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-2.5 py-0.5">
          ✅ Citation Validated
          {meta.citationValidation.citations.length > 0 && (
            <span className="text-emerald-500 ml-1">
              ({meta.citationValidation.citations.join(", ")})
            </span>
          )}
        </span>
      ) : meta.citationValidation ? (
        <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-50 text-gray-500 border border-gray-200 rounded-full px-2.5 py-0.5">
          📝 No citation detected
        </span>
      ) : null}
      {meta.suggestsMastery && (
        <span className="inline-flex items-center gap-1 text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2.5 py-0.5">
          🏆 Mastery Demonstrated!
        </span>
      )}
    </div>
  );
}

function ChatPageInner() {
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic");
  const moduleId = searchParams.get("module");

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: topic
        ? `Welcome! Let's study **${topic}**. What would you like to know? I can explain concepts, quiz you, or walk through scenarios.`
        : "Welcome to your AI Flight Mentor! I'm here to help you master ground school and prepare for your checkride. What would you like to study today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [persona, setPersona] = useState<Persona>("captain_reynolds");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/gemini/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          persona,
          sessionHistory: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error("Failed to get response");
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response,
          meta: {
            citationValidation: data.citationValidation ?? null,
            suggestsMastery: data.suggestsMastery ?? false,
            citationAccepted: data.citationAccepted ?? false,
          },
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting. Please check that the API is configured and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const quickPrompts = [
    "Explain the four forces of flight",
    "Quiz me on airspace classes",
    "What are the ACS tolerances for steep turns?",
    "Walk me through a METAR decode",
    "What documents must be on board the aircraft?",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">✈️</span>
            <span className="font-bold text-xl text-[hsl(201,96%,32%)]">FlightForge.ai</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/training" className="text-sm text-muted-foreground hover:text-foreground">
              Training
            </Link>
            <Link href="/checkride" className="text-sm text-muted-foreground hover:text-foreground">
              Checkride
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-1">AI Flight Mentor</h1>
        <p className="text-sm text-muted-foreground mb-4">
          {topic ? `Studying: ${topic}` : "Ask anything about flight training"}
        </p>

        {/* Persona Selector */}
        <div className="flex items-center gap-1 mb-4 bg-slate-100 rounded-lg p-1 w-fit">
          <button
            onClick={() => setPersona("captain_reynolds")}
            className={`text-sm font-medium px-4 py-2 rounded-md transition-colors ${
              persona === "captain_reynolds"
                ? "bg-white text-[#0F172A] shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Captain Reynolds
            <span className="text-xs text-slate-400 ml-1.5">Socratic CFI</span>
          </button>
          <button
            onClick={() => setPersona("jordan")}
            className={`text-sm font-medium px-4 py-2 rounded-md transition-colors ${
              persona === "jordan"
                ? "bg-white text-[#0F172A] shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Jordan
            <span className="text-xs text-slate-400 ml-1.5">Student</span>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="max-w-[80%]">
                <div
                  className={`rounded-lg px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
                {msg.role === "assistant" && <CitationBadges meta={msg.meta} />}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-secondary rounded-lg px-4 py-3">
                <p className="text-sm text-muted-foreground animate-pulse">Thinking...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => {
                  setInput(prompt);
                }}
                className="text-xs bg-secondary hover:bg-secondary/80 rounded-full px-3 py-1.5 text-secondary-foreground transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your flight mentor anything..."
            disabled={loading}
          />
          <Button type="submit" disabled={loading || !input.trim()}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
