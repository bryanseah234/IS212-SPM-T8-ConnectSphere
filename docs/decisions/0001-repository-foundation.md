# ADR 0001: A stack-independent monorepo foundation

- Date: 2026-09-10
- Status: accepted for repository tooling; application choices remain open

## Context

The school team wants consistent naming, local feedback, CI, review, and eventual
deployment before choosing an application stack. A frontend/backend monorepo is
the agreed layout.

## Decision

Use short-lived branches from `main`, Conventional Commits and PR titles, squash
merging, one human reviewer, advisory AI review, and independently enforced CI.
Use one pre-commit hook manager, with Python 3.12+ for cross-platform tooling only.
Preserve inherited personal hooks. Bootstrap directly onto the initially empty
`main`, then have an administrator enable the proposed protection.

Track the frontend/backend boundaries without generating placeholder apps or
claiming nonexistent application tests pass. Configure repository hygiene and
tooling tests now; introduce real application checks with the selected stack.

Prepare CodeRabbit configuration as the suggested hosted reviewer. Activation
requires the owner's GitHub App installation and a team decision about access and
cost. Do not provision AWS merely to reproduce an internship review setup.

## Alternatives and tradeoffs

- Husky is appropriate for an all-JavaScript team, but choosing it now would add
  Node tooling before the stack decision. A later deliberate migration is possible.
- A long-lived `develop` branch introduces an extra integration step; defer it
  until the team has a release requirement that justifies it.
- Heavy monorepo orchestration, microservices, automated releases, containers, and
  cloud deployment should follow actual application and course requirements.
- Python is an extra contributor prerequisite. One setup command and an isolated
  environment make that dependency explicit and keep global packages untouched.

## Consequences

The baseline is immediately useful and portable. A green check proves repository
hygiene and tooling behaviour, not application functionality or deployment health.
GitHub protections and reviewer activation are separate from committed files.
