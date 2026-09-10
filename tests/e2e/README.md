# End-to-end tests

No application tests exist yet. This directory is reserved for tests exercising
the browser, backend, and test database together.

After the first feature, cover a few critical journeys with isolated synthetic
data. Playwright is the suggested browser runner. Avoid fixed sleeps and selectors
tied to implementation details. Store failure traces/screenshots as CI artifacts,
not committed generated files. Repository tooling tests live in `tooling/tests/`.
