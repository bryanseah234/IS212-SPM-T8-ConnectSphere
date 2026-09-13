import { test, expect } from '@playwright/test';

// E08 - 14 cases. Generated from IS212_PROJECT_TEST_CASES.xlsx.
// Each test.fixme() is a specification. Remove .fixme once implemented.

test.describe('E08-S03 - Confirm an event', () => {

  /**
   * TC_E08S03_01
   * AC:      Scenario 5 - Organiser sees confirmed arrangements
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   Event "Charity Run" has one event with a confirmed venue booking (Riverside Hall) and its full requested equipment reserved, and requires no technical support
   *
   * Test data:
   *   Event: Charity Run (venue confirmed, equipment fully reserved, no tech support needed)
   *
   * Expected result:
   *   The status becomes "Confirmed", and organiser_a@clienta.com is notified with the confirmed details
   */
  test.fixme('TC_E08S03_01 - Verify that confirming an event where every event has a confirmed venue and full equipment re', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Open event "Charity Run"
    // 3. Click "Confirm Event"
    // 4. Check the status and organiser_a@clienta.com's notifications

    // TODO implement
  });

  /**
   * TC_E08S03_02
   * AC:      Scenario 2 - Missing venue blocks confirmation
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   Event "Tech Conference 2026" has Event 1 with a confirmed venue, but Event 2 has no confirmed venue yet
   *
   * Test data:
   *   Event 1: venue confirmed; Event 2: no venue
   *
   * Expected result:
   *   Confirmation is blocked; the message lists "Event 2" as missing a confirmed venue
   */
  test.fixme('TC_E08S03_02 - Verify that attempting to confirm an event while an event is missing a confirmed venue should ', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Open event "Tech Conference 2026"
    // 3. Click "Confirm Event"

    // TODO implement
  });

  /**
   * TC_E08S03_03
   * AC:      Scenario 3 - Partial equipment blocks confirmation
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   Event "Tech Conference 2026" has all events with confirmed venues, but Event 2's "Projector" reservation is partial (2 of 3 requested)
   *
   * Test data:
   *   Event 2: Projector reserved 2 of 3 requested
   *
   * Expected result:
   *   Confirmation is blocked; the message shows Event 2's outstanding quantity of 1 "Projector" unit
   */
  test.fixme('TC_E08S03_03 - Verify that attempting to confirm an event while an event has only a partial equipment reserva', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Open event "Tech Conference 2026"
    // 3. Click "Confirm Event"

    // TODO implement
  });

  /**
   * TC_E08S03_04
   * AC:      Scenario 4 - Outstanding support assignment blocks confirmation
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   All events of "Tech Conference 2026" have confirmed venues and full equipment, but Event 1's technical support request has no staff assigned
   *
   * Test data:
   *   Event 1: technical support requested, no staff assigned
   *
   * Expected result:
   *   Confirmation is blocked due to Event 1's outstanding technical support assignment
   */
  test.fixme('TC_E08S03_04 - Verify that attempting to confirm an event while an event\'s requested technical support has no', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Open event "Tech Conference 2026"
    // 3. Click "Confirm Event"

    // TODO implement
  });

  /**
   * TC_E08S03_05
   * AC:      Scenario 5 - Organiser sees confirmed arrangements
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   Event "Charity Run" has just been confirmed, with venue Riverside Hall, date 15/01/2027, time 09:00–17:00
   *
   * Test data:
   *   Confirmed venue: Riverside Hall; Date: 15/01/2027; Time: 09:00–17:00
   *
   * Expected result:
   *   The Organiser sees the confirmed venue (Riverside Hall), date (15/01/2027), time (09:00–17:00), and full arrangements for the event
   */
  test.fixme('TC_E08S03_05 - Verify that once an event is confirmed, the Organiser should see the confirmed venue, date, tim', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as organiser_a@clienta.com
    // 2. Open the confirmed event "Charity Run"

    // TODO implement
  });

