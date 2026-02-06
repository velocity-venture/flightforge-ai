"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { trainingModules, categoryLabels, type TrainingModule } from "@/lib/training-data";

interface ModuleProgress {
  moduleId: string;
  completed: number;
  total: number;
}

const mockProgress: ModuleProgress[] = [
  { moduleId: "aerodynamics", completed: 6, total: 8 },
  { moduleId: "weather-theory", completed: 3, total: 9 },
  { moduleId: "navigation", completed: 0, total: 7 },
  { moduleId: "far-aim", completed: 7, total: 7 },
  { moduleId: "maneuvers-basic", completed: 4, total: 8 },
  { moduleId: "maneuvers-advanced", completed: 0, total: 7 },
  { moduleId: "checkride-oral", completed: 2, total: 7 },
  { moduleId: "checkride-practical", completed: 0, total: 8 },
];

function getProgress(moduleId: string) {
  const p = mockProgress.find((mp) => mp.moduleId === moduleId);
  if (!p) return 0;
  return Math.round((p.completed / p.total) * 100);
}

const categoryColors: Record<TrainingModule["category"], string> = {
  "ground-school": "bg-blue-100 text-blue-800",
  "flight-maneuvers": "bg-green-100 text-green-800",
  "checkride-prep": "bg-purple-100 text-purple-800",
  weather: "bg-orange-100 text-orange-800",
  regulations: "bg-red-100 text-red-800",
};

export default function DashboardPage() {
  const totalTopics = trainingModules.reduce((sum, m) => sum + m.topics.length, 0);
  const completedTopics = mockProgress.reduce((sum, p) => sum + p.completed, 0);
  const overallProgress = Math.round((completedTopics / totalTopics) * 100);
  const [selectedCategory, setSelectedCategory] = useState<TrainingModule["category"] | "all">("all");

  const filteredModules =
    selectedCategory === "all"
      ? trainingModules
      : trainingModules.filter((m) => m.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">✈️</span>
            <span className="font-bold text-xl text-[hsl(201,96%,32%)]">FlightForge.ai</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/training" className="text-sm text-muted-foreground hover:text-foreground">
              Training
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
        <h1 className="text-3xl font-bold mb-2">Flight Training Dashboard</h1>
        <p className="text-muted-foreground mb-8">Track your progress across all training modules.</p>

        {/* Overall Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{overallProgress}%</div>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
              <Progress value={overallProgress} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{completedTopics}/{totalTopics}</div>
              <p className="text-sm text-muted-foreground">Topics Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{trainingModules.length}</div>
              <p className="text-sm text-muted-foreground">Training Modules</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {trainingModules.reduce((s, m) => s + m.estimatedMinutes, 0)} min
              </div>
              <p className="text-sm text-muted-foreground">Total Study Time</p>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
          >
            All
          </Button>
          {(Object.keys(categoryLabels) as TrainingModule["category"][]).map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
            >
              {categoryLabels[cat]}
            </Button>
          ))}
        </div>

        {/* Module Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredModules.map((mod) => {
            const progress = getProgress(mod.id);
            return (
              <Card key={mod.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className={categoryColors[mod.category]} variant="secondary">
                      {categoryLabels[mod.category]}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{mod.estimatedMinutes} min</span>
                  </div>
                  <CardTitle className="text-lg">{mod.title}</CardTitle>
                  <CardDescription>{mod.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{progress}% complete</span>
                    <span className="text-sm text-muted-foreground">{mod.topics.length} topics</span>
                  </div>
                  <Progress value={progress} className="mb-4" />
                  <Link href={`/training/${mod.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      {progress > 0 ? "Continue" : "Start"} Module
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
