# Free-tier hosting plan

This plan records a practical zero-cost deployment path for ConnectSphere before
the application scaffold exists. It is a planning document, not proof that the
app is deployed.

## Recommended free-tier stack

| Concern | Recommended service | Why |
| --- | --- | --- |
| Frontend and API deployment | Vercel Hobby | GitHub previews, production deploys, Functions, Cron Jobs, Queues, and Python/JavaScript support. |
| PostgreSQL, auth, file storage | Supabase Free | Matches the PostgreSQL decision and can support auth, storage, migrations, and local CLI workflows. |
| Async queue / cache | Vercel Queues first, Upstash Redis if Redis remains a hard ADR requirement | Vercel Queues fits serverless workers; Upstash Redis matches the Redis plan recorded in architecture docs. |
| Transactional email | Brevo or Resend | The previous `sgStyleSnap2025` project used Brevo successfully; Resend is also simple for developer email. |
| Project management sync | Jira with per-user credentials | Each teammate or agent should connect using their own Jira access; no shared tokens in Git. |

## Worker and scheduler interpretation

Vercel can run background work, but not as a permanently running free-tier worker
process. Use Vercel's serverless model:

- API routes or server functions enqueue work;
- Vercel Queues trigger private consumers for async processing;
- Cron Jobs call scheduled endpoints for periodic checks;
- database rows remain the source of truth for idempotency and retry safety.

For ConnectSphere, the clean pattern is:

1. Write the business change and notification/outbox row in PostgreSQL.
2. Enqueue or schedule delivery after the database transaction is committed.
3. A queue consumer sends email and updates delivery status.
4. Cron handles periodic jobs such as event completion checks or stuck-delivery
   recovery.

If the team keeps Redis as an architectural requirement, use Upstash Redis as the
free-tier Redis provider. If the team accepts Vercel Queues as the managed queue,
record that as a new ADR because it changes the earlier Redis plan.

## Email provider decision

The old `hongyime/sgStyleSnap2025` project used Brevo:

- `api/notifications/notify.js` imports `@getbrevo/brevo`;
- `supabase/functions/send-email-notification/index.ts` calls
  `https://api.brevo.com/v3/smtp/email`;
- `.github/workflows/brevo-keepalive.yml` sends a keepalive email through Brevo;
- the expected secret name was `BREVO_API_KEY`.

For ConnectSphere, start with `EMAIL_PROVIDER=brevo` unless the team prefers
Resend's developer workflow. Keep both `BREVO_API_KEY` and `RESEND_API_KEY` in
`.env.template` so the implementation can switch without changing the template.

## Setup sequence

1. Confirm the framework/backend shape in an ADR before adding runtime
   infrastructure.
2. Create or choose the Supabase project for ConnectSphere.
3. Link the local repo with `supabase link --project-ref <ref>` only after the
   team confirms the project.
4. Create or link the Vercel project with `vercel link`.
5. Add environment variables in Vercel and Supabase dashboards using
   `.env.template` as the checklist.
6. Configure the email provider and verify sender/domain ownership.
7. Add queue/cron implementation after the outbox table and notification worker
   code exist.
8. Deploy a preview, then production, and record the URLs in repo docs.

Do not commit real `.env` files, provider tokens, SMTP passwords, service-role
keys, or project-specific personal account details.
