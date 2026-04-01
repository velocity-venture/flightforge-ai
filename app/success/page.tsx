"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";

function SuccessPageInner() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<"loading" | "valid" | "error">("loading");
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    fetch(`/api/verify-session?session_id=${encodeURIComponent(sessionId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) {
          setStatus("valid");
          setEmail(data.customerEmail ?? null);
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [sessionId]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="FlightForge" className="h-8 w-8" />
            <span className="font-bold text-lg text-[#0F172A] tracking-tight">
              FlightForge<span className="text-[#2563EB]">.ai</span>
            </span>
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4">
        {status === "loading" && (
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-[#2563EB] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#475569] font-medium">Verifying your subscription…</p>
          </div>
        )}

        {status === "valid" && (
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-extrabold text-[#0F172A] mb-3">Welcome aboard!</h1>
            <p className="text-lg text-[#475569] mb-2">
              Your FlightForge subscription is active.
            </p>
            {email && (
              <p className="text-sm text-[#475569] mb-8">Confirmation sent to {email}</p>
            )}
            <Link
              href="/chat"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-[#1d4ed8] transition-colors"
            >
              Start Training
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-3xl font-extrabold text-[#0F172A] mb-3">Something went wrong</h1>
            <p className="text-lg text-[#475569] mb-8">
              Please contact{" "}
              <a href="mailto:support@flightforge.ai" className="text-[#2563EB] underline">
                support@flightforge.ai
              </a>
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-6 py-3 text-sm font-semibold text-[#0F172A] hover:bg-slate-50 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      }
    >
      <SuccessPageInner />
    </Suspense>
  );
}
