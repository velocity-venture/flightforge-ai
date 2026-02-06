"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trainingModules, categoryLabels } from "@/lib/training-data";

export default function ModuleDetailPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const mod = trainingModules.find((m) => m.id === moduleId);

  if (!mod) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-lg font-medium mb-4">Module not found</p>
            <Link href="/training">
              <Button>Back to Training</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
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
        <Link href="/training" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">
          &larr; Back to Training Library
        </Link>

        <div className="mb-8">
          <Badge variant="secondary" className="mb-3">
            {categoryLabels[mod.category]}
          </Badge>
          <h1 className="text-3xl font-bold mb-2">{mod.title}</h1>
          <p className="text-lg text-muted-foreground mb-4">{mod.description}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{mod.topics.length} topics</span>
            <span>{mod.estimatedMinutes} min estimated</span>
          </div>
        </div>

        <div className="grid gap-3">
          {mod.topics.map((topic, i) => (
            <Card key={topic} className="hover:shadow-sm transition-shadow">
              <CardContent className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">
                    {i + 1}
                  </div>
                  <span className="font-medium">{topic}</span>
                </div>
                <Link href={`/chat?topic=${encodeURIComponent(topic)}&module=${mod.id}`}>
                  <Button size="sm" variant="outline">
                    Study with AI
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href={`/chat?module=${mod.id}`}>
            <Button size="lg">
              Practice Full Module with AI Mentor
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
