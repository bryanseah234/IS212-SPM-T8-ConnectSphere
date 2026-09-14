import { test, expect } from '@playwright/test';

// E09 - 32 cases. Generated from IS212_PROJECT_TEST_CASES.xlsx.
// Each test.fixme() is a specification. Remove .fixme once implemented.

test.describe('E09-S01 - Register for an event', () => {

  /**
   * TC_E09S01_01
   * AC:      Scenario 1 - Place reserved in an open event
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   Event "Community Meetup" is Confirmed, registration is open, and 3 of 5 places remain in its event
   *
   * Test data:
   *   Name: Casey Tan; Email: attendee_c@example.com
   *
   * Expected result:
   *   attendee_c@example.com's place is reserved, and they receive a confirmation containing the event's details (date, time, venue)
   */
  test.fixme('TC_E09S01_01 - Verify that submitting the required registration information for an open event with places re', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as attendee_c@example.com
    // 2. Open event "Community Meetup"
    // 3. Enter Name: "Casey Tan", Email: attendee_c@example.com
    // 4. Submit registration

    // TODO implement
  });

  /**
   * TC_E09S01_02
   * AC:      Scenario 1 - Place reserved in an open event
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   Event "Tech Conference 2026" has Event 1 and Event 2, both open for registration
   *
   * Test data:
   *   Selected: Event 1 only
   *
   * Expected result:
   *   A place is reserved for attendee_d@example.com in Event 1 only; they are not registered for Event 2
   */
  test.fixme('TC_E09S01_02 - Verify that registering for a multi-event should let the Attendee choose which events', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as attendee_d@example.com
    // 2. Open event "Tech Conference 2026"
    // 3. Select Event 1 only (not Event 2)
    // 4. Submit registration

    // TODO implement
  });

  /**
   * TC_E09S01_03
   * AC:      Scenario 3 - Duplicate registration prevented
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   attendee_c@example.com is already registered for "Community Meetup"'s event
   *
   * Test data:
   *   Attendee: attendee_c@example.com (already registered)
   *
   * Expected result:
   *   attendee_c@example.com is told they are already registered; no duplicate registration is created
   */
  test.fixme('TC_E09S01_03 - Verify that attempting to register again for an event already registered for should be told so', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as attendee_c@example.com
    // 2. Open event "Community Meetup"
    // 3. Attempt to register again

    // TODO implement
  });

  /**
   * TC_E09S01_04
   * AC:      Scenario 4 - Missing fields identified
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   Event "Community Meetup" is open for registration
   *
   * Test data:
   *   Name: filled; Email: (blank)
   *
   * Expected result:
   *   Registration is blocked, and the Email field is identified as missing
   */
  test.fixme('TC_E09S01_04 - Verify that submitting registration with a required field empty should block registration and i', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as attendee_e@example.com
    // 2. Open event "Community Meetup"
    // 3. Leave the Email field empty
    // 4. Submit registration

    // TODO implement
  });

  /**
   * TC_E09S01_05
   * AC:      Scenario 5 - Unconfirmed event refused
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   Event "Draft Networking Event" has status "Planning" (not yet Confirmed)
   *
   * Test data:
   *   Event status: Planning
   *
   * Expected result:
   *   Registration is refused, since the event is not yet Confirmed
   */
  test.fixme('TC_E09S01_05 - Verify that attempting to register for an event that is not Confirmed should be refused', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as attendee_c@example.com
    // 2. Attempt to open the registration form for "Draft Networking Event"

    // TODO implement
  });

