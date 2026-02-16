# Database, Caching, Scaling & Fault Tolerance — Examination

This document summarizes how this web app handles **database**, **caching**, **scaling**, and **fault tolerance**, and where improvements can be made.

---

## 1. Database & Caching

### 1.1 Database

| Aspect | Current state | Where it lives |
|--------|----------------|----------------|
| **Primary DB** | PostgreSQL (Vercel Postgres or local via `DATABASE_URL` / `LOCAL_POSTGRES_URL`) | `backend/lib/db/connection.ts` |
| **Connection** | Single pool (local) or serverless `@vercel/postgres` (Vercel) | `connection.ts`: `initializeDatabase()`, `sql` |
| **Tables** | `contact_submissions`, `quotation_requests`, `sample_requests`, `payments`, `inventory`, `newsletter_subscribers` | `backend/lib/db/storage.ts`, `payments.ts`, `inventory.ts`, `newsletter.ts` |
| **Optional DB** | App runs without DB: `sql` no-ops, forms still work (email-only or file fallback) | `connection.ts` (no env → `Promise.resolve({ rows: [] })`) |

**Unified storage layer**

- `backend/lib/storage.ts` decides: **Postgres if configured**, else **file system** (JSON files under project).
- Used for: contact, quotation, sample request; payments use `PaymentStorage` directly.
- **Fallback:** If Postgres is configured but a call fails, contact/quotation/sample-request **fall back to file** (see `storage.ts` try/catch and fallback to `saveToFile` / `loadFromFile`).

**Relevant files**

- `backend/lib/db/connection.ts` — DB init, `sql`, `isPostgresConfigured()`
- `backend/lib/db/storage.ts` — contact, quotation, sample request tables + init
- `backend/lib/db/payments.ts` — payments table
- `backend/lib/db/inventory.ts` — inventory table (graceful when DB unavailable)
- `backend/lib/db/newsletter.ts` — newsletter subscribers
- `backend/lib/storage.ts` — unified Postgres vs file fallback

**Environment variables**

- `POSTGRES_URL` — Vercel Postgres (primary on Vercel)
- `DATABASE_URL` or `LOCAL_POSTGRES_URL` — local or alternate Postgres
- `pg` in `package.json` is overridden to `@neondatabase/serverless` for serverless-friendly driver

---

### 1.2 Caching

| Layer | Current state | Notes |
|--------|----------------|--------|
| **Application cache** | None | No in-memory cache for DB or API results in Node. |
| **Next.js data cache** | Not used for DB-backed data | No `fetch(..., { next: { revalidate: ... } })` or `unstable_cache()` for DB queries. |
| **Redis** | In `package.json` but **unused** | No `redis` import or usage in the codebase. |
| **CDN / Sanity** | Sanity client uses `useCdn: true` | Only for Sanity CMS (blog) assets. |
| **Rate limiting “cache”** | In-memory `Map` in middleware | Per-instance only; not shared across replicas (see Scaling). |

**Summary**

- **DB:** No server-side caching; every request that needs data hits Postgres (or file).
- **Redis:** Present as dependency but not used; good candidate for rate-limit store and optional response cache later.

---

## 2. Scaling & Fault Tolerance

### 2.1 Scaling

| Topic | Current state | Notes |
|--------|----------------|--------|
| **Statelessness** | API routes are stateless | No server-side session store in app code; safe to run multiple instances behind a load balancer. |
| **Rate limiting** | In-memory `Map` in `middleware.ts` | Key = `ip:path`; limit 60/min for `/api/*`, 10/min for `/api/payments/*`. **Problem:** Each Node instance has its own map, so limits are per-instance, not global. For multi-instance scaling, use a shared store (e.g. Redis). |
| **DB connections** | Vercel Postgres is serverless (connection pooling); local uses single `Pool` | Fine for single-instance; for many instances, rely on Vercel/Neon pooling and avoid long-lived local pools in serverless. |
| **Horizontal scaling** | App is horizontally scalable | No sticky sessions or in-memory state that must be shared. |
| **Static / ISR** | Some pages are static (e.g. products, washing stations from data files) | Good for scaling read traffic; no ISR/revalidate used for DB-backed content yet. |

**Scaling recommendations**

1. **Rate limiting:** Move rate-limit state to Redis (or Vercel KV) so limits are global across instances.
2. **Optional read cache:** For heavy read endpoints (e.g. quotation list, contact list in admin), add Redis or Next.js `unstable_cache` with short TTL to reduce DB load under scale.
3. **Connection handling:** Keep using serverless Postgres on Vercel; avoid creating new pools per request in serverless.

---

### 2.2 Fault tolerance

