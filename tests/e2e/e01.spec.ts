import { test, expect } from '@playwright/test';

// E01 - 31 cases. Generated from IS212_PROJECT_TEST_CASES.xlsx.
// Each test.fixme() is a specification. Remove .fixme once implemented.

test.describe('E01-S01 - Log in to the system', () => {

  /**
   * TC_E01S01_01
   * AC:      Scenario 1 - Valid credentials accepted
   * Sprint:  1.0
   *
   * Traceability:
   *   Story: E01-S01 Log in to the system
   *   Acceptance criterion: valid credentials redirect the user to their role dashboard
   *   Automated test script: tests/e2e/e01.spec.ts
   *   Implementation evidence: SCRUM-89/SCRUM-90 frontend auth adapter and route guard
   *
   * Pre-conditions:
   *   Registered account exists: organiser_a@clienta.com / ValidPass123
   *   User is on the Login page
   *
   * Test data:
   *   Email: organiser_a@clienta.com
   *   Password: ValidPass123
   *
   * Expected result:
   *   User is signed in and redirected to the Event Organiser dashboard
   */
  test('TC_E01S01_01 - valid credentials reach the Event Organiser dashboard', async ({ page }) => {
    await page.goto('/login');

    await page.getByTestId('login-email').fill('organiser_a@clienta.com');
    await page.getByTestId('login-password').fill('ValidPass123');
    await page.getByTestId('login-submit').click();

    await expect(page).toHaveURL('/app/organiser');
    await expect(page.getByRole('heading', { name: 'Event planning operations workspace' })).toBeVisible();
    await expect(page.getByText('Signed in as organiser_a@clienta.com through demo.')).toBeVisible();
  });

  /**
   * TC_E01S01_02
   * AC:      TODO - confirm which scenario this is evidence for
   * Sprint:  1.0
   *
   * Traceability:
   *   Story: E01-S01 Log in to the system
   *   Acceptance criterion: invalid credentials keep the user signed out with a generic error
   *   Automated test script: tests/e2e/e01.spec.ts
   *   Implementation evidence: SCRUM-89/SCRUM-90 login error handling
   *
   * Pre-conditions:
   *   Registered account exists: organiser_a@clienta.com / ValidPass123
   *
   * Test data:
   *   Email: organiser_a@clienta.com
   *   Password: WrongPass999 (incorrect)
   *
   * Expected result:
   *   User remains signed out and sees the generic message "Invalid email or password", which does not indicate whether the email is registered
   */
  test('TC_E01S01_02 - incorrect password keeps the user signed out with a generic error', async ({ page }) => {
    await page.goto('/login');

    await page.getByTestId('login-email').fill('organiser_a@clienta.com');
    await page.getByTestId('login-password').fill('WrongPass999');
    await page.getByTestId('login-submit').click();

    await expect(page).toHaveURL('/login');
    await expect(page.getByRole('alert')).toContainText('Email or password is incorrect.');
  });

  /**
   * TC_E01S01_03
   * AC:      Scenario 4 - Reset link issued
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   Registered account exists: organiser_a@clienta.com / ValidPass123
   *   User is on the Login page
   *
   * Test data:
   *   Email: organiser_a@clienta.com
   *   5 incorrect passwords in sequence: WrongPass1, WrongPass2, WrongPass3, WrongPass4, WrongPass5
   *   6th (correct) password: ValidPass123
   *
   * Expected result:
   *   The 6th sign-in attempt is rejected even though the password is correct; the screen shows the account is locked and displays instructions for resetting the password (e.g. a "Reset Password" link)
   */
  test.fixme('TC_E01S01_03 - Verify that after 5 consecutive incorrect password attempts, the next sign-in attempt should sh', async ({ page }) => {
    // Steps from the specification:
    // 1. Attempt to sign in with incorrect password "WrongPass1"
    // 2. Repeat with "WrongPass2", "WrongPass3", "WrongPass4", "WrongPass5" (5 consecutive incorrect attempts in total)
    // 3. Immediately attempt to sign in again, this time with the CORRECT password "ValidPass123"
    // 4. Observe the response to this 6th attempt

    // TODO implement
  });

  /**
   * TC_E01S01_04
   * AC:      Scenario 4 - Reset link issued
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   Account organiser_a@clienta.com is locked after 5 consecutive incorrect attempts
   *
   * Test data:
   *   Email: organiser_a@clienta.com
   *
   * Expected result:
   *   A password reset email containing a reset link is sent to organiser_a@clienta.com
   */
  test.fixme('TC_E01S01_04 - Verify that requesting a password reset on a locked account should send a reset link to the reg', async ({ page }) => {
    // Steps from the specification:
    // 1. On the locked-account screen, click "Reset Password"
    // 2. Confirm the reset request

    // TODO implement
  });

  /**
   * TC_E01S01_05
   * AC:      Scenario 5 - Lock lifted on new password
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   A valid password reset link has been issued to organiser_a@clienta.com, whose account is locked
   *
   * Test data:
   *   New password: NewValidPass456
   *
   * Expected result:
   *   The account lock is lifted and sign-in with the new password succeeds
   */
  test.fixme('TC_E01S01_05 - Verify that setting a new password via a valid reset link should lift the lock and allow sign-i', async ({ page }) => {
    // Steps from the specification:
    // 1. Open the reset link
    // 2. Enter "NewValidPass456" in both the New Password and Confirm Password fields
    // 3. Submit
    // 4. Attempt to sign in with organiser_a@clienta.com / NewValidPass456

    // TODO implement
  });

  /**
   * TC_E01S01_06
   * AC:      TODO - confirm which scenario this is evidence for
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   Account organiser_a@clienta.com has just been locked out after 5 consecutive incorrect attempts
   *
   * Test data:
   *   Account: organiser_a@clienta.com
   *
   * Expected result:
   *   An activity log entry exists showing account = organiser_a@clienta.com, action = "Account Locked", and a timestamp
   */
  test.fixme('TC_E01S01_06 - Verify that an account lockout should be recorded in the activity log with the account and time', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as a System Administrator
    // 2. Open the Activity Log and search for organiser_a@clienta.com

    // TODO implement
  });

test.describe('E01-S02 - Restrict event visibility to my own client', () => {

  /**
   * TC_E01S02_01
   * AC:      Scenario 1 - Own client's events only
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   Organiser organiser_a@clienta.com is linked to Client A
   *   Event EVT-A01 exists for Client A; Event EVT-B01 exists for Client B
   *
   * Test data:
   *   Username: organiser_a@clienta.com; Password: ValidPass123; Client A event: EVT-A01; Client B event: EVT-B01
   *
   * Expected result:
   *   Only EVT-A01 (Client A) is shown in the list; EVT-B01 (Client B) does not appear anywhere on the page
   */
  test.fixme('TC_E01S02_01 - Verify that an Event Organiser\'s event list should only show events from their own client organ', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as organiser_a@clienta.com
    // 2. Navigate to the Event List page
    // 3. Review the list of events displayed

    // TODO implement
  });

  /**
   * TC_E01S02_02
   * AC:      Scenario 2 - Direct access refused
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   Organiser organiser_a@clienta.com is linked to Client A
   *   Event EVT-B01 belongs to Client B
   *
   * Test data:
   *   Username: organiser_a@clienta.com; Target Event ID: EVT-B01
   *
   * Expected result:
   *   A "403 Forbidden" / "Access Denied" page is shown with no details of EVT-B01; the Activity Log records the denied attempt
   */
  test.fixme('TC_E01S02_02 - Verify that direct access to another client\'s event via URL/ID should be denied and recorded', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as organiser_a@clienta.com
    // 2. Enter the direct URL https://app.connectsphere.com/events/EVT-B01 in the browser address bar
    // 3. Press Enter and observe the response
    // 4. Log in as a System Administrator and check the Activity Log

    // TODO implement
  });

  /**
   * TC_E01S02_03
   * AC:      Scenario 3 - Colleague's event visible
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   Organisers organiser_a1@clienta.com and organiser_a2@clienta.com are both linked to Client A
   *   organiser_a2@clienta.com has created event EVT-A02
   *
   * Test data:
   *   Username: organiser_a1@clienta.com; Colleague-created event: EVT-A02 (created by organiser_a2@clienta.com)
   *
   * Expected result:
   *   EVT-A02 appears in organiser_a1@clienta.com's event list, showing organiser_a2@clienta.com as the creator
   */
  test.fixme('TC_E01S02_03 - Verify that events created by colleagues within the same client organisation should still be vi', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as organiser_a1@clienta.com
    // 2. Navigate to the Event List page
    // 3. Locate event EVT-A02

    // TODO implement
  });

  /**
   * TC_E01S02_04
   * AC:      Scenario 1 - Own client's events only
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   Client A event EVT-A03 "Annual Gala" and Client B event EVT-B03 "Annual Gala" both exist with the same name
   *
   * Test data:
   *   Search keyword: "Annual Gala"; Client A event: EVT-A03; Client B event: EVT-B03
   *
   * Expected result:
   *   Only EVT-A03 (Client A) appears in the search results; EVT-B03 (Client B) is excluded despite the exact name match
   */
  test.fixme('TC_E01S02_04 - Verify that search results should exclude events belonging to unrelated client organisations', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as organiser_a@clienta.com
    // 2. Type "Annual Gala" into the event search bar
    // 3. Press Enter and review the results

    // TODO implement
  });

  /**
   * TC_E01S02_05
   * AC:      Scenario 1 - Own client's events only
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   Organiser organiser_a@clienta.com is linked to Client A
   *   Client B event EVT-B04 exists and is scheduled to start in 24 hours
   *
   * Test data:
   *   Client B event: EVT-B04; Notification type: 24-hour Event Reminder
   *
   * Expected result:
   *   No notification referencing EVT-B04, or any other Client B event, appears in organiser_a@clienta.com's notification list
   */
  test.fixme('TC_E01S02_05 - Verify that notifications should never reference events from unrelated client organisations', async ({ page }) => {
    // Steps from the specification:
    // 1. Trigger the 24-hour reminder for Client B event EVT-B04 (e.g. via the scheduled reminder job)
    // 2. Log in as organiser_a@clienta.com
    // 3. Open the notifications panel

    // TODO implement
  });

  /**
   * TC_E01S02_06
   * AC:      TODO - confirm which scenario this is evidence for
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   Organiser organiser_a@clienta.com is linked to Client A
   *   Event EVT-B01 belongs to Client B
   *
   * Test data:
   *   Username: organiser_a@clienta.com; Target Event ID: EVT-B01
   *
   * Expected result:
   *   Activity Log contains an entry with User = organiser_a@clienta.com, Event = EVT-B01, Timestamp (to the minute), and Outcome = Access Denied
   */
  test.fixme('TC_E01S02_06 - Verify that a denied access attempt should be logged with the user, event, and time', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as organiser_a@clienta.com
    // 2. Attempt to access https://app.connectsphere.com/events/EVT-B01 directly
    // 3. Log in as a System Administrator
    // 4. Navigate to the Activity Log and locate the corresponding entry

    // TODO implement
  });

