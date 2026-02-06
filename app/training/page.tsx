"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trainingModules, categoryLabels, getModulesByCategory, type TrainingModule } from "@/lib/training-data";

const categoryIcons: Record<TrainingModule["category"], string> = {
  "ground-school": "📚",
  "flight-maneuvers": "✈️",
  "checkride-prep": "🎯",
  weather: "🌦️",
  regulations: "📋",
};

export default function TrainingPage() {
  const categories = Object.keys(categoryLabels) as TrainingModule["category"][];

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
            <Link href="/chat" className="text-sm text-muted-foreground hover:text-foreground">
              AI Mentor
            </Link>
            <Link href="/checkride" className="text-sm text-muted-foreground hover:text-foreground">
              Checkride
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Training Library</h1>
        <p className="text-muted-foreground mb-8">
          {trainingModules.length} modules covering everything you need for your Private Pilot checkride.
        </p>

        {categories.map((cat) => {
          const modules = getModulesByCategory(cat);
          return (
            <section key={cat} className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{categoryIcons[cat]}</span>
                <h2 className="text-2xl font-bold">{categoryLabels[cat]}</h2>
                <Badge variant="secondary">{modules.length} modules</Badge>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {modules.map((mod) => (
                  <Card key={mod.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{mod.title}</CardTitle>
                      <CardDescription>{mod.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {mod.topics.slice(0, 4).map((t) => (
                          <Badge key={t} variant="outline" className="text-xs">
                            {t}
                          </Badge>
                        ))}
                        {mod.topics.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{mod.topics.length - 4} more
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{mod.estimatedMinutes} min</span>
                        <Link href={`/training/${mod.id}`}>
                          <Button size="sm">Start</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
