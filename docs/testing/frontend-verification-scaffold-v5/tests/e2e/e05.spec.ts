import { test, expect } from '@playwright/test';

// E05 - 20 cases. Generated from IS212_PROJECT_TEST_CASES.xlsx.
// Each test.fixme() is a specification. Remove .fixme once implemented.

test.describe('E05-S01 - Maintain the venue catalogue', () => {

  /**
   * TC_E05S01_01
   * AC:      Scenario 1 - Venue added and searchable
   * Sprint:  2.0
   *
   * Pre-conditions:
   *   venue_staff_1@connectsphere.com is signed in; venue "Grand Ballroom" does not yet exist
   *
   * Test data:
   *   Venue: Grand Ballroom; Capacity: 300; Location: 123 Marina Blvd
   *
   * Expected result:
   *   The venue is saved and appears in the Event Coordinator's search results
   */
  test.fixme('TC_E05S01_01 - Verify that saving a new venue with its full details should make it searchable by Event Coordin', async ({ page }) => {
    // Steps from the specification:
    // 1. Navigate to "Add Venue"
    // 2. Enter Location: "123 Marina Blvd", Capacity: 300, Facilities: "Stage, AV system", Accessibility Features: "Wheelchair Access", Supported Layouts: "Theatre, Banquet", Operating Hours: "08:00–22:00"
    // 3. Click "Save"
    // 4. Log in as an Event Coordinator and search for "Grand Ballroom"

    // TODO implement
  });

  /**
   * TC_E05S01_02
   * AC:      Scenario 3 - Venue retired
   * Sprint:  2.0
   *
   * Pre-conditions:
   *   Venue "Grand Ballroom" (capacity 300) has a confirmed booking for event "Annual Tech Summit" with expected attendance 250, assigned to coordinator_1@connectsphere.com
   *
   * Test data:
   *   Capacity: 300 → 200; Affected booking's expected attendance: 250
   *
   * Expected result:
   *   The confirmed booking for "Annual Tech Summit" is flagged for review, and coordinator_1@connectsphere.com is notified
   */
  test.fixme('TC_E05S01_02 - Verify that reducing a venue\'s capacity below a confirmed booking\'s expected attendance should ', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as venue_staff_1@connectsphere.com
    // 2. Open venue "Grand Ballroom"
    // 3. Reduce Capacity from 300 to 200
    // 4. Save

    // TODO implement
  });

  /**
   * TC_E05S01_03
   * AC:      Scenario 3 - Venue retired
   * Sprint:  2.0
   *
   * Pre-conditions:
   *   Venue "Old Hall" has no future bookings; it has 2 past (completed) bookings on record
   *
   * Test data:
   *   Venue: Old Hall (no future bookings)
   *
   * Expected result:
   *   "Old Hall" no longer appears in search results; its 2 past bookings remain retained and viewable in historical records
   */
  test.fixme('TC_E05S01_03 - Verify that retiring a venue with no future bookings should remove it from search results while', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as venue_staff_1@connectsphere.com
    // 2. Open venue "Old Hall"
    // 3. Click "Retire Venue"
    // 4. Confirm
    // 5. Search for "Old Hall" as an Event Coordinator

    // TODO implement
  });

  /**
   * TC_E05S01_04
   * AC:      Scenario 4 - Retirement blocked by future bookings
   * Sprint:  2.0
   *
   * Pre-conditions:
   *   Venue "Grand Ballroom" has a future confirmed booking for event "Product Expo 2026" on 20/12/2026
   *
   * Test data:
   *   Venue: Grand Ballroom; Blocking booking: Product Expo 2026, 20/12/2026
   *
   * Expected result:
   *   Retirement is blocked with a message identifying the "Product Expo 2026" booking on 20/12/2026 as the reason
   */
  test.fixme('TC_E05S01_04 - Verify that attempting to retire a venue with future bookings should be blocked with those book', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as venue_staff_1@connectsphere.com
    // 2. Open venue "Grand Ballroom"
    // 3. Click "Retire Venue"

    // TODO implement
  });

  /**
   * TC_E05S01_05
   * AC:      Scenario 3 - Venue retired
   * Sprint:  2.0
   *
   * Pre-conditions:
   *   Venue "Grand Ballroom" exists with Facilities: "Stage, AV system"
   *
   * Test data:
   *   Facilities: "Stage, AV system" → "Stage, AV system, Dance floor"
   *
   * Expected result:
   *   The updated Facilities value is saved and shown when the venue record is reopened
   */
  test.fixme('TC_E05S01_05 - Verify that updating an existing venue\'s attributes should save the changes', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as venue_staff_1@connectsphere.com
    // 2. Open venue "Grand Ballroom"
    // 3. Update Facilities to "Stage, AV system, Dance floor"
    // 4. Click "Save"

    // TODO implement
  });

