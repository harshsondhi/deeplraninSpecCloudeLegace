# Roadmap

Small, sequential phases. Each phase should be fully working before the next begins.

---

## Phase 1 — Core Data (DONE)
- Prisma schema: Agent, Ailment, Therapy, Appointment models
- SQLite database with seed data
- Prisma migrations in place

## Phase 2 — Pages & API Routes (DONE)
- `/` Home / landing page
- `/agents` — list all agents
- `/agents/new` — register a new agent
- `/agents/[id]` — agent profile
- `/agents/[id]/dashboard` — agent dashboard
- `/ailments` — list ailments
- `/therapies` — list therapies
- `/book` — book an appointment
- `/staff` — staff management view
- REST API routes for agents, ailments, therapies, appointments

## Phase 3 — UI Polish (DONE)
- Shared layout: Header, Footer, MainLayout
- Tailwind + PicoCSS styling
- Loading states and error boundaries on key routes

## Phase 4 — Authentication
- Add login / session management
- Protect staff routes and agent management behind auth
- Decide on provider (credentials-based or OAuth)

## Phase 5 — Testing Coverage
- Define testing strategy (unit, integration, e2e)
- API route tests with real SQLite test database
- Key UI flow tests (booking, agent registration)
- Achieve meaningful coverage on critical paths

## Phase 6 — Deployment
- Choose deployment target (Vercel, Docker, etc.)
- Add environment configuration for production database
- Set up CI pipeline (lint, typecheck, tests on push)
- Document deployment steps in README
