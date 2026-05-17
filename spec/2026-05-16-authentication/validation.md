# Validation — Authentication

All checks below must pass before this branch can be merged to `main`.

---

## 1. Unauthenticated users are redirected to login

- [ ] Visit `/staff` without a session → redirected to `/login`
- [ ] Visit `/agents/new` without a session → redirected to `/login`
- [ ] Visit `/agents/[id]/dashboard` without a session → redirected to `/login`
- [ ] `/login` page renders without error

## 2. Logged-in users can access protected routes

- [ ] Log in with admin credentials → session cookie is set
- [ ] After login, visit `/staff` → page loads correctly
- [ ] After login, visit `/agents/new` → page loads correctly
- [ ] After login, visit `/agents/[id]/dashboard` → page loads correctly

## 3. Logout clears the session

- [ ] Click logout → session cookie is cleared
- [ ] After logout, visit `/staff` → redirected to `/login`
- [ ] After logout, visit `/agents/new` → redirected to `/login`

## 4. Public pages remain accessible without login

- [ ] `/` loads without login
- [ ] `/agents` loads without login
- [ ] `/ailments` loads without login
- [ ] `/therapies` loads without login
- [ ] `/book` loads without login

## 5. Code quality

- [ ] `npm run tsc` passes with no type errors
- [ ] `npm run lint` passes with no errors
- [ ] No plain-text passwords anywhere in the codebase
- [ ] `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `SESSION_SECRET` are in `.env` and documented in `.env.example`
