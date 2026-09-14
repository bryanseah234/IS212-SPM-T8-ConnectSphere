import { test, expect } from '@playwright/test';

// E10 - 16 cases. Generated from IS212_PROJECT_TEST_CASES.xlsx.
// Each test.fixme() is a specification. Remove .fixme once implemented.

test.describe('E10-S01 - Request a change after submission', () => {

  /**
   * TC_E10S01_01
   * AC:      Scenario 1 - Change request recorded
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   Event "Community Meetup" has status "Confirmed"
   *
   * Test data:
   *   Change description: "Increase expected attendance to 10"
   *
   * Expected result:
   *   coordinator_1@connectsphere.com is notified, and the change request is recorded against "Community Meetup"
   */
  test.fixme('TC_E10S01_01 - Verify that submitting a change request on an approved or confirmed event should notify the ass', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as organiser_a@clienta.com
    // 2. Open event "Community Meetup"
    // 3. Click "Request a Change"
    // 4. Describe the change: "Increase expected attendance to 10"
    // 5. Submit

    // TODO implement
  });

  /**
   * TC_E10S01_02
   * AC:      Scenario 2 - Confirmed details shown alongside
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   Event "Community Meetup" has a pending change request; its confirmed details (venue, date, time) remain unchanged
   *
   * Test data:
   *   Pending request: Increase expected attendance to 10
   *
   * Expected result:
   *   The page shows both the currently confirmed details and the pending change request together
   */
  test.fixme('TC_E10S01_02 - Verify that viewing an event with a pending change request should still show the currently conf', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as organiser_a@clienta.com
    // 2. Open event "Community Meetup"

    // TODO implement
  });

  /**
   * TC_E10S01_03
   * AC:      Scenario 3 - Refused edit offers the form
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   Event "Community Meetup" has status "Confirmed"
   *
   * Test data:
   *   Field attempted: Expected Attendance
   *
   * Expected result:
   *   Direct editing is refused; organiser_a@clienta.com is offered the change request form, pre-filled with the Expected Attendance field
   */
  test.fixme('TC_E10S01_03 - Verify that attempting to directly edit a restricted field after approval should be refused and', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as organiser_a@clienta.com
    // 2. Open event "Community Meetup"
    // 3. Attempt to directly edit the Expected Attendance field

    // TODO implement
  });

  /**
   * TC_E10S01_04
   * AC:      Scenario 1 - Change request recorded
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   A change request on "Community Meetup" (increase expected attendance to 10) is pending Coordinator approval
   *
   * Test data:
   *   Change: Expected Attendance → 10
   *
   * Expected result:
   *   "Community Meetup"'s Expected Attendance is updated to 10, and organiser_a@clienta.com is notified that the change was applied
   */
  test.fixme('TC_E10S01_04 - Verify that when the Coordinator approves a change request, the event should be updated and the', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Open the pending change request
    // 3. Click "Approve"
    // 4. Log in as organiser_a@clienta.com and check the event and notifications

    // TODO implement
  });

  /**
   * TC_E10S01_05
   * AC:      Scenario 1 - Change request recorded
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   A change request on "Community Meetup" is pending Coordinator approval
   *
   * Test data:
   *   Decision: Declined
   *
   * Expected result:
   *   organiser_a@clienta.com is notified that the change request was declined, and the event remains unchanged
   */
  test.fixme('TC_E10S01_05 - Verify that when the Coordinator declines a change request, the Organiser should be notified', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Open the pending change request
    // 3. Click "Decline"
    // 4. Enter a reason and confirm
    // 5. Log in as organiser_a@clienta.com and check notifications

    // TODO implement
  });

test.describe('E10-S02 - Distinguish minor edits from arrangement-affecting changes', () => {

  /**
   * TC_E10S02_01
   * AC:      Scenario 1 - Attendance beyond capacity flagged
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   A event of "Tech Conference 2026" has a confirmed venue "Riverside Hall" with capacity 200
   *
   * Test data:
   *   Expected Attendance: 200 → 250 (venue capacity: 200)
   *
   * Expected result:
   *   The venue booking for "Riverside Hall" is flagged for review, and venue_staff_1@connectsphere.com is notified
   */
  test.fixme('TC_E10S02_01 - Verify that increasing an event\'s expected attendance beyond its confirmed venue\'s capacity sh', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Increase the event's Expected Attendance to 250
    // 3. Save

    // TODO implement
  });

  /**
   * TC_E10S02_02
   * AC:      Scenario 2 - Description-only edit flags nothing
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   Event "Tech Conference 2026" has a confirmed venue and equipment
   *
   * Test data:
   *   Field changed: Description only
   *
   * Expected result:
   *   No arrangements are flagged as a result of this edit
   */
  test.fixme('TC_E10S02_02 - Verify that editing only the event description on an event with confirmed venue and equipment s', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as organiser_a@clienta.com
    // 2. Edit only the Description field
    // 3. Save
    // 4. Check for any flagged arrangements

    // TODO implement
  });

  /**
   * TC_E10S02_03
   * AC:      Scenario 3 - Affected arrangements shown first
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   A pending edit to "Tech Conference 2026" would affect its confirmed venue booking
   *
   * Test data:
   *   Edit: affects the confirmed venue booking
   *
   * Expected result:
   *   Before the change is applied, a confirmation screen lists the affected arrangement (venue booking) for review
   */
  test.fixme('TC_E10S02_03 - Verify that saving a change that affects confirmed arrangements should show which arrangements ', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Make the edit that affects the venue booking
    // 3. Click "Save"

    // TODO implement
  });

  /**
   * TC_E10S02_04
   * AC:      Scenario 4 - Over-subscription warns only
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   A event of "Tech Conference 2026" has 100 registered; a venue change is about to reduce its capacity to 80
   *
   * Test data:
   *   New capacity: 80; Registered: 100
   *
   * Expected result:
   *   coordinator_1@connectsphere.com is warned and shown the over-subscription (100 vs 80); no Attendee is automatically removed or waitlisted
   */
  test.fixme('TC_E10S02_04 - Verify that a venue change that reduces an event\'s capacity below its registration count shoul', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Change the event's venue to one with capacity 80
    // 3. Save

    // TODO implement
  });

  /**
   * TC_E10S02_05
   * AC:      Scenario 5 - Date change flags venue and equipment
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   A event of "Tech Conference 2026" has a confirmed venue and reserved equipment
   *
   * Test data:
   *   Date: 15/11/2026 → 20/11/2026
   *
   * Expected result:
   *   Both the venue booking and the equipment reservations for this event are flagged as requiring reconfirmation
   */
  test.fixme('TC_E10S02_05 - Verify that changing an event\'s date or time should flag its venue booking and equipment reser', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Change the event's date from 15/11/2026 to 20/11/2026
    // 3. Save

    // TODO implement
  });

  /**
   * TC_E10S02_06
   * AC:      Scenario 5 - Date change flags venue and equipment
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   A event of "Tech Conference 2026" has a confirmed venue, reserved equipment, and tech_support_1@connectsphere.com assigned for on-site support
   *
   * Test data:
   *   Changed field: Date
   *
   * Expected result:
   *   Both venue_staff_1@connectsphere.com and tech_support_1@connectsphere.com receive a notification about the change requiring reconfirmation
   */
  test.fixme('TC_E10S02_06 - Verify that when a date or time change flags arrangements for reconfirmation, the assigned Tech', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Change the event's date
    // 3. Save
    // 4. Check notifications for both venue_staff_1@connectsphere.com and tech_support_1@connectsphere.com

    // TODO implement
  });

