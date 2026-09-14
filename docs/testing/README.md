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

## Traceability Standard

For every implemented automated test, keep a short traceability block near the
test. It must name:

- the user story or Jira issue;
- the acceptance criterion being verified;
- the automated test script;
- the implementation evidence, such as the PR, branch, or commit.

This preserves the chain from requirement to test to code, shows which tests must
change when an acceptance criterion changes, and lets the team prove that each
criterion has at least one test as stories are completed. The generated
`test.fixme()` cases already include story IDs, acceptance criteria, test data,
expected results, and steps; when a team member implements one, they should keep
that traceability data instead of replacing it with an unlabelled test.
