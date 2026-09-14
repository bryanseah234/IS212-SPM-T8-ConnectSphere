# Backend

TypeScript backend scaffold for Vercel Functions and provider integration seams.

## Runtime shape

- API handlers live in `api/` so Vercel can deploy them as serverless functions.
- Shared backend code lives in `backend/src/`.
- Module contracts live in `backend/src/modules/`; they define repository,
  service, access-control, audit, status, and notification boundaries.
  E01-S02 include implemented PostgreSQL access checks.
- Upstash Redis is the queued notification transport.
- Brevo is the initial transactional email provider.
- PostgreSQL stores accounts, password hashes, sessions, events and audit records.
  Apply the migrations before serving authenticated routes; Supabase Auth is not used.

## Commands

Run from the repository root:

```text
npm install
npm run typecheck --workspace backend
npm run build --workspace backend
```

The current API routes are deployable scaffolding only:

- `GET /api/health`
- `POST /api/notifications/send`
- `GET /api/cron/outbox-relay`

Do not commit real provider tokens or service-role keys.

## Access and Identity

The organiser event API use PostgreSQL-backed sessions. See
[organiser setup and verification](../docs/testing/client-event-visibility.md)
for migrations, credentials and acceptance evidence. API routes:

- `POST /api/auth/session` and `DELETE /api/auth/session`
- `GET /api/events`
