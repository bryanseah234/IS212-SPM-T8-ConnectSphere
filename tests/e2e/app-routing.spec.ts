import { expect, test } from '@playwright/test';

test.describe('application routing and login shell', () => {
  /**
   * Traceability:
   * - Story: E01-S01 Log in to the system
   * - Acceptance criterion: the Login page is reachable from the public entry point.
   * - Automated test script: tests/e2e/app-routing.spec.ts.
   * - Implementation evidence: SCRUM-89, frontend route shell, PR #35.
   */
  test('public landing links to login', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { name: 'Plan campus events without losing the thread.' }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Login to workspace' }).click();

    await expect(page).toHaveURL('/login');
    await expect(
      page.getByRole('heading', { name: 'Continue to your event operations workspace.' }),
    ).toBeVisible();
  });

  /**
   * Traceability:
   * - Story: E01-S01 Log in to the system
   * - Acceptance criterion: unauthenticated users cannot open protected role workspaces.
   * - Automated test script: tests/e2e/app-routing.spec.ts.
   * - Implementation evidence: SCRUM-89, protected route guard, PR #35.
   */
  test('protected app route redirects signed-out users to login', async ({ page }) => {
    await page.goto('/app/organiser');

    await expect(page).toHaveURL('/login');
    await expect(page.getByTestId('login-submit')).toBeVisible();
  });

  /**
   * Traceability:
   * - Story: E01-S01 Log in to the system
   * - Acceptance criterion: a valid organiser credential reaches the organiser workspace.
   * - Automated test script: tests/e2e/app-routing.spec.ts.
   * - Implementation evidence: SCRUM-89/SCRUM-90, Supabase-ready auth adapter, PR #35.
   */
  test('demo organiser login opens the organiser workspace', async ({ page }) => {
    await page.goto('/login');

    await page.getByTestId('login-password').fill('connectsphere-demo');
    await page.getByTestId('login-submit').click();

    await expect(page).toHaveURL('/app/organiser');
    await expect(page.getByRole('heading', { name: 'Event planning operations workspace' })).toBeVisible();
    await expect(page.getByText('Signed in as organiser_a@clienta.com through demo.')).toBeVisible();
  });

  /**
   * Traceability:
   * - Story: E01-S01 Log in to the system
   * - Acceptance criterion: invalid credentials keep the user signed out with a generic error.
   * - Automated test script: tests/e2e/app-routing.spec.ts.
   * - Implementation evidence: SCRUM-89/SCRUM-90, login form error handling, PR #35.
   */
  test('invalid login shows a generic error', async ({ page }) => {
    await page.goto('/login');

    await page.getByTestId('login-password').fill('WrongPass999');
    await page.getByTestId('login-submit').click();

    await expect(page.getByRole('alert')).toContainText('Email or password is incorrect.');
    await expect(page).toHaveURL('/login');
  });
});
