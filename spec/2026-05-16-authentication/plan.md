# Plan — Authentication

Credentials-based (email + password) login using Next.js built-in session handling.
Each task group must be complete and working before moving to the next.

---

## Group 1 — User Model

- Add `User` model to `prisma/schema.prisma` (id, email, passwordHash, role, createdAt)
- Create and run migration
- Add a seed entry for the hardcoded admin user (email + hashed password from `.env`)
- Regenerate Prisma client

## Group 2 — Login Page & Session Handling

- Install `iron-session` (or `next-auth` with credentials provider) for session management
- Create `/app/login/page.tsx` — email + password form
- Create `/app/api/auth/login/route.ts` — validate credentials, set session cookie
- Create `/app/api/auth/logout/route.ts` — clear session cookie
- Store session secret in `.env`

## Group 3 — Protect Routes

- Create `lib/auth.ts` — helper to read and verify session from request
- Protect `/staff` — redirect to `/login` if no valid session
- Protect `/agents/new` — redirect to `/login` if no valid session
- Protect `/agents/[id]/dashboard` — redirect to `/login` if no valid session

## Group 4 — Logout

- Add logout button to the Header component (visible when logged in)
- Logout calls `/api/auth/logout`, clears session, redirects to `/login`
- Header shows login link when no session is active