test.describe('E01-S03 - Hide internal planning information from Attendees', () => {

  /**
   * TC_E01S03_01
   * AC:      Scenario 1 - Published details only
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   Attendee attendee_a@example.com is registered for event "Keynote: AI in 2027" (event EVT-101)
   *   The event has a Coordinator note "Confirm AV setup with vendor", a booking decision, and an equipment reservation on file
   *
   * Test data:
   *   Event: Keynote: AI in 2027; Coordinator note (must stay hidden): "Confirm AV setup with vendor"
   *
   * Expected result:
   *   The published name, date, time and venue are shown; no Coordinator notes, booking decisions, equipment reservations, or internal comments appear anywhere
   */
  test.fixme('TC_E01S03_01 - Verify that an Attendee viewing a registered event should see only published details, not int', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as attendee_a@example.com
    // 2. Open the registered event "Keynote: AI in 2027"
    // 3. Review all information displayed on the page

    // TODO implement
  });

  /**
   * TC_E01S03_02
   * AC:      Scenario 2 - Internal screen refused
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   Attendee attendee_a@example.com is signed in
   *
   * Test data:
   *   Target URL: /internal/planning/EVT-101
   *
   * Expected result:
   *   Access is refused (e.g. "403 Forbidden"); the Activity Log records the denied attempt with attendee_a@example.com as the user
   */
  test.fixme('TC_E01S03_02 - Verify that an Attendee attempting to open an internal planning screen directly should be refus', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as attendee_a@example.com
    // 2. Enter the direct URL https://app.connectsphere.com/internal/planning/EVT-101
    // 3. Press Enter
    // 4. Log in as a System Administrator and check the Activity Log

    // TODO implement
  });

  /**
   * TC_E01S03_03
   * AC:      TODO - confirm which scenario this is evidence for
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   attendee_a@example.com is registered for "Keynote: AI in 2027" only
   *   Event "Workshop: Cloud Security" exists and attendee_a@example.com is NOT registered for it
   *
   * Test data:
   *   Registered event: Keynote: AI in 2027; Unregistered event: Workshop: Cloud Security
   *
   * Expected result:
   *   Only "Keynote: AI in 2027" appears in the list; "Workshop: Cloud Security" does not appear anywhere
   */
  test.fixme('TC_E01S03_03 - Verify that an Attendee should not see events or events they are not registered for', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as attendee_a@example.com
    // 2. Navigate to "My Events"
    // 3. Review the list of events/events shown

    // TODO implement
  });

