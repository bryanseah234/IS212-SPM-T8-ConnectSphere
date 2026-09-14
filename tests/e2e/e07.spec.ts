import { test, expect } from '@playwright/test';

// E07 - 27 cases. Generated from IS212_PROJECT_TEST_CASES.xlsx.
// Each test.fixme() is a specification. Remove .fixme once implemented.

test.describe('E07-S01 - Maintain the equipment catalogue', () => {

  /**
   * TC_E07S01_01
   * AC:      Scenario 3 - Item retired
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   tech_support_1@connectsphere.com is signed in; equipment item "Wireless Microphone" does not yet exist
   *
   * Test data:
   *   Item: Wireless Microphone; Quantity: 10; Location: Main Storage; Status: Working
   *
   * Expected result:
   *   The item is saved and appears as available for reservation, with 10 units free
   */
  test.fixme('TC_E07S01_01 - Verify that saving a new equipment item with its full details should make it available for rese', async ({ page }) => {
    // Steps from the specification:
    // 1. Navigate to "Add Equipment"
    // 2. Enter Type: "Wireless Microphone", Description: "Handheld, UHF", Quantity: 10, Location: "Main Storage", Operational Status: "Working"
    // 3. Click "Save"
    // 4. Log in as an Event Coordinator and check equipment availability for "Wireless Microphone"

    // TODO implement
  });

  /**
   * TC_E07S01_02
   * AC:      Scenario 2 - Quantity drop flags reservations
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   "Wireless Microphone" (quantity 10) has 6 units reserved for an upcoming event of "Tech Conference 2026", assigned to coordinator_1@connectsphere.com
   *
   * Test data:
   *   Quantity: 10 → 4; Existing reservation: 6 units
   *
   * Expected result:
   *   The 6-unit reservation is flagged for review since it now exceeds total stock, and coordinator_1@connectsphere.com is notified
   */
  test.fixme('TC_E07S01_02 - Verify that reducing an item\'s quantity below the amount already reserved for upcoming events', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as tech_support_1@connectsphere.com
    // 2. Open equipment item "Wireless Microphone"
    // 3. Reduce Quantity from 10 to 4
    // 4. Save

    // TODO implement
  });

  /**
   * TC_E07S01_03
   * AC:      Scenario 3 - Item retired
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   Equipment item "Old Projector" has no future reservations; it has 2 past (completed) reservations on record
   *
   * Test data:
   *   Item: Old Projector (no future reservations)
   *
   * Expected result:
   *   "Old Projector" no longer appears in availability checks; its 2 past reservations remain retained and viewable in historical records
   */
  test.fixme('TC_E07S01_03 - Verify that retiring an item with no future reservations should remove it from availability che', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as tech_support_1@connectsphere.com
    // 2. Open equipment item "Old Projector"
    // 3. Click "Retire Item"
    // 4. Confirm
    // 5. Check availability for "Old Projector" as an Event Coordinator

    // TODO implement
  });

  /**
   * TC_E07S01_04
   * AC:      Scenario 3 - Item retired
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   Equipment item "Wireless Microphone" exists with Location: "Main Storage"
   *
   * Test data:
   *   Location: Main Storage → Annex Storage
   *
   * Expected result:
   *   The updated Location value is saved and shown when the item record is reopened
   */
  test.fixme('TC_E07S01_04 - Verify that updating an existing equipment item\'s attributes should save the changes', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as tech_support_1@connectsphere.com
    // 2. Open equipment item "Wireless Microphone"
    // 3. Update Location to "Annex Storage"
    // 4. Click "Save"

    // TODO implement
  });

