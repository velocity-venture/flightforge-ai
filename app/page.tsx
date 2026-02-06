"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: "📚",
    title: "Ground School Mastery",
    description: "AI-powered lessons covering aerodynamics, weather, navigation, and FAR/AIM regulations.",
  },
  {
    icon: "🤖",
    title: "AI Flight Mentor",
    description: "Chat with your personal CFI. Ask questions, get explanations, and drill on weak areas.",
  },
  {
    icon: "✈️",
    title: "Maneuver Walkthroughs",
    description: "Step-by-step breakdowns of every flight maneuver with ACS tolerance standards.",
  },
  {
    icon: "🎯",
    title: "Checkride Prep",
    description: "Oral exam Q&A and practical test scenarios based on real DPE checkride patterns.",
  },
  {
    icon: "🌦️",
    title: "Weather Decision-Making",
    description: "Decode METARs, TAFs, and PIREPs. Practice go/no-go decisions with real scenarios.",
  },
  {
    icon: "📊",
    title: "Progress Tracking",
    description: "Track your readiness across all knowledge areas. Know exactly where to focus.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✈️</span>
            <span className="font-bold text-xl text-[hsl(201,96%,32%)]">FlightForge.ai</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/training" className="text-sm text-muted-foreground hover:text-foreground">
              Training
            </Link>
            <Link href="/checkride" className="text-sm text-muted-foreground hover:text-foreground">
              Checkride Prep
            </Link>
            <Link href="/dashboard">
              <Button size="sm">Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Your AI Copilot for{" "}
            <span className="text-[hsl(201,96%,32%)]">Flight Training</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Master ground school, ace your checkride, and become a confident pilot.
            FlightForge.ai is your personal AI CFI — available 24/7.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Training Free
              </Button>
            </Link>
            <Link href="/chat">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Try AI Mentor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need to Pass Your Checkride
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <Card key={f.title} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="text-3xl mb-2">{f.icon}</div>
                  <CardTitle className="text-lg">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Solo with Confidence?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join student pilots who are using AI to accelerate their training and pass
            their checkride on the first attempt.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="text-lg px-10 py-6">
              Get Started — It&apos;s Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <span>FlightForge.ai — A Velocity Venture Holdings Product</span>
          <span>Built for student pilots, by pilots.</span>
        </div>
      </footer>
    </div>
  );
}
