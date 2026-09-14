# End-to-end tests

This directory contains the runnable Playwright scaffold for the ConnectSphere
frontend verification plan. The cases are intentionally `test.fixme()` stubs:
they preserve traceability to the source test cases without implementing story
test bodies before the owning feature work exists.

Run the scaffold from the repository root:

```text
npm run test:e2e:scaffold
```

The default global setup runs in scaffold mode and skips database reset/seed
work. When the real migration and seed commands exist, set
`CONNECTSPHERE_E2E_SEED=required` and update `tests/seed/global-setup.ts` to call
those commands. Until then, explicit seeded runs fail loudly rather than giving a
false sense that the database was prepared.

As stories become real, remove `.fixme` case by case, add stable `data-testid`
selectors, and assert acceptance criteria rather than Figma pixel fidelity. Store
failure traces/screenshots as CI artifacts, not committed generated files.
Repository tooling tests live in `tooling/tests/`.