test.describe('E07-S02 - Request equipment for an event', () => {

  /**
   * TC_E07S02_01
   * AC:      Scenario 1 - Equipment recorded against an event
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   Event "Tech Conference 2026" is Approved; Event 1 has no equipment requested yet
   *
   * Test data:
   *   Event 1 equipment: Wireless Microphone x2, Projector x1
   *
   * Expected result:
   *   The equipment request is saved against Event 1, and tech_support_1@connectsphere.com is notified
   */
  test.fixme('TC_E07S02_01 - Verify that adding equipment items with quantities to an event of an approved event should sav', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Open Event 1 of "Tech Conference 2026"
    // 3. Add "Wireless Microphone" x 2 and "Projector" x 1
    // 4. Save
    // 5. Check tech_support_1@connectsphere.com's notifications

    // TODO implement
  });

  /**
   * TC_E07S02_02
   * AC:      Scenario 2 - Request exceeds total stock
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   "Wireless Microphone" has a total stock of 10 units
   *
   * Test data:
   *   Requested quantity: 15; Total stock: 10
   *
   * Expected result:
   *   A warning is shown that the request (15 units) cannot be met from existing stock (10 units)
   */
  test.fixme('TC_E07S02_02 - Verify that requesting more of an item than ConnectSphere owns in total should warn that the re', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Open an event of "Tech Conference 2026"
    // 3. Request "Wireless Microphone" x 15
    // 4. Save

    // TODO implement
  });

  /**
   * TC_E07S02_03
   * AC:      Scenario 1 - Equipment recorded against an event
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   "Tech Conference 2026" has Event 1 and Event 2, neither with equipment requested yet
   *
   * Test data:
   *   Event 1: Projector x1 added; Event 2: unchanged
   *
   * Expected result:
   *   Event 1 shows "Projector x1"; Event 2's equipment list remains empty, unaffected by Event 1's request
   */
  test.fixme('TC_E07S02_03 - Verify that recording equipment for one event of a multi-event should leave the other', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Open Event 1 and add "Projector" x 1
    // 3. Save
    // 4. Open Event 2 and check its equipment list

    // TODO implement
  });

  /**
   * TC_E07S02_04
   * AC:      TODO - confirm which scenario this is evidence for
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   Event 1 of "Tech Conference 2026" has an unreserved equipment request: "Wireless Microphone" x 2
   *
   * Test data:
   *   Quantity change: 2 → 3, then removed entirely
   *
   * Expected result:
   *   After step 3, the request shows "Wireless Microphone x3"; after step 5, the request no longer includes "Wireless Microphone"
   */
  test.fixme('TC_E07S02_04 - Verify that amending or removing an equipment request before it is reserved should update or cl', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Open Event 1's equipment request
    // 3. Change the quantity to 3 and save
    // 4. Reopen the request and remove the "Wireless Microphone" line entirely
    // 5. Save

    // TODO implement
  });

test.describe('E07-S03 - Check equipment availability', () => {

  /**
   * TC_E07S03_01
   * AC:      TODO - confirm which scenario this is evidence for
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   "Wireless Microphone" has total stock 10; 3 units are reserved for another event on 15/11/2026, 09:00–12:00; 2 units are marked damaged
   *
   * Test data:
   *   Total stock: 10; Reserved: 3; Damaged: 2
   *
   * Expected result:
   *   The free quantity shown is 5 (10 − 3 reserved − 2 damaged)
   */
  test.fixme('TC_E07S03_01 - Verify that checking availability for a period with other reservations should exclude those res', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as tech_support_1@connectsphere.com
    // 2. Check availability for "Wireless Microphone" on 15/11/2026, 09:00–12:00

    // TODO implement
  });

  /**
   * TC_E07S03_02
   * AC:      TODO - confirm which scenario this is evidence for
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   "Projector" is free for 15/11/2026, 09:00–12:00, but is currently located at "Grand Ballroom" rather than the requested venue
   *
   * Test data:
   *   Item location: Grand Ballroom; Requested venue: Riverside Hall
   *
   * Expected result:
   *   "Projector" is shown as available with its full free quantity; no transport time or allowance is added to the availability check
   */
  test.fixme('TC_E07S03_02 - Verify that an item free for the requested date and time but located at another venue should st', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as tech_support_1@connectsphere.com
    // 2. Check availability for "Projector" on 15/11/2026, 09:00–12:00 for an event at "Riverside Hall"

    // TODO implement
  });

  /**
   * TC_E07S03_03
   * AC:      Scenario 3 - Non-overlapping events share an item
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   "Tech Conference 2026" Event 1 (09:00–12:00) and Event 2 (14:00–17:00) both require "Wireless Microphone", with no other reservations that day
   *
   * Test data:
   *   Event 1: 09:00–12:00; Event 2: 14:00–17:00 (same day, non-overlapping)
   *
   * Expected result:
   *   "Wireless Microphone" shows its full free quantity for both Event 1's and Event 2's time windows
   */
  test.fixme('TC_E07S03_03 - Verify that two events requiring the same item at non-overlapping times on the same day shoul', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as tech_support_1@connectsphere.com
    // 2. Check availability for "Wireless Microphone" during Event 1's time (09:00–12:00)
    // 3. Check availability for "Wireless Microphone" during Event 2's time (14:00–17:00)

    // TODO implement
  });

