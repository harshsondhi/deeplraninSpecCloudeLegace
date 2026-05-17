# Tech Stack

## Current Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Database ORM | Prisma 7 |
| Database | SQLite (`dev.db` via better-sqlite3) |
| Styling | Tailwind CSS 4 + PicoCSS 2 |
| Testing | Vitest 4 |
| Package Manager | npm (lockfile committed) |

## Rationale

- **Next.js** gives server-side rendering, file-based routing, and API routes in one TypeScript-native package — satisfying Mary's requirement for a reliable, popular stack.
- **Prisma + SQLite** keeps the data layer simple and portable for demos and course use; no external database server required.
- **Tailwind + PicoCSS** delivers a modern, attractive UI with minimal custom CSS — meeting Steve's browser compatibility requirement.

## Known Gaps

### Authentication
No login or session management exists. The staff dashboard and agent management routes are currently open to anyone. Auth needs to be added before any production deployment.

### Testing Coverage
Vitest is configured but coverage is minimal (only a landing-page smoke test and a utils unit test). A testing strategy covering API routes, database interactions, and key UI flows needs to be defined and implemented.

### Deployment
No deployment configuration exists (no Dockerfile, no Vercel config, no CI pipeline). A target environment and deployment strategy must be decided before the app can be shipped.
