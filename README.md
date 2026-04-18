# FlightForge.ai

AI-powered aviation training platform. FAR/AIM study companion with persona-based coaching and Stripe-gated full access.

## What It Is

- **Chat Interface:** AI study partner using Jordan (friendly) or Captain Reynolds (strict CFI) personas
- **Citation Gate:** Forces students to cite FAR/AIM references before AI validates and responds
- **Stripe Paywall:** Free tier gets limited sessions; paid tier unlocks full platform
- **Training Modules:** Checkride prep, systems review, weather, regulations

## Tech Stack

| Layer | Choice |
|-------|--------|
| Frontend | Next.js 14 (static export) |
| API Gateway | Cloudflare Worker (flightforge-api) |
| AI | Google Gemini |
| Payments | Stripe |
| Deploy | Cloudflare Pages |
| Domain | flightforge.ai |

## Architecture

Frontend is a static Next.js export deployed to Cloudflare Pages. API calls hit a separate Cloudflare Worker at `/api/*`. The worker handles Gemini AI, Stripe checkout, and PDF proxy. Do not modify the worker without a separate deployment step.

```
flightforge.ai (Pages)  -->  /api/* (Worker: flightforge-api)
                                     |--> Gemini AI
                                     |--> Stripe
                                     |--> PDF proxy
```

## Development

```bash
npm install
npm run dev
```

## Build and Deploy

```bash
npm run build
npx wrangler pages deploy out --project-name flightforge --branch main
```

## API Endpoints (Worker)

- `POST /api/gemini/chat` : AI chat with citation validation
- `POST /api/create-checkout` : Initiate Stripe checkout
- `GET /api/verify-session?session_id=XXX` : Verify payment session

## Design System

Light theme. Inter font. Sky blue (#2563EB), navy (#0F172A), amber (#F59E0B).

See `PHASE2-BRIEF.md` for current build context and `REBUILD-BRIEF.md` for original design spec.