test.describe('E07-S04 - Reserve equipment for an event', () => {

  /**
   * TC_E07S04_01
   * AC:      Scenario 1 - Full reservation recorded
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   Event 1 of "Tech Conference 2026" requested "Wireless Microphone" x 2; 5 units are free for that period
   *
   * Test data:
   *   Reserved: Wireless Microphone x2 (5 free)
   *
   * Expected result:
   *   The reservation is recorded against Event 1, and coordinator_1@connectsphere.com receives a confirmation showing the event's date/time, item, and quantity
   */
  test.fixme('TC_E07S04_01 - Verify that reserving the requested quantity when sufficient equipment is free should record th', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as tech_support_1@connectsphere.com
    // 2. Open the equipment request for Event 1
    // 3. Reserve "Wireless Microphone" x 2
    // 4. Confirm
    // 5. Check coordinator_1@connectsphere.com's notifications

    // TODO implement
  });

  /**
   * TC_E07S04_02
   * AC:      Scenario 2 - Partial reservation and shortfall
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   Event 2 of "Tech Conference 2026" requested "Projector" x 3; only 2 units are free for that period
   *
   * Test data:
   *   Requested: 3; Reserved (partial): 2; Shortfall: 1
   *
   * Expected result:
   *   coordinator_1@connectsphere.com is notified of the shortfall, showing 2 reserved and 1 outstanding unit of "Projector"
   */
  test.fixme('TC_E07S04_02 - Verify that recording a partial reservation when only part of the requested quantity is free sh', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as tech_support_1@connectsphere.com
    // 2. Open the equipment request for Event 2
    // 3. Record a partial reservation of "Projector" x 2
    // 4. Confirm

    // TODO implement
  });

  /**
   * TC_E07S04_03
   * AC:      Scenario 3 - Fully committed item shows nothing free
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   "Portable Stage" (total stock 2) has both units fully reserved for the period 20/11/2026, 09:00–17:00
   *
   * Test data:
   *   Portable Stage: 2 total, 2 reserved
   *
   * Expected result:
   *   The availability check shows 0 free units of "Portable Stage" for that period
   */
  test.fixme('TC_E07S04_03 - Verify that once an item becomes fully committed, a subsequent availability check for that peri', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as tech_support_1@connectsphere.com
    // 2. Check availability for "Portable Stage" on 20/11/2026, 09:00–17:00

    // TODO implement
  });

  /**
   * TC_E07S04_04
   * AC:      Scenario 4 - Reservation released
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   Event 1 of "Tech Conference 2026" has a reservation of "Wireless Microphone" x 2
   *
   * Test data:
   *   Released reservation: Wireless Microphone x2
   *
   * Expected result:
   *   The 2 units are returned to the available pool, increasing the free quantity for that period by 2
   */
  test.fixme('TC_E07S04_04 - Verify that releasing a reservation when an event is cancelled or the equipment is no longer r', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as tech_support_1@connectsphere.com
    // 2. Open the reservation for Event 1
    // 3. Click "Release Reservation"
    // 4. Confirm
    // 5. Check availability for "Wireless Microphone" for that period

    // TODO implement
  });