test.describe('E08-S04 - Revert a confirmed event to planning', () => {

  /**
   * TC_E08S04_01
   * AC:      Scenario 1 - Reverted with a recorded reason
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   Event "Leadership Summit" has status "Confirmed"
   *
   * Test data:
   *   Reason: "Venue reported a plumbing issue"
   *
   * Expected result:
   *   The status changes to "Planning", and organiser_a@clienta.com is notified with the reason "Venue reported a plumbing issue"
   */
  test.fixme('TC_E08S04_01 - Verify that reverting a Confirmed event to Planning with a recorded reason should update its st', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Open event "Leadership Summit"
    // 3. Click "Revert to Planning"
    // 4. Enter reason "Venue reported a plumbing issue"
    // 5. Confirm

    // TODO implement
  });

  /**
   * TC_E08S04_02
   * AC:      Scenario 2 - Registered Attendees notified
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   Event "Leadership Summit" has status "Confirmed" with attendee_a@example.com registered
   *
   * Test data:
   *   Registered Attendee: attendee_a@example.com
   *
   * Expected result:
   *   attendee_a@example.com receives a notification that arrangements for "Leadership Summit" are being revised
   */
  test.fixme('TC_E08S04_02 - Verify that reverting a Confirmed event with registered Attendees should notify them that arran', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Open event "Leadership Summit"
    // 3. Revert it to Planning with a reason
    // 4. Check attendee_a@example.com's notifications

    // TODO implement
  });

  /**
   * TC_E08S04_03
   * AC:      Scenario 3 - No automatic reversion
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   Event "Leadership Summit" has status "Confirmed"; its venue booking has just been flagged due to a broken arrangement, but no one has reverted the event
   *
   * Test data:
   *   Flagged arrangement: venue booking
   *
   * Expected result:
   *   The event status remains "Confirmed"; the affected venue booking is shown flagged, but no automatic status change has occurred
   */
  test.fixme('TC_E08S04_03 - Verify that an arrangement breaking on a Confirmed event should not automatically revert its st', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as organiser_a@clienta.com
    // 2. Open event "Leadership Summit"
    // 3. Check the event status and the flagged arrangement

    // TODO implement
  });

  /**
   * TC_E08S04_04
   * AC:      Scenario 1 - Reverted with a recorded reason
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   Event "Leadership Summit" has just been reverted from "Confirmed" to "Planning" by coordinator_1@connectsphere.com
   *
   * Test data:
   *   Event: Leadership Summit
   *
   * Expected result:
   *   An activity log entry exists recording the reversion, with actor = coordinator_1@connectsphere.com, action = "Reverted to Planning", and a timestamp
   */
  test.fixme('TC_E08S04_04 - Verify that a reversion from Confirmed to Planning should be recorded in the activity log', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as a System Administrator
    // 2. Open the Activity Log and search for "Leadership Summit"

    // TODO implement
  });

test.describe('E08-S05 - Complete an event', () => {

  /**
   * TC_E08S05_01
   * AC:      Scenario 1 - Auto-completed after last event
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   Event "Charity Run" has status "Confirmed"; its only event ended at 17:00 on 15/01/2027, which has now passed
   *
   * Test data:
   *   Event end time: 17:00, 15/01/2027 (passed)
   *
   * Expected result:
   *   The event status has automatically changed to "Completed"
   */
  test.fixme('TC_E08S05_01 - Verify that a Confirmed event should automatically become Completed once its last event\'s end', async ({ page }) => {
    // Steps from the specification:
    // 1. Wait for (or trigger) the system's next scheduled evaluation after 17:00 on 15/01/2027
    // 2. Open event "Charity Run" and check its status

    // TODO implement
  });

  /**
   * TC_E08S05_02
   * AC:      Scenario 2 - Marked complete manually
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   Event "Volunteer Training Day" has status "Confirmed"; its last (only) event started at 09:00 today and is still in progress
   *
   * Test data:
   *   Event started: 09:00 today
   *
   * Expected result:
   *   The event status changes to "Completed"
   */
  test.fixme('TC_E08S05_02 - Verify that an Event Coordinator should be able to manually mark a Confirmed event complete onc', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Open event "Volunteer Training Day"
    // 3. Click "Mark Complete"

    // TODO implement
  });

  /**
   * TC_E08S05_03
   * AC:      Scenario 2 - Marked complete manually
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   Event "Tech Conference 2026" has status "Confirmed"; its first event has not yet started
   *
   * Test data:
   *   First event: not yet started
   *
   * Expected result:
   *   The action is blocked; the event cannot be marked complete before it has started
   */
  test.fixme('TC_E08S05_03 - Verify that attempting to mark an event complete before its first event has started should be', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Open event "Tech Conference 2026"
    // 3. Attempt to click "Mark Complete"

    // TODO implement
  });

  /**
   * TC_E08S05_04
   * AC:      Scenario 4 - Cancelled event never auto-completes
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   Event "Product Launch Night" has status "Cancelled" (per TC_E10S04_01); its original end time has now passed
   *
   * Test data:
   *   Original end time: passed
   *
   * Expected result:
   *   The event status remains "Cancelled"; it has not been auto-completed
   */
  test.fixme('TC_E08S05_04 - Verify that a Cancelled event should never auto-complete, even after its original end time pass', async ({ page }) => {
    // Steps from the specification:
    // 1. Wait for (or trigger) the system's next scheduled evaluation after "Product Launch Night"'s original end time
    // 2. Open event "Product Launch Night" and check its status

    // TODO implement
  });

  /**
   * TC_E08S05_05
   * AC:      TODO - confirm which scenario this is evidence for
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   Event "Charity Run" has just transitioned to "Completed" (per TC_E08S05_01)
   *
   * Test data:
   *   Event: Charity Run
   *
   * Expected result:
   *   An activity log entry exists recording the transition to "Completed", with the time it occurred
   */
  test.fixme('TC_E08S05_05 - Verify that an event\'s transition to Completed should be recorded in the activity log', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as a System Administrator
    // 2. Open the Activity Log and search for "Charity Run"

    // TODO implement
  });

});
});
});