test.describe('E10-S04 - Cancel an event or event', () => {

  /**
   * TC_E10S04_01
   * AC:      Scenario 1 - Event cancelled, arrangements released
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   Event "Product Launch Night" has status "Confirmed" with a confirmed venue "Small Room" and reserved equipment
   *
   * Test data:
   *   Cancellation reason: "Insufficient sponsor funding"
   *
   * Expected result:
   *   The status becomes "Cancelled"; "Small Room"'s booking and the reserved equipment are released, the venue calendar is updated, and affected staff are notified
   */
  test.fixme('TC_E10S04_01 - Verify that cancelling an event and recording a reason should release its venue bookings and eq', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Open event "Product Launch Night"
    // 3. Click "Cancel Event"
    // 4. Enter reason "Insufficient sponsor funding"
    // 5. Confirm

    // TODO implement
  });

  /**
   * TC_E10S04_02
   * AC:      Scenario 1 - Event cancelled, arrangements released
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   "Tech Conference 2026" has Event 1 and Event 2, both with confirmed arrangements
   *
   * Test data:
   *   Cancelling: Event 2 only
   *
   * Expected result:
   *   Event 2's arrangements are released; "Tech Conference 2026" itself remains active, and Event 1 is unaffected
   */
  test.fixme('TC_E10S04_02 - Verify that cancelling a single event of a multi-event should release only that sessi', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Open "Tech Conference 2026"
    // 3. Cancel Event 2 only, with a reason
    // 4. Check the event's overall status and Event 1

    // TODO implement
  });

  /**
   * TC_E10S04_03
   * AC:      TODO - confirm which scenario this is evidence for
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   The event of "Tech Conference 2026" being cancelled has attendee_a@example.com registered and attendee_l@example.com waitlisted
   *
   * Test data:
   *   Registered: attendee_a@example.com; Waitlisted: attendee_l@example.com
   *
   * Expected result:
   *   Both attendee_a@example.com and attendee_l@example.com receive a notification of the cancellation
   */
  test.fixme('TC_E10S04_03 - Verify that cancelling an event should notify all of its registered and waitlisted Attendees', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Cancel the event
    // 3. Check notifications for attendee_a@example.com and attendee_l@example.com

    // TODO implement
  });

  /**
   * TC_E10S04_04
   * AC:      Scenario 4 - Cancelled event read-only
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   Event "Product Launch Night" was cancelled on 12/09/2026 with reason "Insufficient sponsor funding" (per TC_E10S04_01)
   *
   * Test data:
   *   Cancellation reason: "Insufficient sponsor funding"; Date: 12/09/2026
   *
   * Expected result:
   *   The event shows "Cancelled on 12 September 2026 — Insufficient sponsor funding"; all fields are read-only
   */
  test.fixme('TC_E10S04_04 - Verify that a cancelled event should be read-only and show its cancellation reason and date to ', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as any user with access (e.g. organiser_a@clienta.com)
    // 2. Open the cancelled event "Product Launch Night"
    // 3. Attempt to edit any field

    // TODO implement
  });

  /**
   * TC_E10S04_05
   * AC:      Scenario 5 - Organiser cancellation becomes a request
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   Event "Community Meetup" has status "Confirmed", assigned to coordinator_1@connectsphere.com
   *
   * Test data:
   *   Reason: "No longer needed"
   *
   * Expected result:
   *   The event is NOT immediately cancelled; instead, a cancellation request is recorded and coordinator_1@connectsphere.com is notified to action it
   */
  test.fixme('TC_E10S04_05 - Verify that an Event Organiser attempting to cancel directly should have the action recorded as', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as organiser_a@clienta.com
    // 2. Open event "Community Meetup"
    // 3. Click "Cancel Event"
    // 4. Enter a reason and submit

    // TODO implement
  });

});
});
});
