# Backend

TypeScript backend scaffold for Vercel Functions and provider integration seams.

## Runtime shape

- API handlers live in `api/` so Vercel can deploy them as serverless functions.
- Shared backend code lives in `backend/src/`.
- Module contracts live in `backend/src/modules/`; they define repository,
  service, access-control, audit, status, and notification seams without choosing
  a real auth provider or implementing story behaviour.
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
npm run test:runtime
```

Backend and API imports use explicit `.js` extensions (including `index.js` for
directory entry points). TypeScript's `NodeNext` resolution checks these paths
against the TypeScript sources and preserves them for the Node ESM runtime.

The runtime tests compile the backend and API into a temporary directory, then
load the emitted handlers in fresh Node processes. They check the health response
and method/authentication rejection paths with no provider credentials and with
outgoing fetch requests blocked. These checks do not validate live notification
delivery, database access, or production configuration.

The current API routes are deployable scaffolding only:

- `GET /api/health`
- `POST /api/notifications/send`
- `GET /api/cron/outbox-relay`

Do not commit real provider tokens or service-role keys.