| Area | Current behavior | Notes |
|--------|------------------|--------|
| **DB unavailable** | Connection init catches errors and sets `sql` to a no-op; `isPostgresConfigured()` is env-only (does not probe DB). | App does not crash; writes/reads that expect DB can return empty or fallback (e.g. file). |
| **Storage layer** | Postgres errors in `storage.ts` fall back to file for contact/quotation/sample. | User still gets “submitted”; data may be in files instead of DB. |
| **Contact / quotation / sample APIs** | Try Postgres (or Storage), then continue with email; if save fails, response can still include a `warning` (e.g. “could not be saved to the database”). | Degrades gracefully: email + optional file save. |
| **Payments** | No fallback store; if Postgres is down, payment record save can fail. | Critical path; consider retries or a queue for payment records. |
| **Inventory** | `inventory.ts`: connection/timeout errors in `initialize()` are swallowed; `getAllInventory` / `getInventory` return `[]` / `null` on error. | Prevents crashes; callers must handle empty inventory. |
| **Middleware** | Rate limit exceeded → 429; auth (when enabled) → 401. Security headers always applied. | Clear failure mode for abuse. |
| **Health checks** | No `/api/health` or readiness probe. | Hard to automate “is DB reachable?” or “is app ready?” in orchestrators. |

**Fault-tolerance summary**

- **DB optional:** App runs without DB; forms can still submit (email + file).
- **Graceful degradation:** Contact, quotation, sample request degrade to file + warning when DB fails.
- **Payments and inventory:** No retry or queue; DB errors surface to client. Adding retries or a small “pending writes” queue would improve resilience.
- **No health endpoint:** Adding `/api/health` (and optionally a DB ping) would help with scaling and ops (e.g. Kubernetes, Vercel).

---

## 3. Easing processes

How the app simplifies workflows for users and operators: forms, validation, automation, and UX.

### 3.1 Forms and validation

| Area | Current state | Where it lives |
|--------|----------------|----------------|
| **Server-side validation** | All API routes validate and sanitize inputs (name, email, phone, company, country, quantity, message, etc.) | `backend/lib/security.ts` — regex patterns and validators; used in `app/api/contact`, `export/quotation`, `roasters/contact`, `products/sample-request`, etc. |
| **Client-side validation** | Shared regex and validators for forms | `frontend/lib/validation.ts` — same patterns as server (email, phone, name, company, quantity, country, subject, zip). |
| **Sanitization** | Email, strings sanitized before use | `backend/lib/security.ts`: `sanitizeEmail`, `sanitizeString`; APIs use these before DB/email. |
| **Form UX** | React Hook Form + Zod used in some flows; success/error messages returned from APIs | Contact, quotation, sample request, newsletter, roasters, payments — all return JSON `{ success, error?, warning? }`. |

**Easing summary**

- **Single source of rules:** Validation rules are centralized in `security.ts` (server) and `validation.ts` (client) so behavior is consistent and easy to change.
- **Clear API responses:** Forms get explicit success/error/warning messages; when DB save fails but email works, response can include a `warning` so the user knows the request was received.
- **No unnecessary steps:** Contact, quotation, sample request, and newsletter are one-step submit; payment flow is guided (intent → confirm / bank transfer).

### 3.2 Automation and setup

| Process | Current state | Notes |
|--------|----------------|--------|
| **DB initialization** | One-shot: `POST /api/admin/init-db` creates all tables (storage, payments, inventory, newsletter) and optionally seeds default inventory | `app/api/admin/init-db/route.ts` — idempotent (CREATE TABLE IF NOT EXISTS). |
| **Migration** | `POST /api/admin/migrate` can migrate file-based data to Postgres | `app/api/admin/migrate/route.ts` — reads from file storage, writes to Postgres. |
| **Setup verification** | `npm run verify-setup` checks config (e.g. Postgres dependency) | `backend/scripts/verify-setup.js`. |

**Easing recommendations**

- **Docs:** Keep SETUP.md and DEPLOYMENT.md in sync with env vars and init/migrate steps so new deploys are straightforward.
- **Optional:** Add a simple “first-run” check (e.g. redirect to init-db or show a banner) when DB is configured but tables are missing, to reduce support load.

---

## 4. Communication

How the app communicates with users and admins: email, channels, and status.

### 4.1 Email (Resend)

| Flow | Who gets email | Trigger | Config |
|--------|----------------|--------|--------|
| **Contact form** | User: confirmation. Admin: copy to `ADMIN_EMAIL` (or hardcoded fallback) | After submit | `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `ADMIN_EMAIL` |
| **Quotation request** | User: acknowledgment. User: quotation details (when configured). Admin: not separate (handled in export flow) | After submit | `RESEND_API_KEY`, `RESEND_FROM_EMAIL` |
| **Sample request** | User: confirmation | After submit | `RESEND_API_KEY`, `RESEND_FROM_EMAIL` |
| **Roasters contact** | User: confirmation. Admin: copy to `ADMIN_EMAIL` | After submit | Same as contact |
| **Newsletter** | User: welcome / confirmation | After subscribe | `RESEND_API_KEY`, `RESEND_FROM_EMAIL` |
| **Payments** | User: order confirmation / status. Admin: new order notification (when `ADMIN_EMAIL` set) | Payment confirm, webhook, update-status, bank-transfer | `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `ADMIN_EMAIL` |