test.describe('E05-S02 - Match layout requirements to venue capacity', () => {

  /**
   * TC_E05S02_01
   * AC:      Scenario 1 - Layout and capacity stored
   * Sprint:  2.0
   *
   * Pre-conditions:
   *   venue_staff_1@connectsphere.com is editing venue "Grand Ballroom"
   *
   * Test data:
   *   Layout: Theatre; Maximum Capacity: 280
   *
   * Expected result:
   *   The Theatre layout with maximum capacity 280 is stored against "Grand Ballroom" and shown in its layout list
   */
  test.fixme('TC_E05S02_01 - Verify that adding a supported layout with its maximum capacity should store it against the ven', async ({ page }) => {
    // Steps from the specification:
    // 1. Open venue "Grand Ballroom"
    // 2. Click "Add Layout"
    // 3. Enter Layout: "Theatre", Maximum Capacity: 280
    // 4. Click "Save"

    // TODO implement
  });

  /**
   * TC_E05S02_02
   * AC:      Scenario 1 - Layout and capacity stored
   * Sprint:  2.0
   *
   * Pre-conditions:
   *   "Grand Ballroom" has a Theatre layout with maximum capacity 280
   *   A event requires a Theatre layout for 300 attendees
   *
   * Test data:
   *   Required attendance: 300; Grand Ballroom Theatre capacity: 280
   *
   * Expected result:
   *   "Grand Ballroom" is excluded from the results or clearly marked unsuitable, since its Theatre capacity (280) is below the required attendance (300)
   */
  test.fixme('TC_E05S02_02 - Verify that a venue whose layout capacity is below an event\'s required attendance should be ex', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as an Event Coordinator
    // 2. Search for venues with Layout: Theatre, Expected Attendance: 300

    // TODO implement
  });

  /**
   * TC_E05S02_03
   * AC:      Scenario 3 - Duplicate layout warned
   * Sprint:  2.0
   *
   * Pre-conditions:
   *   "Grand Ballroom" already has a Theatre layout on file
   *
   * Test data:
   *   Layout: Theatre (already exists)
   *
   * Expected result:
   *   A warning is shown stating the layout already exists, and no duplicate Theatre entry is created
   */
  test.fixme('TC_E05S02_03 - Verify that attempting to add a layout that already exists on the venue should be warned withou', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as venue_staff_1@connectsphere.com
    // 2. Open venue "Grand Ballroom"
    // 3. Click "Add Layout"
    // 4. Enter Layout: "Theatre" again
    // 5. Click "Save"

    // TODO implement
  });

  /**
   * TC_E05S02_04
   * AC:      TODO - confirm which scenario this is evidence for
   * Sprint:  2.0
   *
   * Pre-conditions:
   *   "Grand Ballroom" has layouts Theatre (280) and Banquet (200) on file
   *
   * Test data:
   *   Layouts: Theatre (280), Banquet (200)
   *
   * Expected result:
   *   Both layouts are listed with their correct maximum capacities: Theatre 280, Banquet 200
   */
  test.fixme('TC_E05S02_04 - Verify that venue Staff should be able to view all layouts supported by a venue and their maxim', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as venue_staff_1@connectsphere.com
    // 2. Open venue "Grand Ballroom"
    // 3. View the layouts list

    // TODO implement
  });

  /**
   * TC_E05S02_05
   * AC:      Scenario 1 - Layout and capacity stored
   * Sprint:  2.0
   *
   * Pre-conditions:
   *   "Grand Ballroom" has a Theatre layout with maximum capacity 280
   *
   * Test data:
   *   Theatre capacity: 280 → 260
   *
   * Expected result:
   *   The Theatre layout now shows maximum capacity 260 when the venue record is reopened
   */
  test.fixme('TC_E05S02_05 - Verify that editing the maximum capacity of an existing layout should save the updated value', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as venue_staff_1@connectsphere.com
    // 2. Open venue "Grand Ballroom"
    // 3. Select the Theatre layout and change its Maximum Capacity to 260
    // 4. Click "Save"

    // TODO implement
  });

  /**
   * TC_E05S02_06
   * AC:      TODO - confirm which scenario this is evidence for
   * Sprint:  2.0
   *
   * Pre-conditions:
   *   "Grand Ballroom" has a Banquet layout on file that is no longer offered
   *
   * Test data:
   *   Layout to remove: Banquet
   *
   * Expected result:
   *   The Banquet layout no longer appears in "Grand Ballroom"'s layout list
   */
  test.fixme('TC_E05S02_06 - Verify that removing a layout no longer offered at the venue should delete it from the venue\'s ', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as venue_staff_1@connectsphere.com
    // 2. Open venue "Grand Ballroom"
    // 3. Select the Banquet layout and click "Remove"
    // 4. Confirm

    // TODO implement
  });