test.describe('E09-S02 - Enforce registration capacity', () => {

  /**
   * TC_E09S02_01
   * AC:      TODO - confirm which scenario this is evidence for
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   organiser_a@clienta.com is signed in; event "Community Meetup"'s event has no registration limit set yet
   *
   * Test data:
   *   Registration Limit: 5
   *
   * Expected result:
   *   The event's registration limit is saved as 5
   */
  test.fixme('TC_E09S02_01 - Verify that an Event Organiser should be able to set a registration limit for an event', async ({ page }) => {
    // Steps from the specification:
    // 1. Open event "Community Meetup"
    // 2. Set the Registration Limit for its event to 5
    // 3. Save

    // TODO implement
  });

  /**
   * TC_E09S02_02
   * AC:      Scenario 1 - Effective capacity enforced
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   "Community Meetup"'s event has an Organiser-set limit of 5 and a booked venue capacity of 8 (the limit is the lower value); 5 Attendees are already registered
   *
   * Test data:
   *   Registered so far: 5 (effective limit); Venue capacity: 8
   *
   * Expected result:
   *   Registration is refused since the event has reached its effective capacity of 5
   */
  test.fixme('TC_E09S02_02 - Verify that registration should stop once the event reaches the lower of the Organiser\'s limi', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as attendee_f@example.com
    // 2. Attempt to register for "Community Meetup"

    // TODO implement
  });

  /**
   * TC_E09S02_03
   * AC:      Scenario 2 - Simultaneous final registration
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   "Community Meetup"'s event has exactly 1 place remaining
   *
   * Test data:
   *   1 place remaining; 2 simultaneous attempts
   *
   * Expected result:
   *   Exactly one of the two registrations succeeds; the other is told the event is full
   */
  test.fixme('TC_E09S02_03 - Verify that when only one place remains, two simultaneous registration attempts should result i', async ({ page }) => {
    // Steps from the specification:
    // 1. Have attendee_g@example.com and attendee_h@example.com submit registration for the same event at the same moment
    // 2. Check both outcomes

    // TODO implement
  });

  /**
   * TC_E09S02_04
   * AC:      Scenario 3 - Full event offers the waiting list
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   "Community Meetup"'s event is full (5 of 5 places taken); the waiting list is enabled for this event
   *
   * Test data:
   *   Event: full; Waiting list: enabled
   *
   * Expected result:
   *   Registration is shown as closed, and the option to join the waiting list is offered
   */
  test.fixme('TC_E09S02_04 - Verify that opening the registration page for a full event should close registration and offe', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as attendee_i@example.com
    // 2. Open the registration page for "Community Meetup"

    // TODO implement
  });

  /**
   * TC_E09S02_05
   * AC:      Scenario 4 - Over-subscription warns without removing
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   "Community Meetup"'s event has 5 registered Attendees; a venue change is about to reduce its capacity to 3
   *
   * Test data:
   *   New venue capacity: 3; Registered: 5
   *
   * Expected result:
   *   coordinator_1@connectsphere.com is warned and shown the over-subscription (5 registered vs 3 capacity); no Attendee is automatically removed
   */
  test.fixme('TC_E09S02_05 - Verify that a venue change that reduces an event\'s capacity below its registered count should ', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Change the event's venue to one with capacity 3
    // 3. Save

    // TODO implement
  });

