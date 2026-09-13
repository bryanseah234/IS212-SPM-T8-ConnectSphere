# Testing References

This folder holds testing plans and imported scaffolds that are useful for
planning, but are not active application tests yet.

The frontend stack is still undecided. Do not treat the Playwright scaffold in
`frontend-verification-scaffold-v5/` as runnable CI until the team records the
frontend stack decision, adds the required package manifest and lockfile, and
promotes the relevant files into the real test locations.

Current scaffold snapshot:

- 11 Playwright spec files.
- 222 `test.fixme()` case stubs.
- 26 cases still need a human to confirm the matching acceptance scenario.
- `github-workflow.example.yml` is an example only, not an active GitHub Actions
  workflow.
