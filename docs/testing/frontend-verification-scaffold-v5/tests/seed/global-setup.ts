import type { FullConfig } from '@playwright/test';

// Resets and reseeds the database before the suite runs.
// See SEED_DATA.md for the exact rows every test case assumes exist.
async function globalSetup(_config: FullConfig) {
  // TODO implement against your migration/seed tooling, for example:
  //   await execa('npm', ['run', 'db:reset']);
  //   await execa('npm', ['run', 'db:seed:test']);
  // Fail loudly. A partially seeded database produces failures that look like
  // application bugs and will waste more time than it saves.
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set. Refusing to run against an unknown database.');
  }
}

export default globalSetup;