test.describe('E09-S03 - Control the registration period', () => {

  /**
   * TC_E09S03_01
   * AC:      TODO - confirm which scenario this is evidence for
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   organiser_a@clienta.com is signed in; event "Community Meetup" has no registration dates set
   *
   * Test data:
   *   Opens: 01/10/2026; Closes: 01/12/2026
   *
   * Expected result:
   *   The registration opening and closing dates are saved as entered
   */
  test.fixme('TC_E09S03_01 - Verify that an Event Organiser should be able to set the registration opening and closing dates', async ({ page }) => {
    // Steps from the specification:
    // 1. Open event "Community Meetup"
    // 2. Set Registration Opens: 01/10/2026, Registration Closes: 01/12/2026
    // 3. Save

    // TODO implement
  });

  /**
   * TC_E09S03_02
   * AC:      TODO - confirm which scenario this is evidence for
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   organiser_a@clienta.com is signed in; event "Community Meetup" has no withdrawal deadline set
   *
   * Test data:
   *   Withdrawal Deadline: 10/12/2026
   *
   * Expected result:
   *   The withdrawal deadline is saved as 10/12/2026
   */
  test.fixme('TC_E09S03_02 - Verify that an Event Organiser should be able to set a withdrawal deadline for an event', async ({ page }) => {
    // Steps from the specification:
    // 1. Open event "Community Meetup"
    // 2. Set Withdrawal Deadline: 10/12/2026
    // 3. Save

    // TODO implement
  });

  /**
   * TC_E09S03_03
   * AC:      Scenario 1 - Before registration opens
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   "Community Meetup"'s registration opening date (01/10/2026) has not yet been reached
   *
   * Test data:
   *   Opening date: 01/10/2026 (not reached)
   *
   * Expected result:
   *   Registration is shown as "Not yet open", with the message stating it opens on 01/10/2026
   */
  test.fixme('TC_E09S03_03 - Verify that an Attendee viewing an event before its registration opening date should see regist', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as attendee_c@example.com
    // 2. Open event "Community Meetup"

    // TODO implement
  });

  /**
   * TC_E09S03_04
   * AC:      Scenario 2 - After registration closes
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   "Community Meetup"'s registration closing date (01/12/2026) has passed
   *
   * Test data:
   *   Closing date: 01/12/2026 (passed)
   *
   * Expected result:
   *   Registration is refused, since the closing date has passed
   */
  test.fixme('TC_E09S03_04 - Verify that an Attendee trying to register after the registration closing date has passed shoul', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as attendee_c@example.com
    // 2. Attempt to register for "Community Meetup"

    // TODO implement
  });

  /**
   * TC_E09S03_05
   * AC:      Scenario 1 - Before registration opens
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   organiser_a@clienta.com is editing event "Community Meetup", which starts on 15/11/2026
   *
   * Test data:
   *   Closing date: 20/11/2026 (after event start 15/11/2026)
   *
   * Expected result:
   *   A warning is shown asking the Organiser to confirm this is intended, before the closing date is saved
   */
  test.fixme('TC_E09S03_05 - Verify that setting a registration closing date that falls after the event has started should w', async ({ page }) => {
    // Steps from the specification:
    // 1. Set Registration Closes: 20/11/2026 (after the event's start date)
    // 2. Click "Save"

    // TODO implement
  });

  /**
   * TC_E09S03_06
   * AC:      Scenario 4 - Waiting list enabled
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   organiser_a@clienta.com is about to enable the waiting list for event "Community Meetup"
   *
   * Test data:
   *   Waiting List: Enabled
   *
   * Expected result:
   *   Once the event is full, the further registration attempt is offered the waiting list instead of being simply refused
   */
  test.fixme('TC_E09S03_06 - Verify that enabling the waiting list for an event should offer it to Attendees once an event ', async ({ page }) => {
    // Steps from the specification:
    // 1. Open event "Community Meetup"
    // 2. Toggle "Enable Waiting List" on
    // 3. Save
    // 4. Fill the event to capacity and attempt a further registration

    // TODO implement
  });

test.describe('E09-S04 - Join the waiting list', () => {

  /**
   * TC_E09S04_01
   * AC:      Scenario 1 - Joined a full event's list
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   "Community Meetup"'s event is full; the waiting list is enabled and currently empty
   *
   * Test data:
   *   Waiting list: enabled, currently empty
   *
   * Expected result:
   *   attendee_i@example.com is added to the waiting list and shown their position (e.g. "Position 1")
   */
  test.fixme('TC_E09S04_01 - Verify that joining the waiting list for a full event with the list enabled should add the At', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as attendee_i@example.com
    // 2. Open the registration page for "Community Meetup"
    // 3. Click "Join Waiting List"

    // TODO implement
  });

  /**
   * TC_E09S04_02
   * AC:      Scenario 2 - Released place notified to all
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   "Community Meetup"'s waiting list has attendee_i@example.com (position 1) and attendee_j@example.com (position 2)
   *
   * Test data:
   *   Waiting list: attendee_i@example.com (1st), attendee_j@example.com (2nd)
   *
   * Expected result:
   *   Both waitlisted Attendees are notified of the released place; attendee_i@example.com successfully claims it since they acted first
   */
  test.fixme('TC_E09S04_02 - Verify that when a place is released in an event with a waiting list, all waitlisted Attendees', async ({ page }) => {
    // Steps from the specification:
    // 1. Have registered Attendee attendee_m@example.com withdraw from "Community Meetup", releasing one place
    // 2. Check notifications for attendee_i@example.com and attendee_j@example.com
    // 3. Have attendee_i@example.com claim the released place first

    // TODO implement
  });

  /**
   * TC_E09S04_03
   * AC:      Scenario 1 - Joined a full event's list
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   attendee_i@example.com has just claimed a released place in "Community Meetup"'s event
   *
   * Test data:
   *   Attendee: attendee_i@example.com (just claimed a place)
   *
   * Expected result:
   *   attendee_i@example.com no longer appears on the waiting list for that event, since they are now registered
   */
  test.fixme('TC_E09S04_03 - Verify that claiming a released place should remove the Attendee from the waiting list for that', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as attendee_i@example.com
    // 2. Check the waiting list for "Community Meetup"'s event

    // TODO implement
  });

  /**
   * TC_E09S04_04
   * AC:      Scenario 1 - Joined a full event's list
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   Event "Tech Conference 2026" has the waiting list disabled; Event 1 is full
   *
   * Test data:
   *   Waiting list: disabled; Event 1: full
   *
   * Expected result:
   *   No waiting list option is offered; registration is simply shown as closed
   */
  test.fixme('TC_E09S04_04 - Verify that a full event should not offer a waiting list when the Organiser has disabled it', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as attendee_k@example.com
    // 2. Open the registration page for Event 1 of "Tech Conference 2026"

    // TODO implement
  });

  /**
   * TC_E09S04_05
   * AC:      Scenario 1 - Joined a full event's list
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   attendee_j@example.com is on the waiting list for "Community Meetup"'s event, position 2
   *
   * Test data:
   *   Attendee: attendee_j@example.com
   *
   * Expected result:
   *   attendee_j@example.com is removed from the waiting list and no longer receives notifications about released places for that event
   */
  test.fixme('TC_E09S04_05 - Verify that an Attendee should be able to voluntarily leave the waiting list before a place is ', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as attendee_j@example.com
    // 2. Open the waiting list status for "Community Meetup"
    // 3. Click "Leave Waiting List"
    // 4. Confirm

    // TODO implement
  });

