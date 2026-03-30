# FlightForge.ai Landing Page Rebuild — Task Brief

## Objective
Rebuild the flightforge.ai landing page from scratch. The current live site is a dark "glass cockpit" themed Vite SPA deployed to Cloudflare Pages. We're replacing it with a professional, premium landing page that does NOT look AI-generated.

## Current Architecture
- **Frontend:** Cloudflare Pages (`flightforge` project) — currently a Vite + vanilla JS build
- **API Gateway:** Cloudflare Worker (`flightforge-api`) — handles `/api/*` routes (Gemini AI, Stripe, PDF proxy)
- **Domain:** flightforge.ai (Cloudflare DNS)
- **This repo** is a Next.js 14 scaffold with basic pages (landing, chat, training, dashboard, checkride)

## What To Build

### 1. Rebuild as Next.js static export for Cloudflare Pages
- Use `next.config.js` with `output: 'export'` for static site generation
- The API is a separate Cloudflare Worker — the landing page just needs to be static HTML/CSS/JS
- Deploy target: `wrangler pages deploy out --project-name flightforge`

### 2. Design Direction — Stripe × Apple × Wise hybrid
Follow these design principles from top-rated UI/UX sites:

**From Stripe:**
- "Bento box" feature layouts
- Subtle gradients that feel premium, not flashy
- Dense information made visually stunning
- Clean typography hierarchy
- Light, airy backgrounds with subtle depth

**From Apple:**
- Generous white space — let the product breathe
- "Scrollytelling" — reveal features as user scrolls down
- Product-first — show the AI in action, don't just describe it
- High-quality imagery (we'll use aviation stock photos)

**From Wise:**
- Product-first interaction — interactive element above the fold
- Build trust through transparency
- Show the value before asking for signup

### 3. Color Palette
- **Primary background:** White / off-white (#FAFAFA or #F8FAFC)
- **Text:** Deep navy (#0F172A) for headings, (#475569) for body
- **Primary accent:** Sky blue (#2563EB) — clean, aviation-appropriate
- **Secondary accent:** Warm amber (#F59E0B) for CTAs and highlights
- **Subtle gradient:** Very light blue-to-white for section backgrounds
- NO dark mode. Light and professional.

### 4. Typography
- **Headings:** Inter (weight 600-800) — clean, modern, professional
- **Body:** Inter (weight 400) — readable at all sizes
- **NO monospace fonts** — kill the JetBrains Mono / terminal aesthetic
- Large, confident heading sizes (text-5xl to text-7xl for hero)

### 5. Page Sections (in scroll order)

#### A. Navigation
- Clean white sticky nav with subtle bottom border
- Logo: ✈️ FlightForge.ai (text, not image)
- Links: Features, How It Works, Pricing, Try Demo
- CTA button: "Start Free" (amber/sky blue)

#### B. Hero Section
- Large confident headline: "Master Your Private Pilot Training with AI"
- Subhead emphasizing the differentiation: "The only platform where YOU teach the AI — because teaching is the fastest way to learn"
- Two CTAs: "Start Free Demo" (primary) + "See How It Works" (secondary/ghost)
- Hero visual: A mock-up of the Citation Gate interaction (styled chat showing a student correcting an AI with a PHAK reference)

#### C. The Problem Section
- "The $15,000 Problem" — most students spend $15-20K on PPL. Ground school is $279+ and still boring.
- Quick stats: average training cost, failure rate, study hours wasted
- Transition: "There's a better way to learn"

#### D. How It Works — 3-Step Bento Grid
1. **Study with Captain Reynolds** — Your AI CFI asks Socratic questions. You must cite real FAA sources (PHAK, AFH) to progress. No hand-holding.
2. **Correct Jordan's Mistakes** — Jordan is an overconfident pre-solo student full of misconceptions. Find and correct errors using proper FAA references.
3. **Earn Your Mastery Certificates** — When you prove understanding with valid citations, you earn CFI-Bridge certificates for each topic.

#### E. Citation Gate Feature Showcase
- Visual demo of the Citation Gate — show a chat exchange where a student cites "PHAK Ch. 5, p. 5-3" and the system validates it
- Key point: "Every answer must be backed by real FAA references. No hallucinations. No shortcuts."
- This is the differentiator section — make it PROMINENT

#### F. What's Included / Pricing
- Feature list: All PHAK chapters, ACS standards coverage, voice AI mentor, progress tracking, mastery certificates
- Pricing: "Free demo — 3 topics" + "Full Access: $14.99/mo or $97/year"
- Comparison callout: "Sporty's: $279 | King Schools: $279 | FlightForge: $97/year with AI"

#### G. Built for Real Pilots (Social Proof placeholder)
- "Used by student pilots training for their PPL"
- Placeholder testimonial cards (we'll add real ones later)
- FAA references used counter: "Citations from 3 official FAA publications"

#### H. FAQ Section
- Is this a replacement for ground school?
- What FAA publications does it reference?
- How does the Citation Gate work?
- Can I use this on mobile?

#### I. Footer
- FlightForge.ai — A Velocity Venture Holdings Product
- Links: Privacy, Terms, Support (support@flightforge.ai)
- Disclaimer: "FlightForge.ai is a study aid, not a replacement for certified flight instruction"

### 6. Technical Requirements
- Next.js 14 with App Router
- Tailwind CSS for styling
- Static export (`output: 'export'`)
- No external API calls from the landing page (purely static marketing site)
- Responsive / mobile-first
- Fast: target 95+ Lighthouse performance score
- Use Lucide React for icons (already in package.json)
- Inter font from Google Fonts

### 7. DO NOT
- Use dark mode / dark backgrounds
- Use neon/glowing effects
- Use terminal/code aesthetics
- Use generic AI imagery (no robot illustrations, no neural network graphics)
- Use cookie-cutter "SaaS template" layouts
- Add any backend functionality — this is a STATIC landing page

### 8. Files to Modify/Create
- `app/page.tsx` — Complete rebuild (the landing page)
- `app/layout.tsx` — Update with Inter font, remove dark theme
- `app/globals.css` — Clean Tailwind base, remove dark theme CSS
- `tailwind.config.ts` — Update color palette, remove dark mode
- `next.config.js` — Add `output: 'export'` for static generation
- `components/` — Any reusable section components

When finished, run: `npm run build` to verify static export works.

Then run: `openclaw system event --text "Done: FlightForge landing page rebuilt with Stripe×Apple design" --mode now`
