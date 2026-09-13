# Agent Instructions

This repository is a school web application monorepo. The stack is not selected
yet, so repository tooling and documentation are the source of truth until real
frontend and backend code exists.

Before changing files, read `README.md`, `CONTRIBUTING.md`, and
`docs/repository-setup.md` enough to understand the current workflow. If a
future `.agents/STATE.md` file exists, read it as shared handoff context. Do not
write secrets, personal data, or machine-specific paths into committed files.
For product, backlog, design, testing, or Jira work, also read
`docs/source-of-truth.md` before editing derivative Markdown, Figma notes, Jira
issues, or scaffold files.

Use short-lived branches and reviewed pull requests into `main`. Commit messages
and PR titles must follow the repository's conventional format, and branch names
must use the prefixes documented in `CONTRIBUTING.md`. Do not force push shared
branches or bypass hooks unless the user explicitly asks for a narrow recovery
operation.

Run `python scripts/check.py` before committing. A passing repository check
covers repository hygiene and tooling tests only; do not describe it as passing
application lint, tests, build, or deployment until those checks are implemented.

Keep imported template material scoped to what this repo actually uses. Do not
add paid services, AI reviewers, bot auto-merge, privileged `pull_request_target`
workflows, or deployment secrets without a recorded team decision.
