"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const oralQuestions = [
  {
    category: "Airworthiness",
    questions: [
      "What documents must be on board the aircraft before flight?",
      "What inspections are required and how do you verify compliance?",
      "What are the required instruments for day VFR flight?",
      "When is an aircraft considered unairworthy?",
    ],
  },
  {
    category: "Weather",
    questions: [
      "What are the VFR weather minimums for Class G airspace?",
      "How do you decode a METAR and TAF?",
      "What conditions indicate potential icing?",
      "Describe your personal weather minimums for cross-country flight.",
    ],
  },
  {
    category: "Aerodynamics",
    questions: [
      "What causes an aircraft to stall?",
      "Explain load factor and its effect on stall speed.",
      "What is P-factor and when is it most pronounced?",
      "Describe the difference between adverse yaw and Dutch roll.",
    ],
  },
  {
    category: "Regulations",
    questions: [
      "What are the passenger currency requirements for a private pilot?",
      "When is a flight plan required?",
      "What are the right-of-way rules?",
      "Describe the alcohol and drug regulations for pilots.",
    ],
  },
  {
    category: "Emergency Procedures",
    questions: [
      "Walk me through your engine failure on takeoff procedure.",
      "What would you do if you encountered IMC during a VFR flight?",
      "How would you handle a complete electrical failure?",
      "What is the lost procedures protocol?",
    ],
  },
];

export default function CheckridePage() {
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());

  function toggleReveal(key: string) {
    setRevealedAnswers((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div className="min-h-screen">
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
            <Link href="/chat" className="text-sm text-muted-foreground hover:text-foreground">
              AI Mentor
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Checkride Prep</h1>
        <p className="text-muted-foreground mb-8">
          Practice common DPE oral exam questions. Click a question to study it with the AI mentor.
        </p>

        <div className="grid gap-6">
          {oralQuestions.map((section) => (
            <Card key={section.category}>
              <CardHeader>
                <CardTitle className="text-xl">{section.category}</CardTitle>
                <CardDescription>{section.questions.length} practice questions</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                {section.questions.map((q, i) => {
                  const key = `${section.category}-${i}`;
                  return (
                    <div key={key} className="flex items-start justify-between gap-4 p-3 rounded-lg bg-secondary/50">
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="mt-0.5 shrink-0">
                          Q{i + 1}
                        </Badge>
                        <p className="text-sm">{q}</p>
                      </div>
                      <Link
                        href={`/chat?topic=${encodeURIComponent(q)}`}
                        className="shrink-0"
                      >
                        <Button size="sm" variant="outline">
                          Study
                        </Button>
                      </Link>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="text-lg font-bold mb-2">Ready for a Mock Oral?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Let the AI mentor simulate a full DPE oral exam session with random questions.
              </p>
              <Link href="/chat?topic=Mock%20Oral%20Exam%20-%20ask%20me%20checkride%20questions%20one%20at%20a%20time">
                <Button size="lg">Start Mock Oral Exam</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
