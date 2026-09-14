import type { FullConfig } from '@playwright/test';

// Resets and reseeds the database before the suite runs.
// See SEED_DATA.md for the exact rows every test case assumes exist.
async function globalSetup(_config: FullConfig) {
  const seedMode = process.env.CONNECTSPHERE_E2E_SEED ?? 'scaffold';

  if (seedMode !== 'required') {
    console.log(
      'Playwright scaffold mode: skipping database reset/seed. Set CONNECTSPHERE_E2E_SEED=required when real seed tooling exists.',
    );
    return;
  }

  // TODO implement against the accepted migration/seed tooling, for example:
  //   await execa('npm', ['run', 'db:reset']);
  //   await execa('npm', ['run', 'db:seed:test']);
  // Fail loudly. A partially seeded database produces failures that look like
  // application bugs and will waste more time than it saves.
  throw new Error(
    'CONNECTSPHERE_E2E_SEED=required was set, but database reset/seed tooling is not implemented yet.',
  );
}

export default globalSetup;