test.describe('E07-S05 - Mark equipment as unavailable', () => {

  /**
   * TC_E07S05_01
   * AC:      Scenario 1 - Item marked unavailable
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   Equipment item "HD Camera" has no reservations between 01/12/2026 and 05/12/2026
   *
   * Test data:
   *   Period: 01/12/2026–05/12/2026; Reason: Sensor repair
   *
   * Expected result:
   *   "HD Camera" shows 0 available units for any date within 01/12/2026–05/12/2026
   */
  test.fixme('TC_E07S05_01 - Verify that marking an item with no reservations in the period unavailable, with a reason and a', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as tech_support_1@connectsphere.com
    // 2. Open equipment item "HD Camera"
    // 3. Click "Mark Unavailable"
    // 4. Enter period 01/12/2026–05/12/2026 and reason "Sensor repair"
    // 5. Save
    // 6. Check availability for "HD Camera" on 03/12/2026

    // TODO implement
  });

  /**
   * TC_E07S05_02
   * AC:      Scenario 1 - Item marked unavailable
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   "HD Camera" is reserved for an upcoming event of "Tech Conference 2026", assigned to coordinator_1@connectsphere.com
   *
   * Test data:
   *   Affected event: Tech Conference 2026 event with HD Camera reserved
   *
   * Expected result:
   *   The affected event is flagged, and coordinator_1@connectsphere.com is notified that its reserved "HD Camera" is now unavailable
   */
  test.fixme('TC_E07S05_02 - Verify that marking an item unavailable while it is reserved for an upcoming event should fla', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as tech_support_1@connectsphere.com
    // 2. Open equipment item "HD Camera"
    // 3. Mark it unavailable for a period covering the reserved event, with reason "Sensor repair"
    // 4. Save

    // TODO implement
  });

  /**
   * TC_E07S05_03
   * AC:      TODO - confirm which scenario this is evidence for
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   "HD Camera" is currently marked unavailable for 01/12/2026–05/12/2026 with reason "Sensor repair"
   *
   * Test data:
   *   Item: HD Camera (returning to service)
   *
   * Expected result:
   *   "HD Camera" now shows as available again for 03/12/2026
   */
  test.fixme('TC_E07S05_03 - Verify that returning an item to service should restore it to availability checks', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as tech_support_1@connectsphere.com
    // 2. Open equipment item "HD Camera"
    // 3. Click "Return to Service"
    // 4. Confirm
    // 5. Check availability for "HD Camera" on 03/12/2026

    // TODO implement
  });

test.describe('E07-S06 - Request technical support for an event', () => {

  /**
   * TC_E07S06_01
   * AC:      Scenario 1 - Support request recorded
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   Event 1 of "Tech Conference 2026" requires on-site technical support
   *
   * Test data:
   *   Support description: "1 AV technician for the full event"; Times: 09:00–12:00
   *
   * Expected result:
   *   The request is recorded against Event 1, and tech_support_1@connectsphere.com is notified
   */
  test.fixme('TC_E07S06_01 - Verify that submitting a technical support request describing the support needed and the times ', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Open Event 1 of "Tech Conference 2026"
    // 3. Click "Request Technical Support"
    // 4. Describe the support needed: "1 AV technician for the full event" and times "09:00–12:00"
    // 5. Submit
    // 6. Check tech_support_1@connectsphere.com's notifications

    // TODO implement
  });

  /**
   * TC_E07S06_02
   * AC:      Scenario 1 - Support request recorded
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   Event 2 of "Tech Conference 2026" does not yet have a confirmed venue
   *
   * Test data:
   *   Event 2: no confirmed venue yet
   *
   * Expected result:
   *   The technical support request is accepted and recorded, without waiting for the venue to be confirmed first
   */
  test.fixme('TC_E07S06_02 - Verify that submitting a technical support request before the venue is confirmed should be acce', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Open Event 2 of "Tech Conference 2026" (no confirmed venue)
    // 3. Submit a technical support request describing "1 sound technician" for the event's planned times

    // TODO implement
  });

  /**
   * TC_E07S06_03
   * AC:      Scenario 1 - Support request recorded
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   A event of "Charity Run" needs no on-site technical support
   *
   * Test data:
   *   Event: Charity Run's event; Technical Support: Not Required
   *
   * Expected result:
   *   No technical support request is created for the event, and later event confirmation is not blocked waiting for a staff assignment
   */
  test.fixme('TC_E07S06_03 - Verify that marking an event as needing no technical support should create no request and not ', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Open the event of "Charity Run"
    // 3. Select "No Technical Support Required"
    // 4. Save

    // TODO implement
  });

