# E01-S02 client event visibility

The supplied story and checklist match E01-S02 in the repository's newer
`CONNECTSPHERE BACKLOGS CAA 140926.xlsx`. Requirements remain unchanged.

## Runtime setup

Apply all migrations, including `0003_auth_sessions.sql`, with `npm run db:migrate`.
Configure server-only `DATABASE_URL` (or `DATABASE_POOLER_URL`) and `APP_URL`
(the exact browser origin). Frontend and API functions must use the same origin.
Vite alone does not serve API functions.

Authentication now uses PostgreSQL-backed opaque sessions and salted scrypt
password hashes. The test seeder creates supported scrypt hashes; old
`seed-sha256` hashes require reprovisioning. Sessions expire after one hour and
logout revokes them. Account role and organisation membership are loaded from
PostgreSQL on every request. Supabase authentication is not required.

Migration 0002 enables RLS and removes browser-role access to event, user,
notification and audit tables. Server connections must use the trusted table
owner; do not expose that connection to browsers. Audit records are written
before returning a denial and use database-generated timestamps. An audit write
failure returns an unavailable response without event details. Review audit
records through trusted database administration; no public audit endpoint exists.

## Acceptance coverage

| Requirement | Implementation |
| --- | --- |
| Own client's events only | SQL constrains client organisation before returning any event fields |
| Direct access refused | `/events/:identifier` calls the scoped API; foreign and unknown identifiers receive the same 403 |
| Colleague's event visible | Filtering uses organisation, never creator; cards show creator name |
| Search isolation | Name and event code search executes inside the organisation constraint; wildcard characters are literal |
| Notification isolation | Inbox joins recipient and event organisation; email validates membership both before enqueue and before send |
| Denial activity log | `audit_logs` captures actor, target event UUID, attempted identifier, Access Denied and database timestamp |

Email content is regenerated from the authorised notification record instead of
trusting queued recipient content. Eventless notification jobs are refused because
their client scope cannot be verified. Any future account email workflow needs a
separate explicitly authorised path. Membership changes invalidate queued event
email eligibility at dispatch. HTML message text is escaped.

Lists and notifications return at most 100 records. Event search can narrow the
list further. The screen includes loading, empty, retry, expired-session and
generic access-denied states, with labelled keyboard-accessible controls.

## Verification commands

- `npm run typecheck`
- `npm run build`
- `node --import tsx --test backend/tests/eventVisibility.test.ts`
- `TEST_DATABASE_URL=<disposable PostgreSQL database> node --import tsx --test backend/tests/eventVisibility.integration.test.ts`
- `npx playwright test tests/e2e/client-events.spec.ts`
- `python scripts/check.py` (Python 3.12+ repository tooling required)

The integration test creates and drops an isolated schema, exercises actual SQL,
and checks all three scenarios, reverse client isolation, search, notification
eligibility and audit data. It also invokes the real API handler with real
PostgreSQL sessions and database membership lookups, covering forged
sessions, client-ID overrides, changed membership, inactive accounts and wrong roles.
Browser tests mock API responses to check rendering and failure states; they do
not prove backend isolation. Complete a deployed smoke test with two provisioned
client organisations and at least two organisers in Client A before release.

For trusted audit review, join `audit_logs.actor_id` to `users.id` and
`audit_logs.event_id` to `events.id`, filtering `action = 'Access Denied'`:

```sql
SELECT u.email AS actor, e.event_code, a.new_value AS attempted_identifier,
       a.action, a.occurred_at
FROM audit_logs a
LEFT JOIN users u ON u.id = a.actor_id
LEFT JOIN events e ON e.id = a.event_id
WHERE a.action = 'Access Denied'
ORDER BY a.occurred_at DESC;
```

## Implementation verification record

- Frontend/backend type checks and production build: passed.
- Six backend policy/service tests: passed.
- Six browser checks (three each on desktop and mobile): passed using mocked API responses.
- PostgreSQL 17 integration: passed against both real migrations in a disposable local container.
- API integration: passed with real PostgreSQL sessions and membership lookup.
- Repository hygiene and six repository-tooling tests: passed with Python 3.12.
- Deployed smoke test: pending actual deployment configuration.

The expanded integration checks verify own and colleague-created events, isolation
in both directions, event-code and UUID denial, unknown identifiers, committed
audit rows, literal search, recipient isolation, HTML escaping, changed membership,
forged sessions, ignored client-ID overrides, cache headers and inactive/unlinked/
wrong-role rejection. No live email was sent.

A flaky assertion compared a database timestamp with the host clock. The test now
uses the database clock for both sides of the comparison. No product behaviour change
was needed during this verification pass. A narrow secret-scanner exception marks
the password type-validation expression, which contains no credential.

These results do not certify a production deployment or complete the live
acceptance exercise. The feature changes are prepared on
`feature/e01-s02-restrict-event-visibility` for review.
