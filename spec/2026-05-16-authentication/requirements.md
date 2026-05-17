# Requirements — Authentication

## Scope

Add credentials-based (email + password) authentication to AgentClinic.
Protected routes require a valid session. Public browsing remains open.

## Protected Routes

| Route | Protected |
|-------|-----------|
| `/staff` | Yes — staff only |
| `/agents/new` | Yes — staff only |
| `/agents/[id]/dashboard` | Yes — staff only |
| `/` | No |
| `/agents` | No |
| `/agents/[id]` | No |
| `/ailments` | No |
| `/therapies` | No |
| `/book` | No |

## User Accounts

**Hardcoded admin:** A single admin account is pre-seeded from environment variables (`ADMIN_EMAIL`, `ADMIN_PASSWORD` in `.env`). No admin registration UI is needed.

**User registration:** A `/register` page allows new users to sign up with email and password. Registered users can log in but only see public routes unless granted staff role.

## Decisions

- **Auth method:** Credentials only (email + password). No OAuth provider in this phase.
- **Session storage:** Encrypted cookie via `iron-session`. No database session table required.
- **Password hashing:** `bcryptjs` — never store plain-text passwords.
- **Role field:** `User.role` (enum: `ADMIN`, `USER`) — only `ADMIN` can access protected routes.
- **No password reset in this phase** — out of scope; noted for a future phase.

## Context

See `spec/mission.md` — the app serves conference demo audiences and course students, so the auth flow must be simple and reliable. A single admin credential seeded from `.env` is sufficient for demo use.

See `spec/tech-stack.md` — auth was identified as a known gap in Phase 3.