test.describe('E09-S05 - Withdraw my registration', () => {

  /**
   * TC_E09S05_01
   * AC:      Scenario 1 - Single event withdrawn
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   attendee_d@example.com is registered for both Event 1 and Event 2 of "Tech Conference 2026"; the withdrawal deadline has not passed
   *
   * Test data:
   *   Withdrawing from: Event 1 only
   *
   * Expected result:
   *   The Event 1 registration is cancelled and its place becomes available again; attendee_d@example.com remains registered for Event 2
   */
  test.fixme('TC_E09S05_01 - Verify that withdrawing from a single event before the withdrawal deadline should cancel that', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as attendee_d@example.com
    // 2. Open "My Registrations"
    // 3. Withdraw from Event 1 only

    // TODO implement
  });

  /**
   * TC_E09S05_02
   * AC:      Scenario 2 - Whole event withdrawn
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   attendee_d@example.com is registered for both Event 1 and Event 2 of "Tech Conference 2026"
   *
   * Test data:
   *   Withdrawing from: whole event (both events)
   *
   * Expected result:
   *   Both Event 1 and Event 2 registrations are cancelled, and both places are released
   */
  test.fixme('TC_E09S05_02 - Verify that withdrawing from the whole event should cancel every one of the Attendee\'s registra', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as attendee_d@example.com
    // 2. Open "My Registrations"
    // 3. Click "Withdraw from Entire Event"
    // 4. Confirm

    // TODO implement
  });

  /**
   * TC_E09S05_03
   * AC:      Scenario 3 - Withdrawal after deadline refused
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   "Community Meetup"'s withdrawal deadline (10/12/2026) has passed
   *
   * Test data:
   *   Withdrawal deadline: 10/12/2026 (passed)
   *
   * Expected result:
   *   Withdrawal is refused with the message "Withdrawal has closed" and a contact is provided for assistance
   */
  test.fixme('TC_E09S05_03 - Verify that attempting to withdraw after the withdrawal deadline has passed should be refused, ', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as attendee_c@example.com
    // 2. Attempt to withdraw from "Community Meetup"

    // TODO implement
  });