test.describe('E07-S07 - Assign and manage technical staff for an event', () => {

  /**
   * TC_E07S07_01
   * AC:      Scenario 1 - Available colleague assigned
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   Event 1 of "Tech Conference 2026" (09:00–12:00) has an open technical support request
   *   tech_support_2@connectsphere.com has no assignment overlapping 09:00–12:00 on that date
   *
   * Test data:
   *   Assignee: tech_support_2@connectsphere.com; Event time: 09:00–12:00
   *
   * Expected result:
   *   The assignment succeeds; tech_support_2@connectsphere.com is notified and the assignment appears on their schedule
   */
  test.fixme('TC_E07S07_01 - Verify that a colleague with no conflicting assignment during the event\'s required time perio', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as tech_support_1@connectsphere.com
    // 2. Open the technical support request for Event 1
    // 3. Assign tech_support_2@connectsphere.com
    // 4. Confirm

    // TODO implement
  });

  /**
   * TC_E07S07_02
   * AC:      Scenario 3 - Assignment removed
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   tech_support_2@connectsphere.com has just been assigned to Event 1 of "Tech Conference 2026" (09:00–12:00)
   *
   * Test data:
   *   Assignment: Event 1, Tech Conference 2026, 09:00–12:00
   *
   * Expected result:
   *   The schedule shows the assignment to Event 1 of "Tech Conference 2026" at 09:00–12:00
   */
  test.fixme('TC_E07S07_02 - Verify that the assignment should be reflected on the assigned staff member\'s schedule once mad', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as tech_support_2@connectsphere.com
    // 2. Open "My Schedule"

    // TODO implement
  });

  /**
   * TC_E07S07_03
   * AC:      Scenario 2 - Overlapping assignment blocked
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   tech_support_2@connectsphere.com is already assigned to an event of "Charity Run" from 10:00–13:00 on the same date
   *   Event 1 of "Tech Conference 2026" runs 09:00–12:00 on that date and needs a technician assigned
   *
   * Test data:
   *   Existing assignment: Charity Run event, 10:00–13:00; New attempted assignment: Tech Conference 2026 Event 1, 09:00–12:00 (overlaps)
   *
   * Expected result:
   *   The assignment is blocked, and the message identifies the conflicting "Charity Run" event as the reason
   */
  test.fixme('TC_E07S07_03 - Verify that assigning a colleague who has an overlapping assignment should be blocked, with the', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as tech_support_1@connectsphere.com
    // 2. Open the technical support request for Event 1 of "Tech Conference 2026"
    // 3. Attempt to assign tech_support_2@connectsphere.com

    // TODO implement
  });

  /**
   * TC_E07S07_04
   * AC:      Scenario 3 - Assignment removed
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   tech_support_2@connectsphere.com is assigned to Event 1 of "Tech Conference 2026"
   *
   * Test data:
   *   Assignment removed: tech_support_2@connectsphere.com, Event 1
   *
   * Expected result:
   *   The assignment no longer appears on tech_support_2@connectsphere.com's schedule, and the slot is free for reassignment
   */
  test.fixme('TC_E07S07_04 - Verify that removing an existing assignment from a staff member\'s schedule should free up that ', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as tech_support_1@connectsphere.com
    // 2. Open the assignment for Event 1
    // 3. Click "Remove Assignment"
    // 4. Confirm
    // 5. Check tech_support_2@connectsphere.com's schedule

    // TODO implement
  });

  /**
   * TC_E07S07_05
   * AC:      Scenario 2 - Overlapping assignment blocked
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   The assignment for Event 1 of "Tech Conference 2026" has just been removed from tech_support_2@connectsphere.com
   *   tech_support_3@connectsphere.com already has a conflicting assignment during Event 1's time
   *
   * Test data:
   *   Replacement candidate: tech_support_3@connectsphere.com (has a conflicting assignment)
   *
   * Expected result:
   *   The replacement assignment is blocked using the same conflict check as a new assignment, with the conflicting event identified
   */
  test.fixme('TC_E07S07_05 - Verify that assigning a replacement colleague after removing an assignment should be subject to', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as tech_support_1@connectsphere.com
    // 2. Open the now-unassigned technical support request for Event 1
    // 3. Attempt to assign tech_support_3@connectsphere.com as a replacement

    // TODO implement
  });

  /**
   * TC_E07S07_06
   * AC:      Scenario 3 - Assignment removed
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   tech_support_2@connectsphere.com is about to be assigned to, and later removed from, Event 1 of "Tech Conference 2026"
   *
   * Test data:
   *   Actions: assign, then remove
   *
   * Expected result:
   *   tech_support_2@connectsphere.com receives a notification for the assignment, and a separate notification for the removal
   */
  test.fixme('TC_E07S07_06 - Verify that the assigned staff member should receive a notification when they are assigned to, ', async ({ page }) => {
    // Steps from the specification:
    // 1. As tech_support_1@connectsphere.com, assign tech_support_2@connectsphere.com to Event 1
    // 2. Check tech_support_2@connectsphere.com's notifications
    // 3. As tech_support_1@connectsphere.com, remove the assignment
    // 4. Check tech_support_2@connectsphere.com's notifications again

    // TODO implement
  });

});
});
});
});
});
});
});
