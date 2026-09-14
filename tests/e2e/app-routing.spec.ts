import { expect, test } from '@playwright/test';

test.describe('application routing and login shell', () => {
  /**
   * Traceability:
   * - Story: E01-S01 Log in to the system
   * - Acceptance evidence: users can reach the Login page from the public entry point.
   * - Implementation: frontend route shell in SCRUM-89.
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
   * - Acceptance evidence: unauthenticated users cannot open protected role workspaces.
   * - Implementation: frontend protected route shell in SCRUM-89.
   */
  test('protected app route redirects signed-out users to login', async ({ page }) => {
    await page.goto('/app/organiser');

    await expect(page).toHaveURL('/login');
    await expect(page.getByTestId('login-submit')).toBeVisible();
  });

  /**
   * Traceability:
   * - Story: E01-S01 Log in to the system
   * - Acceptance evidence: a valid local demo organiser credential reaches the organiser workspace.
   * - Implementation: Supabase-ready auth adapter with demo fallback in SCRUM-89.
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
   * - Acceptance evidence: invalid credentials keep the user signed out with a generic error.
   * - Implementation: login form error handling in SCRUM-89.
   */
  test('invalid login shows a generic error', async ({ page }) => {
    await page.goto('/login');

    await page.getByTestId('login-password').fill('WrongPass999');
    await page.getByTestId('login-submit').click();

    await expect(page.getByRole('alert')).toContainText('Email or password is incorrect.');
    await expect(page).toHaveURL('/login');
  });
});