**Behavior when Resend is not configured**

- APIs still validate and save to DB/file; they return success with an optional `warning` that email was not sent.
- Quotation route returns 500 if `RESEND_API_KEY` is missing (quotation is treated as email-dependent); other forms degrade without email.

**Relevant files**

- `app/api/contact/route.ts` — contact confirmation + admin copy
- `app/api/export/quotation/route.ts` — quotation acknowledgment + quotation email
- `app/api/roasters/contact/route.ts` — roaster confirmation + admin copy
- `app/api/products/sample-request/route.ts` — sample request confirmation
- `app/api/newsletter/subscribe/route.ts` — newsletter welcome
- `app/api/payments/confirm/route.ts`, `webhook/route.ts`, `update-status/route.ts`, `bank-transfer/route.ts` — payment and admin emails

**Environment variables**

- `RESEND_API_KEY` — required for any email
- `RESEND_FROM_EMAIL` — sender (defaults to onboarding@resend.dev)
- `ADMIN_EMAIL` — admin copies and payment notifications (defaults to bahocoffee@gmail.com)

### 4.2 Other channels

| Channel | Current state | Where |
|--------|----------------|--------|
| **WhatsApp** | Fixed link (e.g. “Chat on WhatsApp”) to configured number with pre-filled message | `frontend/components/ui/WhatsAppButton.tsx` — phone number and message in component. |
| **Footer / contact** | Email and phone in footer and legal pages | `frontend/components/layout/Footer.tsx`, `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/certifications/page.tsx` — bahocoffee@gmail.com, +250 788 302 976. |

**Communication summary**

- **Email:** Centralized on Resend; one place to tune templates and from/to addresses.
- **Admin:** Contact, roasters, and payments can notify admin via `ADMIN_EMAIL` when Resend is configured.
- **WhatsApp:** Single global CTA; phone/message are easy to change in one component.
- **Improvements:** Optional: move WhatsApp number/message to env or config; add a simple “Contact us” page that lists email, phone, and WhatsApp together.

---

## 5. Quick reference

### 5.1 Database

- **Configured:** `POSTGRES_URL` (Vercel) or `DATABASE_URL` / `LOCAL_POSTGRES_URL`.
- **Init:** `POST /api/admin/init-db` creates tables (idempotent).
- **Unified layer:** `Storage` in `backend/lib/storage.ts` (Postgres → file fallback).
- **Direct Postgres:** `PaymentStorage`, `InventoryStorage`, `NewsletterStorage`, `PostgresStorage` in `backend/lib/db/`.

### 5.2 Caching

- **Today:** No app-level or Next.js data cache for DB; Redis dependency unused.
- **Optional next steps:** Use Redis for rate limiting and/or cache hot read endpoints; or use `unstable_cache` for specific server-side queries.

### 5.3 Scaling

- **App:** Stateless; horizontally scalable.
- **Rate limit:** In-memory; not shared across instances — move to Redis/KV for production scaling.
- **DB:** Use managed Postgres (Vercel/Neon) with pooling; avoid per-request pools in serverless.

### 5.4 Fault tolerance

- **DB down:** App still runs; contact/quotation/sample use file + warning; payments/inventory can fail.
- **Improvements:** Health endpoint, retries or queue for payment/inventory writes, shared rate-limit store.

### 5.5 Easing processes

- **Validation:** Server `backend/lib/security.ts`; client `frontend/lib/validation.ts`. APIs return `{ success, error?, warning? }`.
- **Setup:** `POST /api/admin/init-db` (tables); `POST /api/admin/migrate` (file → Postgres); `npm run verify-setup`.

### 5.6 Communication

- **Email:** Resend; `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `ADMIN_EMAIL`. Contact, quotation, sample, roasters, newsletter, payments.
- **WhatsApp:** `frontend/components/ui/WhatsAppButton.tsx`. Footer/legal: bahocoffee@gmail.com, +250 788 302 976.

---

## 6. Suggested next steps (priority)

1. **Add `/api/health`** (and optionally `/api/health/db` that pings Postgres) for load balancers and monitoring.
2. **Move rate limiting to Redis** (or Vercel KV) so it works correctly with multiple instances.
3. **Optionally use Redis** for caching heavy admin/read endpoints (e.g. list of quotations, contacts) with a short TTL.
4. **Consider retries** (or a small queue) for payment and inventory writes when Postgres is temporarily unavailable.

If you want, the next step can be concrete code changes for (1) health route and (2) Redis-based rate limiting in this repo.