test.describe('E01-S04 - Update my account details', () => {

  /**
   * TC_E01S04_01
   * AC:      Scenario 1 - Valid changes saved
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   organiser_a@clienta.com is signed in
   *   Current profile: Name = "Alex Organiser", Organisation = "Client A Pte Ltd", Phone = "9123 4567"
   *
   * Test data:
   *   New Name: Alexandra Organiser; New Organisation: Client A Holdings; New Phone: 9876 5432
   *
   * Expected result:
   *   All three updated fields (Name, Organisation, Phone) show the new values immediately after saving and again after re-opening the profile in a new event
   */
  test.fixme('TC_E01S04_01 - Verify that valid changes to name, organisation, and contact number should all be saved and sho', async ({ page }) => {
    // Steps from the specification:
    // 1. Navigate to "My Profile"
    // 2. Change Name to "Alexandra Organiser", Organisation to "Client A Holdings", and Phone to "9876 5432"
    // 3. Click "Save"
    // 4. Log out, log back in, and reopen "My Profile"

    // TODO implement
  });

  /**
   * TC_E01S04_02
   * AC:      Scenario 2 - Malformed email rejected
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   organiser_a@clienta.com is signed in and on "My Profile"
   *
   * Test data:
   *   Invalid email: organiser_a_at_clienta.com
   *
   * Expected result:
   *   The save is rejected; the Email field is highlighted with the message "Please enter a valid email address"
   */
  test.fixme('TC_E01S04_02 - Verify that saving a malformed email address should be rejected with the field identified', async ({ page }) => {
    // Steps from the specification:
    // 1. Enter "organiser_a_at_clienta.com" (missing @) in the Email field
    // 2. Click "Save"

    // TODO implement
  });

  /**
   * TC_E01S04_03
   * AC:      Scenario 2 - Malformed email rejected
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   Account organiser_b@clienta.com already exists
   *
   * Test data:
   *   Duplicate email: organiser_b@clienta.com
   *
   * Expected result:
   *   The save is rejected with a message stating the email address is already in use
   */
  test.fixme('TC_E01S04_03 - Verify that saving an email already registered to another account should be rejected', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as organiser_a@clienta.com
    // 2. Navigate to "My Profile"
    // 3. Enter "organiser_b@clienta.com" in the Email field
    // 4. Click "Save"

    // TODO implement
  });

  /**
   * TC_E01S04_04
   * AC:      Scenario 4 - Notifications follow the new address
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   organiser_a@clienta.com successfully changes their email to organiser_a_new@clienta.com
   *
   * Test data:
   *   New email: organiser_a_new@clienta.com
   *
   * Expected result:
   *   The notification is delivered to organiser_a_new@clienta.com, not the previous address
   */
  test.fixme('TC_E01S04_04 - Verify that changing the registered email should route future notifications to the new address', async ({ page }) => {
    // Steps from the specification:
    // 1. Update the email to organiser_a_new@clienta.com and save
    // 2. Trigger a notification (e.g. status change on an owned event)
    // 3. Check which address receives the notification

    // TODO implement
  });

  /**
   * TC_E01S04_05
   * AC:      TODO - confirm which scenario this is evidence for
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   organiser_a@clienta.com is signed in with role "Event Organiser"
   *
   * Test data:
   *   N/A
   *
   * Expected result:
   *   No editable Role field/control is present; the role remains "Event Organiser" and cannot be changed from this screen
   */
  test.fixme('TC_E01S04_05 - Verify that a user should not be able to change their own role from the account details screen', async ({ page }) => {
    // Steps from the specification:
    // 1. Navigate to "My Profile"
    // 2. Look for a Role field or control on the page

    // TODO implement
  });

test.describe('E01-S08 - Create an account', () => {

  /**
   * TC_E01S08_01
   * AC:      Scenario 1 - Account created
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   No account exists for newattendee@example.com
   *
   * Test data:
   *   Email: newattendee@example.com; Password: a valid test password
   *
   * Expected result:
   *   The account is created and sign-in with the same test credentials succeeds
   */
  test.fixme('TC_E01S08_01 - Verify that submitting valid sign-up details should create an Attendee account that can then si', async ({ page }) => {
    // Steps from the specification:
    // 1. Navigate to the public sign-up form
    // 2. Enter Name: "Jamie Lee", Email: newattendee@example.com, and a valid test password
    // 3. Click "Create Account"
    // 4. Attempt to sign in with the new credentials

    // TODO implement
  });

  /**
   * TC_E01S08_02
   * AC:      Scenario 1 - Account created
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   Account organiser_a@clienta.com already exists
   *
   * Test data:
   *   Email: organiser_a@clienta.com (already registered)
   *
   * Expected result:
   *   The message "This email address is already in use" is shown; no second account is created
   */
  test.fixme('TC_E01S08_02 - Verify that signing up with an already-registered email should be rejected without creating a d', async ({ page }) => {
    // Steps from the specification:
    // 1. Navigate to the sign-up form
    // 2. Enter Email: organiser_a@clienta.com and complete the rest of the form
    // 3. Click "Create Account"

    // TODO implement
  });

  /**
   * TC_E01S08_03
   * AC:      Scenario 1 - Account created
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   Sign-up form is open
   *
   * Test data:
   *   Name: (blank); Email: newattendee3@example.com; Password: a valid test password
   *
   * Expected result:
   *   The account is not created; the Name field is highlighted with the message "Name is required"
   */
  test.fixme('TC_E01S08_03 - Verify that leaving a required sign-up field empty should block account creation and identify t', async ({ page }) => {
    // Steps from the specification:
    // 1. Leave the Name field empty
    // 2. Enter Email: newattendee3@example.com and a password that meets the policy
    // 3. Click "Create Account"

    // TODO implement
  });

  /**
   * TC_E01S08_04
   * AC:      Scenario 1 - Account created
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   newattendee2@example.com successfully completes sign-up
   *
   * Test data:
   *   Email: newattendee2@example.com
   *
   * Expected result:
   *   The account's role is "Attendee" and no other role is assigned
   */
  test.fixme('TC_E01S08_04 - Verify that an account created through the public sign-up form should hold the Attendee role on', async ({ page }) => {
    // Steps from the specification:
    // 1. Complete sign-up with valid details
    // 2. Log in as a System Administrator
    // 3. Open the new account's profile and check its assigned role

    // TODO implement
  });

  /**
   * TC_E01S08_05
   * AC:      TODO - confirm which scenario this is evidence for
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   Sign-up form is open (not signed in)
   *
   * Test data:
   *   N/A
   *
   * Expected result:
   *   No role selector, dropdown, or checkbox for internal roles (e.g. Event Coordinator, Venue Staff) appears anywhere on the form
   */
  test.fixme('TC_E01S08_05 - Verify that the public sign-up form should not offer any internal role as a choice', async ({ page }) => {
    // Steps from the specification:
    // 1. Navigate to the public sign-up form
    // 2. Review all fields and controls on the form

    // TODO implement
  });

  /**
   * TC_E01S08_06
   * AC:      Scenario 1 - Account created
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   Sign-up form is open
   *
   * Test data:
   *   Name: Jordan Tan; Email: newattendee4@example.com; Password: 1234 (too weak)
   *
   * Expected result:
   *   The account is not created; the Password field shows the specific policy requirement it fails (e.g. "Password must be at least 8 characters and include a number")
   */
  test.fixme('TC_E01S08_06 - Verify that entering a password that fails the stated policy should block account creation and ', async ({ page }) => {
    // Steps from the specification:
    // 1. Enter Name: "Jordan Tan" and Email: newattendee4@example.com (all other fields valid)
    // 2. Enter Password: "1234" (does not meet policy)
    // 3. Click "Create Account"

    // TODO implement
  });

test.describe('E01-S11 - Deactivate my account', () => {

  /**
   * TC_E01S11_01
   * AC:      Scenario 1 - Deactivated and signed out
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   organiser_a@clienta.com is signed in
   *
   * Test data:
   *   Email: organiser_a@clienta.com
   *
   * Expected result:
   *   The user is signed out immediately; the subsequent sign-in attempt fails with a message that the account is deactivated
   */
  test.fixme('TC_E01S11_01 - Verify that confirming deactivation should sign the user out and block further sign-in with tho', async ({ page }) => {
    // Steps from the specification:
    // 1. Navigate to "Account Settings"
    // 2. Click "Deactivate Account"
    // 3. Confirm the deactivation
    // 4. Attempt to sign in again with organiser_a@clienta.com / ValidPass123

    // TODO implement
  });

  /**
   * TC_E01S11_02
   * AC:      Scenario 2 - Historical records retained
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   organiser_a@clienta.com has deactivated their account (as performed in TC_E01S11_01); they previously created event "Annual Tech Summit"
   *
   * Test data:
   *   Event: Annual Tech Summit
   *
   * Expected result:
   *   The event still shows organiser_a@clienta.com (marked deactivated) as creator, and all historical details remain intact
   */
  test.fixme('TC_E01S11_02 - Verify that past registrations and event records should remain intact and attributed after deac', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as a System Administrator
    // 2. Open event "Annual Tech Summit"
    // 3. Check the recorded creator/owner attribution

    // TODO implement
  });

  /**
   * TC_E01S11_03
   * AC:      Scenario 3 - Upcoming registration released
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   Attendee attendee_a@example.com is registered for upcoming event "Keynote: AI in 2027"
   *
   * Test data:
   *   Attendee: attendee_a@example.com; Event: Keynote: AI in 2027
   *
   * Expected result:
   *   attendee_a@example.com's registration is withdrawn and the event's remaining capacity increases by one
   */
  test.fixme('TC_E01S11_03 - Verify that an Attendee\'s upcoming registration should be withdrawn and its place released on d', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as attendee_a@example.com
    // 2. Deactivate the account
    // 3. Check the event's registration list and remaining capacity

    // TODO implement
  });

  /**
   * TC_E01S11_04
   * AC:      Scenario 4 - Coordinator with events blocked
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   coordinator_1@connectsphere.com is currently assigned to 2 active events
   *
   * Test data:
   *   Coordinator: coordinator_1@connectsphere.com (2 assigned events)
   *
   * Expected result:
   *   Deactivation is blocked with a message listing the assigned events that must be reassigned first
   */
  test.fixme('TC_E01S11_04 - Verify that an Event Coordinator with assigned events should be blocked from deactivating until', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Navigate to "Account Settings"
    // 3. Click "Deactivate Account"

    // TODO implement
  });

  /**
   * TC_E01S11_05
   * AC:      TODO - confirm which scenario this is evidence for
   * Sprint:  1.0
   *
   * Pre-conditions:
   *   organiser_a@clienta.com is signed in
   *
   * Test data:
   *   Account: organiser_a@clienta.com
   *
   * Expected result:
   *   An activity log entry exists showing actor = organiser_a@clienta.com, action = "Account Deactivated", and a timestamp
   */
  test.fixme('TC_E01S11_05 - Verify that a deactivation should be recorded in the activity log with the actor and time', async ({ page }) => {
    // Steps from the specification:
    // 1. Deactivate the account
    // 2. Log in as a System Administrator
    // 3. Open the Activity Log and search for organiser_a@clienta.com

    // TODO implement
  });

});
});
});
});
});
});