test.describe('E05-S03 - View the venue availability calendar', () => {

  /**
   * TC_E05S03_01
   * AC:      Scenario 1 - Four states distinguishable
   * Sprint:  2.0
   *
   * Pre-conditions:
   *   Venue "Grand Ballroom" has: 10/11/2026 Free, 11/11/2026 Pending, 12/11/2026 Confirmed, 13/11/2026 Blocked
   *
   * Test data:
   *   10/11: Free; 11/11: Pending; 12/11: Confirmed; 13/11: Blocked
   *
   * Expected result:
   *   All four states are shown correctly for their respective dates, each with a visually distinct color/icon so they can be told apart at a glance
   */
  test.fixme('TC_E05S03_01 - Verify that opening a venue\'s calendar for a period with bookings and blocks should show each e', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as an Event Coordinator
    // 2. Open venue "Grand Ballroom"'s calendar
    // 3. Navigate to the period 10/11/2026–13/11/2026

    // TODO implement
  });

  /**
   * TC_E05S03_02
   * AC:      Scenario 2 - Other events' details withheld
   * Sprint:  2.0
   *
   * Pre-conditions:
   *   Venue "Grand Ballroom" is Confirmed on 12/11/2026 for event "Spring Networking Night", assigned to a different Coordinator; coordinator_1@connectsphere.com is not assigned to this event and has no permission to view its details
   *
   * Test data:
   *   Date: 12/11/2026; Event on that date: Spring Networking Night (not assigned to coordinator_1@connectsphere.com)
   *
   * Expected result:
   *   12/11/2026 is shown simply as "Unavailable", without revealing the event name "Spring Networking Night" or any of its details
   */
  test.fixme('TC_E05S03_02 - Verify that a period the Coordinator is not permitted to view should show as unavailable withou', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Open venue "Grand Ballroom"'s calendar for 12/11/2026

    // TODO implement
  });

  /**
   * TC_E05S03_03
   * AC:      Scenario 3 - Block distinct from booking
   * Sprint:  2.0
   *
   * Pre-conditions:
   *   Venue "Grand Ballroom" is Blocked for maintenance on 13/11/2026 and Confirmed for an event on 12/11/2026
   *
   * Test data:
   *   12/11: Confirmed (booking); 13/11: Blocked (maintenance)
   *
   * Expected result:
   *   12/11 and 13/11 are shown with clearly different visual treatments, so a maintenance block is never mistaken for a booking
   */
  test.fixme('TC_E05S03_03 - Verify that a venue blocked for maintenance should be visually distinct from a booked period on', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as an Event Coordinator
    // 2. Open venue "Grand Ballroom"'s calendar for 12/11/2026–13/11/2026

    // TODO implement
  });

  /**
   * TC_E05S03_04
   * AC:      TODO - confirm which scenario this is evidence for
   * Sprint:  2.0
   *
   * Pre-conditions:
   *   Venue "Grand Ballroom"'s calendar is open, currently showing November 2026
   *
   * Test data:
   *   Navigate to: December 2026; Custom range: 05/12/2026–10/12/2026
   *
   * Expected result:
   *   The calendar updates to show December 2026, and then correctly displays only the selected 05/12/2026–10/12/2026 range
   */
  test.fixme('TC_E05S03_04 - Verify that an Event Coordinator should be able to select a date or date range and navigate to ', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as an Event Coordinator and open venue "Grand Ballroom"'s calendar
    // 2. Click "Next Month" to navigate to December 2026
    // 3. Select a custom date range 05/12/2026–10/12/2026

    // TODO implement
  });

  /**
   * TC_E05S03_05
   * AC:      TODO - confirm which scenario this is evidence for
   * Sprint:  2.0
   *
   * Pre-conditions:
   *   Venue "Grand Ballroom" is Confirmed on 12/11/2026 for event "Annual Tech Summit", Event 1, 09:00–12:00, which coordinator_1@connectsphere.com is permitted to view (assigned Coordinator)
   *
   * Test data:
   *   Event: Annual Tech Summit; Event: Event 1; Time: 09:00–12:00
   *
   * Expected result:
   *   The entry shows Event = Annual Tech Summit, Event = Event 1, Date = 12/11/2026, Time = 09:00–12:00
   */
  test.fixme('TC_E05S03_05 - Verify that for periods the Coordinator is permitted to view, the calendar should show the even', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Open venue "Grand Ballroom"'s calendar for 12/11/2026
    // 3. Click on the 12/11/2026 entry

    // TODO implement
  });

