import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  // Week 1 §8c requires all user groups to complete activities without extensive
  // training, and §7 requires desktop and mobile friendliness. Running the suite
  // on both viewports satisfies the responsive requirement once, centrally,
  // rather than cloning a responsive check onto every story.
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile',  use: { ...devices['Pixel 7'] } },
  ],
  reporter: [
    ['list'],
    // The HTML report lists every test by its TC_ id. That report is your
    // traceability evidence for the rubric: requirement -> case -> result.
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  // Scaffold mode skips database work while every case is still test.fixme().
  // Real seeded runs are gated in tests/seed/global-setup.ts.
  globalSetup: './tests/seed/global-setup.ts',
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
});
