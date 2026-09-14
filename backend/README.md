# Backend

TypeScript backend scaffold for Vercel Functions and provider integration seams.

## Runtime shape

- API handlers live in `api/` so Vercel can deploy them as serverless functions.
- Shared backend code lives in `backend/src/`.
- Upstash Redis is the queued notification transport.
- Brevo is the initial transactional email provider.
- Supabase/PostgreSQL variables are reserved in `.env.template`; database
  migrations will be added when the schema is promoted into runnable code.

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