test.describe('E09-S06 - Record attendance', () => {

  /**
   * TC_E09S06_01
   * AC:      Scenario 2 - Registered but not attended
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   Event "Charity Run" has status "Completed" (per TC_E08S05_01); attendee_a@example.com is registered for its event
   *
   * Test data:
   *   Attendee: attendee_a@example.com
   *
   * Expected result:
   *   attendee_a@example.com's record shows "Attended"; the total registration figure for the event remains unchanged
   */
  test.fixme('TC_E09S06_01 - Verify that marking a registered Attendee as attended for an event after the event is Complete', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Open the completed event "Charity Run"
    // 3. Mark attendee_a@example.com as "Attended"

    // TODO implement
  });

  /**
   * TC_E09S06_02
   * AC:      Scenario 2 - Registered but not attended
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   Event "Charity Run" has status "Completed"; attendee_b@example.com was registered but has not been marked attended
   *
   * Test data:
   *   Attendee: attendee_b@example.com (registered, not marked attended)
   *
   * Expected result:
   *   attendee_b@example.com is shown as "Registered but not attended"
   */
  test.fixme('TC_E09S06_02 - Verify that a registered Attendee who did not attend should be shown as registered but not atte', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Open the completed event "Charity Run"
    // 3. Check attendee_b@example.com's status

    // TODO implement
  });

  /**
   * TC_E09S06_03
   * AC:      Scenario 3 - Recording before completion blocked
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   Event "Tech Conference 2026" has status "Confirmed" (not yet Completed)
   *
   * Test data:
   *   Event status: Confirmed (not Completed)
   *
   * Expected result:
   *   The action is blocked; attendance cannot be recorded before the event is Completed
   */
  test.fixme('TC_E09S06_03 - Verify that attempting to record attendance before the event is Completed should be blocked', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Open event "Tech Conference 2026"
    // 3. Attempt to mark an Attendee as attended

    // TODO implement
  });

  /**
   * TC_E09S06_04
   * AC:      Scenario 2 - Registered but not attended
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   Event "Charity Run" has status "Completed"; its event had 5 registrations and 4 marked attended
   *
   * Test data:
   *   Registered: 5; Attended: 4
   *
   * Expected result:
   *   The summary shows "Registered: 5" and "Attended: 4" together, side by side
   */
  test.fixme('TC_E09S06_04 - Verify that registration and attendance counts should be viewable side by side for each event', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as coordinator_1@connectsphere.com
    // 2. Open the completed event "Charity Run"
    // 3. View the event's registration and attendance summary

    // TODO implement
  });

test.describe('E09-S07 - View registrations for my event', () => {

  /**
   * TC_E09S07_01
   * AC:      Scenario 1 - Registrations grouped by event
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   Event "Tech Conference 2026" has attendee_a@example.com registered for Event 1 and attendee_b@example.com registered for Event 2
   *
   * Test data:
   *   Event 1: attendee_a@example.com; Event 2: attendee_b@example.com
   *
   * Expected result:
   *   The list shows attendee_a@example.com's name, email and contact number under Event 1, and attendee_b@example.com's under Event 2
   */
  test.fixme('TC_E09S07_01 - Verify that opening the registration list for an event with registered Attendees should show ea', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as organiser_a@clienta.com
    // 2. Open the registration list for "Tech Conference 2026"

    // TODO implement
  });

  /**
   * TC_E09S07_02
   * AC:      Scenario 2 - Counts and remaining capacity
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   "Tech Conference 2026" Event 1 has 100 registered out of a capacity of 150
   *
   * Test data:
   *   Event 1: 100 registered, capacity 150
   *
   * Expected result:
   *   Event 1 shows "100 registered" and "50 remaining"
   */
  test.fixme('TC_E09S07_02 - Verify that the registration list should show the registered count and remaining capacity per s', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as organiser_a@clienta.com
    // 2. Open the registration list for "Tech Conference 2026"

    // TODO implement
  });

  /**
   * TC_E09S07_03
   * AC:      Scenario 3 - Unmanaged event refused
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   organiser_b@clienta.com is linked to Client B; event "Annual Tech Summit" belongs to Client A
   *
   * Test data:
   *   Acting user: organiser_b@clienta.com; Event: Annual Tech Summit (Client A)
   *
   * Expected result:
   *   Access is refused, since "Annual Tech Summit" does not belong to organiser_b@clienta.com's client organisation
   */
  test.fixme('TC_E09S07_03 - Verify that attempting to open the registration list for an event that does not belong to the O', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as organiser_b@clienta.com
    // 2. Attempt to open the registration list for "Annual Tech Summit"

    // TODO implement
  });

  /**
   * TC_E09S07_04
   * AC:      Scenario 4 - Waitlist shown separately
   * Sprint:  4.0
   *
   * Pre-conditions:
   *   "Community Meetup"'s event has 5 registered Attendees and 2 on the waiting list
   *
   * Test data:
   *   Registered: 5; Waitlisted: 2
   *
   * Expected result:
   *   The 5 registered Attendees and the 2 waitlisted Attendees are shown in clearly separate sections/lists
   */
  test.fixme('TC_E09S07_04 - Verify that waitlisted Attendees should be shown separately from registered Attendees on the re', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as organiser_a@clienta.com
    // 2. Open the registration list for "Community Meetup"

    // TODO implement
  });

});
});
});
});
});
});
});
