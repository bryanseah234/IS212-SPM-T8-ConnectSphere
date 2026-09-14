# Testing References

This folder holds testing plans and imported scaffolds that are useful for
planning. The active runnable Playwright scaffold now lives in `tests/e2e/`,
with this folder keeping the source reference copy.

Do not implement story assertions in the reference copy under
`frontend-verification-scaffold-v5/`. Update `docs/testing/PROJECT TEST
CASES.xlsx` first, then regenerate/promote the matching `test.fixme()` stubs in
`tests/e2e/` so the runnable scaffold remains traceable to the workbook.

Current scaffold snapshot:

- 11 Playwright spec files.
- 227 `test.fixme()` case stubs from `PROJECT TEST CASES.xlsx`.
- 454 skipped Playwright cases when run across desktop and mobile projects.
- `github-workflow.example.yml` is an example only, not an active GitHub Actions
  workflow.
