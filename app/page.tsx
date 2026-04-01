"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Shield,
  Award,
  MessageCircle,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Target,
  Mic,
  BarChart3,
  FileCheck,
  Plane,

} from "lucide-react";

/* ─────────────────────────────────────────────
   A. Navigation
   ───────────────────────────────────────────── */
function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="FlightForge" className="h-8 w-8" />
          <span className="font-bold text-lg text-[#0F172A] tracking-tight">
            FlightForge<span className="text-[#2563EB]">.ai</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            How It Works
          </a>
          <a href="#pricing" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            Pricing
          </a>
          <Link
            href="/chat"
            className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            Try Demo
          </Link>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1d4ed8] transition-colors"
        >
          Start Free
        </Link>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   B. Hero Section
   ───────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50/70 via-white to-white" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 border border-sky-100 px-3.5 py-1.5 text-xs font-medium text-[#2563EB] mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              AI-powered flight training
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-[1.1] mb-6">
              Master Your Private Pilot Training{" "}
              <span className="text-[#2563EB]">with AI</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#475569] leading-relaxed mb-8 max-w-lg">
              The only platform where <strong>YOU teach the AI</strong> — because
              teaching is the fastest way to learn. Every answer backed by real
              FAA references.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#F59E0B] px-6 py-3.5 text-base font-semibold text-[#0F172A] shadow-sm hover:bg-amber-400 transition-colors"
              >
                Start Free Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-6 py-3.5 text-base font-semibold text-[#0F172A] hover:bg-slate-50 transition-colors"
              >
                See How It Works
              </a>
            </div>
          </div>

          {/* Right — Citation Gate mock chat */}
          <div className="relative">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
              {/* Mock chat header */}
              <div className="flex items-center gap-3 px-5 py-3.5 border-b border-slate-100 bg-slate-50/50">
                <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">Jordan (Pre-Solo Student)</p>
                  <p className="text-xs text-slate-400">Citation Gate Active</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs text-emerald-600 font-medium">Live</span>
                </div>
              </div>

              {/* Chat messages */}
              <div className="p-5 space-y-4">
                {/* Jordan message */}
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-orange-600">J</span>
                  </div>
                  <div className="rounded-xl rounded-tl-sm bg-slate-50 border border-slate-100 px-4 py-3 max-w-[85%]">
                    <p className="text-sm text-[#0F172A]">
                      The altimeter works by measuring temperature changes — that&apos;s how it knows your altitude, right?
                    </p>
                  </div>
                </div>

                {/* Student correction */}
                <div className="flex gap-3 justify-end">
                  <div className="rounded-xl rounded-tr-sm bg-[#2563EB] px-4 py-3 max-w-[85%]">
                    <p className="text-sm text-white">
                      Not quite, Jordan. The altimeter measures <strong>atmospheric pressure</strong>, not temperature. It uses an aneroid wafer that expands and contracts with pressure changes.
                    </p>
                    <div className="mt-2 rounded-lg bg-white/15 px-3 py-2 border border-white/20">
                      <p className="text-xs text-sky-100 font-medium">
                        📖 PHAK Ch. 8, p. 8-2 — &quot;Altimeters&quot;
                      </p>
                    </div>
                  </div>
                </div>

                {/* System validation */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <p className="text-xs font-medium text-emerald-700">
                    Citation verified — PHAK Chapter 8, page 8-2 confirmed.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 rounded-xl bg-white border border-slate-200 shadow-lg px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                <Award className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Topic Mastery</p>
                <p className="text-sm font-bold text-[#0F172A]">Flight Instruments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   C. The Problem Section
   ───────────────────────────────────────────── */
function ProblemSection() {
  const stats = [
    { value: "$15,000+", label: "Average PPL cost" },
    { value: "20%", label: "First-attempt failure rate" },
    { value: "200+ hrs", label: "Study time for ground school" },
  ];

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-5">
          The $15,000 Problem
        </h2>
        <p className="text-lg text-[#475569] max-w-2xl mx-auto mb-14 leading-relaxed">
          Most student pilots spend $15,000–$20,000 earning their PPL. Ground school alone
          costs $279+ — and it&apos;s still just passive video. You watch, you forget, you fail.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mb-14">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <p className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-1">
                {s.value}
              </p>
              <p className="text-sm text-[#475569] font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="inline-flex items-center gap-2 text-[#2563EB] font-semibold">
          <span>There&apos;s a better way to learn</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   D. How It Works — 3-Step Bento Grid
   ───────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: <BookOpen className="w-6 h-6" />,
      title: "Study with Captain Reynolds",
      description:
        "Your AI CFI asks Socratic questions. You must cite real FAA sources — PHAK, AFH, AIM — to progress. No hand-holding, no guessing.",
      color: "bg-sky-50 text-[#2563EB] border-sky-100",
      iconBg: "bg-[#2563EB]",
    },
    {
      step: "02",
      icon: <Shield className="w-6 h-6" />,
      title: "Correct Jordan's Mistakes",
      description:
        "Jordan is an overconfident pre-solo student full of misconceptions. Find the errors, cite the right FAA reference, and teach Jordan the correct answer.",
      color: "bg-amber-50 text-amber-600 border-amber-100",
      iconBg: "bg-[#F59E0B]",
    },
    {
      step: "03",
      icon: <Award className="w-6 h-6" />,
      title: "Earn Mastery Certificates",
      description:
        "When you prove understanding with valid citations, you earn CFI-Bridge certificates for each topic. Real proof you know the material.",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      iconBg: "bg-emerald-500",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 px-4 sm:px-6 bg-gradient-to-b from-slate-50/50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#2563EB] tracking-wide uppercase mb-3">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-5">
            Learn by teaching, not by watching
          </h2>
          <p className="text-lg text-[#475569] max-w-xl mx-auto">
            Three steps to aviation mastery — backed by the science of active recall and the Feynman technique.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div
              key={s.step}
              className={`relative rounded-2xl border p-8 ${s.color} transition-shadow hover:shadow-lg`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`w-11 h-11 rounded-xl ${s.iconBg} flex items-center justify-center text-white`}>
                  {s.icon}
                </div>
                <span className="text-4xl font-extrabold opacity-10">{s.step}</span>
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">{s.title}</h3>
              <p className="text-[#475569] leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   E. Citation Gate Feature Showcase
   ───────────────────────────────────────────── */
function CitationGate() {
  return (
    <section id="features" className="py-20 lg:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — text */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-100 px-3.5 py-1.5 text-xs font-medium text-amber-700 mb-6">
              <Shield className="w-3.5 h-3.5" />
              What makes us different
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-5">
              The Citation Gate
            </h2>
            <p className="text-lg text-[#475569] leading-relaxed mb-8">
              Every answer must be backed by a real FAA reference. No hallucinations. No
              shortcuts. Cite the PHAK chapter and page number, and the system validates it
              in real time.
            </p>

            <div className="space-y-4">
              {[
                "Validates citations against PHAK, AFH, and AIM",
                "Prevents rote memorization — you must explain why",
                "Builds the same skills your CFI and DPE expect",
                "Tracks which references you've mastered",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#2563EB] mt-0.5 shrink-0" />
                  <p className="text-[#0F172A] font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — visual demo */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <p className="text-sm font-semibold text-[#0F172A]">Citation Gate — Live Validation</p>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                Active
              </span>
            </div>
            <div className="p-6 space-y-5">
              {/* Student input */}
              <div>
                <p className="text-xs text-slate-400 font-medium mb-2">YOUR ANSWER</p>
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                  <p className="text-sm text-[#0F172A]">
                    The altimeter measures atmospheric pressure using an aneroid wafer. As the aircraft climbs, pressure decreases, causing the wafer to expand and indicate a higher altitude.
                  </p>
                </div>
              </div>

              {/* Citation input */}
              <div>
                <p className="text-xs text-slate-400 font-medium mb-2">YOUR CITATION</p>
                <div className="rounded-xl border-2 border-[#2563EB] bg-sky-50/50 p-4 flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-[#2563EB] shrink-0" />
                  <p className="text-sm font-medium text-[#0F172A]">
                    PHAK Ch. 8, p. 8-2 — &quot;Altimeters&quot;
                  </p>
                </div>
              </div>

              {/* Validation result */}
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <p className="text-sm font-bold text-emerald-700">Citation Verified</p>
                </div>
                <p className="text-sm text-emerald-600">
                  PHAK Chapter 8, page 8-2 confirmed. Explanation matches source material. <strong>+1 mastery point</strong> for Flight Instruments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   F. What's Included / Pricing
   ───────────────────────────────────────────── */
function Pricing() {
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  async function handleCheckout() {
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Checkout failed");
      const data = await res.json();
      window.location.href = data.url;
    } catch {
      alert("Unable to start checkout. Please try again.");
      setCheckoutLoading(false);
    }
  }

  const features = [
    { icon: <BookOpen className="w-4 h-4" />, text: "All PHAK chapters covered" },
    { icon: <Target className="w-4 h-4" />, text: "ACS standards mapped to every topic" },
    { icon: <Mic className="w-4 h-4" />, text: "Voice AI mentor (Captain Reynolds)" },
    { icon: <BarChart3 className="w-4 h-4" />, text: "Real-time progress tracking" },
    { icon: <FileCheck className="w-4 h-4" />, text: "CFI-Bridge mastery certificates" },
    { icon: <Shield className="w-4 h-4" />, text: "Citation Gate validation engine" },
  ];

  return (
    <section id="pricing" className="py-20 lg:py-28 px-4 sm:px-6 bg-gradient-to-b from-white to-slate-50/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#2563EB] tracking-wide uppercase mb-3">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-5">
            Everything you need. One price.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Free tier */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold text-[#475569] uppercase tracking-wide mb-2">Free Demo</p>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-extrabold text-[#0F172A]">$0</span>
              <span className="text-[#475569]">forever</span>
            </div>
            <p className="text-[#475569] mb-6">Try 3 topics with full Citation Gate access. No credit card required.</p>
            <Link
              href="/chat"
              className="block w-full text-center rounded-lg border border-slate-200 px-6 py-3 text-sm font-semibold text-[#0F172A] hover:bg-slate-50 transition-colors mb-6"
            >
              Start Free Demo
            </Link>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-[#475569]">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                3 topics unlocked
              </li>
              <li className="flex items-center gap-2.5 text-sm text-[#475569]">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                Full Citation Gate experience
              </li>
              <li className="flex items-center gap-2.5 text-sm text-[#475569]">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                Captain Reynolds AI mentor
              </li>
            </ul>
          </div>

          {/* Pro tier */}
          <div className="relative rounded-2xl border-2 border-[#2563EB] bg-white p-8 shadow-lg shadow-sky-100/50">
            <div className="absolute -top-3.5 left-6 bg-[#2563EB] text-white text-xs font-semibold px-3 py-1 rounded-full">
              Best Value
            </div>
            <p className="text-sm font-semibold text-[#2563EB] uppercase tracking-wide mb-2">Full Access</p>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-extrabold text-[#0F172A]">$97</span>
              <span className="text-[#475569]">/year</span>
            </div>
            <p className="text-sm text-[#475569] mb-4">or $14.99/month</p>
            <p className="text-[#475569] mb-6">Unlimited access to every topic, chapter, and AI mentor mode.</p>
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="block w-full text-center rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1d4ed8] transition-colors mb-6 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {checkoutLoading ? "Redirecting to checkout…" : "Get Full Access"}
            </button>
            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f.text} className="flex items-center gap-2.5 text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  {f.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Comparison callout */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 sm:p-8">
          <p className="text-center text-sm font-semibold text-[#475569] uppercase tracking-wide mb-4">
            Compare the cost
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <div className="rounded-xl bg-white border border-slate-200 p-5">
              <p className="text-2xl font-extrabold text-[#0F172A]">$279</p>
              <p className="text-sm text-[#475569] mt-1">Sporty&apos;s Ground School</p>
            </div>
            <div className="rounded-xl bg-white border border-slate-200 p-5">
              <p className="text-2xl font-extrabold text-[#0F172A]">$279</p>
              <p className="text-sm text-[#475569] mt-1">King Schools</p>
            </div>
            <div className="rounded-xl bg-[#2563EB] p-5">
              <p className="text-2xl font-extrabold text-white">$97<span className="text-base font-semibold text-sky-200">/yr</span></p>
              <p className="text-sm text-sky-100 mt-1">FlightForge.ai + AI Mentor</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   G. Early Access CTA
   ───────────────────────────────────────────── */
function EarlyAccess() {
  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="rounded-2xl border border-slate-200 bg-white p-10 sm:p-14 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 border border-sky-100 px-3.5 py-1.5 text-xs font-medium text-[#2563EB] mb-6">
            <Plane className="w-3.5 h-3.5" />
            Early Access
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-5">
            Be among the first pilots to train with AI
          </h2>
          <p className="text-lg text-[#475569] leading-relaxed mb-8 max-w-xl mx-auto">
            FlightForge.ai is in early access. Join now and help shape the future of flight training.
          </p>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-[#1d4ed8] transition-colors"
          >
            Get Early Access
            <ArrowRight className="w-4 h-4" />
          </Link>

          <p className="text-sm text-[#475569] mt-6">
            Currently free during beta &bull; No credit card required
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   H. FAQ
   ───────────────────────────────────────────── */
function FAQ() {
  const faqs = [
    {
      q: "Is this a replacement for ground school?",
      a: "FlightForge.ai is a powerful study companion, not a replacement for an FAA-approved ground school course. It helps you deeply understand the material by teaching and citing real FAA references — the perfect complement to any ground school program.",
    },
    {
      q: "What FAA publications does it reference?",
      a: "FlightForge validates citations against three official FAA publications: the Pilot's Handbook of Aeronautical Knowledge (PHAK), the Airplane Flying Handbook (AFH), and the Aeronautical Information Manual (AIM).",
    },
    {
      q: "How does the Citation Gate work?",
      a: "When you answer a question or correct Jordan's mistake, you must include a specific FAA reference (e.g., \"PHAK Ch. 5, p. 5-3\"). The system validates that citation against our database of FAA source material before awarding mastery credit.",
    },
    {
      q: "Can I use this on mobile?",
      a: "Yes. FlightForge.ai is fully responsive and works on any device with a modern browser — phone, tablet, or desktop. Study at the airport, in the FBO, or at home.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 bg-gradient-to-b from-slate-50/50 to-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-5">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-slate-200 bg-white overflow-hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-[#0F172A] font-semibold hover:bg-slate-50 transition-colors list-none [&::-webkit-details-marker]:hidden">
                {faq.q}
                <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-5">
                <p className="text-[#475569] leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   I. Footer
   ───────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img src="/logo.png" alt="FlightForge" className="h-6 w-6" />
              <span className="font-bold text-[#0F172A] tracking-tight">
                FlightForge<span className="text-[#2563EB]">.ai</span>
              </span>
            </div>
            <p className="text-sm text-[#475569]">A Velocity Venture Holdings Product</p>
          </div>

          <div className="flex items-center gap-6 text-sm text-[#475569]">
            <a href="#" className="hover:text-[#0F172A] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#0F172A] transition-colors">Terms</a>
            <a href="mailto:support@flightforge.ai" className="hover:text-[#0F172A] transition-colors">Support</a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-xs text-slate-400 text-center">
            FlightForge.ai is a study aid, not a replacement for certified flight instruction.
            Always consult a qualified CFI and official FAA publications for flight training decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   Page Assembly
   ───────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <CitationGate />
      <Pricing />
      <EarlyAccess />
      <FAQ />
      <Footer />
    </div>
  );
}
