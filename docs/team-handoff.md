# Team handoff

This handoff is for teammates and coding agents working on ConnectSphere after
the repository scaffold, Batch 5 frontend prototype, and Jira branch naming
updates have landed.

## Current baseline

- Repository: `github.com/hongyime/sgConnectSphere2026`
- Source-of-truth guide: `docs/source-of-truth.md`
- Jira workflow guide: `docs/jira-agent-workflow.md`
- Frontend prototype: Batch 5 breadth-first screen inventory in `frontend/`
- Runtime scaffold: React/Vite frontend, TypeScript backend helpers, Vercel API
  entrypoints, Supabase/PostgreSQL placeholders, Upstash Redis queue placeholders,
  and Brevo email placeholders.

The Batch 5 prototype is the accepted frontend design direction. Treat it as a
screen map and design system starting point, not as finished business logic.

## Local setup

From the repository root:

```text
git switch main
git pull --ff-only
npm install
python scripts/setup.py
python scripts/check.py
```

To run the frontend prototype:

```text
npm run dev --workspace frontend
```

Open the URL printed by Vite, usually `http://127.0.0.1:5173/`.

## Environment setup

Copy `.env.template` to `.env` for local work. Never commit `.env`.

Fill only the services you personally need for the task. Browser-safe variables
may be used by the frontend; service-role keys, Redis tokens, email keys, Jira
tokens, and deployment tokens are server-side or local-agent secrets only.

Shared provider choices:

| Concern | Current choice |
| --- | --- |
| Frontend/API hosting | Vercel |
| Database/auth/storage | Supabase/PostgreSQL |
| Queue transport | Upstash Redis |
| Durable notification source of truth | PostgreSQL outbox table |
| Email | Brevo |
| Project tracking | Jira with each teammate's own credentials |

For queue work, do not write directly to Redis from feature code. Feature code
should write the business change and outbox row in the same database transaction.
The relay publishes committed outbox rows to Upstash Redis.

## Jira and agents

Each teammate should connect Jira using their own Jira account or connector. Do
not share API tokens, cookies, or connector secrets.

Recommended local `.env` values for Jira-enabled agents:

```text
JIRA_SITE_URL=https://theprawnworkspace.atlassian.net
JIRA_PROJECT_KEY=SCRUM
JIRA_EMAIL=<your own Atlassian email>
JIRA_API_TOKEN=<your own Jira API token>
JIRA_GITHUB_REPOSITORY=hongyime/sgConnectSphere2026
```

Create Jira branches with the issue key:

```text
feature/SCRUM-26-organiser-request-flow
fix/SCRUM-41-validation-message
docs/SCRUM-86-update-source-truth
```

Keep PR titles conventional:

```text
feat(frontend): add organiser request flow
fix(frontend): show validation summary
docs: update source of truth notes
```

Put the Jira issue link/key in the PR body. The GitHub for Jira integration can
then connect branches, commits, and PRs to Jira progress.

## Split the foundation prompt

Do not ask one agent to implement schema, auth, migrations, seed data, CI, test
infrastructure, module skeleton, notification outbox, audit logging, and frontend
routes in one PR. That is too large to review and too hard for each teammate to
explain.

Use these smaller PRs instead.

| Order | Branch | Scope | Stop condition |
| --- | --- | --- | --- |
| 1 | `docs/SCRUM-xx-foundation-decisions` | Record remaining architecture decisions and resolve any doc contradictions. | Docs only; no runtime code. |
| 2 | `feature/SCRUM-xx-database-migrations` | Add Supabase/PostgreSQL migrations for the accepted schema and constraints. | Migration runs locally; database rejects invalid states. |
| 3 | `feature/SCRUM-xx-seed-data` | Add reset-and-reseed command using documented seed accounts, venues, and equipment. | Seed command is repeatable and fails loudly. |
| 4 | `feature/SCRUM-xx-access-control-foundation` | Add auth/session scaffolding, role model, and client-organisation scoping helpers. | No story UI; feature teams can consume shared guards/helpers. |
| 5 | `feature/SCRUM-xx-status-model` | Add canonical event status enum and transition guard. | Feature code no longer assigns raw status strings. |
| 6 | `feature/SCRUM-xx-module-skeleton` | Add module folders/services/repositories matching architecture boundaries. | Empty path of least resistance for story owners. |
| 7 | `feature/SCRUM-xx-notification-outbox` | Add PostgreSQL outbox rows, relay to Upstash Redis, and worker seam for Brevo. | Test proves rollback publishes nothing. |
| 8 | `feature/SCRUM-xx-audit-logger` | Add append-only audit logging helper and storage contract. | Feature teams can record audit entries consistently. |
| 9 | `test/SCRUM-xx-playwright-scaffold` | Move/adapt Playwright scaffold into runnable test infrastructure. | Suite runs and reports story cases as skipped/fixme. |
| 10 | `feature/SCRUM-26-organiser-request-flow` | Start real frontend implementation from Batch 5: split components and implement Organiser create-request-to-submit flow with mock data and validation states. | One vertical slice is reviewable without backend persistence. |

Each PR should include:

- source document or Jira issue referenced;
- what changed and why;
- exact commands run;
- screenshots for frontend changes;
- test evidence or clear note when a check is not configured yet.

## Next frontend PR

Start with:

```text
feature/SCRUM-26-organiser-request-flow
```

Scope:

- split the large Batch 5 prototype into reusable layout/components;
- add Organiser route/state structure;
- implement create request wizard with mock data;
- add validation summary and field-level validation states;
- keep backend persistence out of this PR unless a separate backend contract is
  already approved.

Do not build another teammate's full feature area in this PR. The goal is a
reviewable vertical slice and a component pattern the team can copy.
