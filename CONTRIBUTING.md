# Contributing

## Set up and check

```text
python scripts/setup.py
python scripts/check.py
```

Use Python 3.12+ (`python3` or `py -3.12` are alternatives). Tooling installs into
the ignored `.venv-tools/` directory (or a local per-clone cache for Windows network
shares, as printed by setup). The setup preserves existing personal hooks
through pre-commit's migration mechanism; it does not change global Git settings.
If two different existing hooks conflict, it stops and names both files.

`.shellignore` exempts only `CODEOWNERS` from the optional personal identity
scanner because it intentionally contains public review-routing handles. The
repository's private-key and secret checks still scan that file.

Checks inspect tracked/staged files: stage new files you want checked first.
Some hooks fix whitespace in place and return a failure so you can review and
stage the fixes. Run the check again after doing so. Missing tooling is a failure,
not a successful skipped check. Application checks will be added with the stack.

## Branches and commits

Create one short-lived branch per logical change, off an up-to-date `main`:

```text
git switch main
git pull --ff-only
git switch -c feature/SCRUM-42-user-profile
```

Allowed human branch prefixes are `feature/`, `fix/`, `chore/`, `docs/`, `test/`,
`refactor/`, and `ci/`. Prefer a Jira issue key followed by a lowercase slug,
such as `feature/SCRUM-42-user-profile`. Branches may also use a lowercase slug
with digits and single hyphens when no Jira issue exists yet, such as
`docs/onboarding`. Personal long-lived branches and separate frontend/backend
integration branches are not the default workflow.

Commit messages and PR titles use `type(scope): description`, at most 100
characters. Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`,
`build`, `ci`, `chore`, and `revert`. Optional scopes include `frontend`, `backend`,
and `deps`. Mark a breaking change with `!` and explain its migration impact.

```text
feat(frontend): add profile form
fix(backend): reject invalid dates
ci: add repository checks
```

The commit-message hook checks local messages. Git-generated merge/revert messages
are allowed. CI checks the PR title, including title edits; that title becomes the
squash commit title once the owner applies the merge settings. Dependabot branches
are accepted in CI only for PRs actually authored by Dependabot's bot account.
Keep Jira issue keys in branch names, commit bodies, and PR descriptions unless
the team deliberately updates the PR title convention.

## Review and merge

1. Link a small task with observable acceptance criteria.
2. Implement and run `python scripts/check.py` plus relevant application checks
   once those exist. Add regression tests for meaningful bug fixes.
3. Open a draft PR into `main`, using the template. CI runs on drafts too.
4. Resolve failing checks and inspect the diff. Mark ready for human review.
5. Have another teammate review the behaviour and test evidence. Answer significant
   findings or fix them. No AI review service is used.
6. Squash merge after CI and one human approval, then delete the feature branch.

Required checks are `repository-checks`, `pr-conventions`, and `lfs-guard`.
See [the owner setup](docs/github-owner-setup.md) for the exact GitHub settings.

The initial empty-repository bootstrap is pushed directly to `main`. Local hooks
allow `main` with a notice; enforced direct-push prevention belongs to GitHub.
After protection is enabled, use PRs rather than bypassing it. Do not force push
shared branches or hide failures with `--no-verify`.

## Definition of Done

A product backlog item is considered done only when all of these conditions are met:

- Acceptance criteria stated in the user story are satisfied.
- Automated tests pass, including unit, integration, or end-to-end coverage where
  relevant to the change.
- Manual verification passes where the story needs human UI or workflow checking.
- Code has been peer-reviewed by at least one other developer.
- Security, accessibility, and UI criteria are satisfied where applicable.
- Documentation and architecture are updated where the change affects setup,
  interfaces, decisions, backlog interpretation, or team workflow.
- The item is deployable and integrated into the increment through the reviewed
  pull-request process.

An item that does not meet all Definition of Done conditions is not counted as
complete. Return it to the product backlog or keep it open in review until the
missing condition is resolved.

## Shared practices

- Review and stage intended files; keep credentials, `.env`, dependency folders,
  build outputs, and local databases out of Git. Commit placeholder `.env.template`
  files when configuration is known, plus dependency lockfiles and migrations.
- Keep frontend and backend configuration separate. Anything bundled into the
  frontend is public; private credentials belong on the server.
- Keep real secrets out of Git. Document safe placeholder names in `.env.template`
  and follow [the security policy](SECURITY.md) if a credential is exposed.
- Test public behaviour, rejection/error paths, permissions, and data boundaries.
  Keep normal tests independent of paid external services and real personal data.
- Update docs when changing setup or interfaces. Record major choices in
  `docs/decisions/`, including alternatives and tradeoffs.
- Keep issue, PR, and test evidence useful for coursework assessment. Check the
  course policy on individual contributions and AI use before relying on bots.
- Do not add a package manager, framework, cloud service, or deployment target
  until the relevant team decision is recorded.

## Maintaining the hooks

Dependencies and hook revisions are pinned. Dependabot updates Actions and
`tooling/requirements.txt`. Review hook updates periodically with:

```text
.venv-tools/Scripts/python.exe -m pre_commit autoupdate --freeze
```

On macOS/Linux, use `.venv-tools/bin/python`. For a network-share checkout, use the
environment's `Scripts/python.exe` path printed by setup. Review the changes and run
setup/checks again. Pre-commit hook environments resolve their own transitive
dependencies; revision pinning is not a complete transitive dependency lock.

Do not install a second hook manager alongside this one. If the eventual stack
justifies switching to Husky, replace the manager in one documented migration and
preserve personal hook behaviour.