test.describe('E05-S04 - Block a venue for maintenance', () => {

  /**
   * TC_E05S04_01
   * AC:      TODO - confirm which scenario this is evidence for
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   Venue "Riverside Hall" has no bookings between 05/01/2027 and 10/01/2027
   *
   * Test data:
   *   Block period: 05/01/2027–10/01/2027; Reason: Annual fire safety inspection
   *
   * Expected result:
   *   "Riverside Hall" no longer appears as available for any date within 05/01/2027–10/01/2027
   */
  test.fixme('TC_E05S04_01 - Verify that blocking a venue for a period with no bookings should make it unavailable for those', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as venue_staff_1@connectsphere.com
    // 2. Open venue "Riverside Hall"
    // 3. Click "Block Venue"
    // 4. Enter period 05/01/2027–10/01/2027 and reason "Annual fire safety inspection"
    // 5. Save
    // 6. Search for venues available on 07/01/2027 as an Event Coordinator

    // TODO implement
  });

  /**
   * TC_E05S04_02
   * AC:      Scenario 2 - Block over a confirmed booking warned
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   Venue "Riverside Hall" has a confirmed booking for event "Charity Run" on 15/01/2027
   *
   * Test data:
   *   Block period: 14/01/2027–16/01/2027 (overlaps Charity Run's booking on 15/01/2027)
   *
   * Expected result:
   *   A warning is shown identifying the conflicting "Charity Run" booking; the block is not saved until the conflict is resolved
   */
  test.fixme('TC_E05S04_02 - Verify that attempting to block a venue over a period with a confirmed booking should warn of t', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as venue_staff_1@connectsphere.com
    // 2. Open venue "Riverside Hall"
    // 3. Click "Block Venue"
    // 4. Enter period 14/01/2027–16/01/2027 and reason "Flooring replacement"
    // 5. Attempt to save

    // TODO implement
  });

  /**
   * TC_E05S04_03
   * AC:      Scenario 3 - Affected Coordinators notified
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   Venue "Riverside Hall" has no bookings between 20/01/2027 and 25/01/2027, but an upcoming event for event "Tech Conference 2026" is tentatively planned to search venues around that period, assigned to coordinator_1@connectsphere.com
   *
   * Test data:
   *   Block period: 20/01/2027–25/01/2027; Reason: Renovation
   *
   * Expected result:
   *   coordinator_1@connectsphere.com receives a notification that the new block affects their upcoming event's planning window
   */
  test.fixme('TC_E05S04_03 - Verify that creating a block over an upcoming event\'s dates should notify the affected Coordi', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as venue_staff_1@connectsphere.com
    // 2. Open venue "Riverside Hall"
    // 3. Block the period 20/01/2027–25/01/2027 with reason "Renovation"
    // 4. Save
    // 5. Check coordinator_1@connectsphere.com's notifications

    // TODO implement
  });

  /**
   * TC_E05S04_04
   * AC:      Scenario 1 - Free period blocked
   * Sprint:  3.0
   *
   * Pre-conditions:
   *   Venue "Riverside Hall" has an active block from 05/01/2027 to 10/01/2027 with reason "Annual fire safety inspection"
   *
   * Test data:
   *   Block shortened: 05/01/2027–10/01/2027 → 05/01/2027–07/01/2027
   *
   * Expected result:
   *   "Riverside Hall" now appears as available from 08/01/2027 onward, while remaining blocked for 05/01/2027–07/01/2027
   */
  test.fixme('TC_E05S04_04 - Verify that removing or shortening an existing block should restore the venue\'s availability fo', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as venue_staff_1@connectsphere.com
    // 2. Open venue "Riverside Hall"
    // 3. Select the existing block
    // 4. Shorten it to end on 07/01/2027 instead of 10/01/2027
    // 5. Save
    // 6. Search for venues available on 08/01/2027

    // TODO implement
  });

});
});
});
});
