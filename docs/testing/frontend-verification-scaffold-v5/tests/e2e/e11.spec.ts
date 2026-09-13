import { test, expect } from '@playwright/test';

// E11 - 7 cases. Generated from IS212_PROJECT_TEST_CASES.xlsx.
// Each test.fixme() is a specification. Remove .fixme once implemented.

test.describe('E11-S01 - Notify users about events they are involved in', () => {

  /**
   * TC_E11S01_01
   * AC:      Scenario 1 - Status change notified
   * Sprint:  2.0
   *
   * Pre-conditions:
   *   organiser_a@clienta.com is linked to event "Annual Tech Summit", currently "Under Review"
   *
   * Test data:
   *   Event: Annual Tech Summit; Change: Under Review → Approved
   *
   * Expected result:
   *   A notification is received stating the status changed to "Approved", the time of the change, and that it concerns "Annual Tech Summit"
   */
  test.fixme('TC_E11S01_01 - Verify that a user linked to an event should be notified when its status changes or a booking d', async ({ page }) => {
    // Steps from the specification:
    // 1. As coordinator_1@connectsphere.com, approve request "Annual Tech Summit" (status → Approved)
    // 2. Log in as organiser_a@clienta.com and open notifications

    // TODO implement
  });

  /**
   * TC_E11S01_02
   * AC:      Scenario 4 - Only the affected event's Attendees
   * Sprint:  2.0
   *
   * Pre-conditions:
   *   Event "Annual Tech Summit" Event 1 has organiser_a@clienta.com, venue_staff_1@connectsphere.com, and tech_support_1@connectsphere.com assigned, and attendee_a@example.com registered
   *
   * Test data:
   *   Changed field: Venue
   *
   * Expected result:
   *   All 4 users (organiser_a@clienta.com, venue_staff_1@connectsphere.com, tech_support_1@connectsphere.com, attendee_a@example.com) receive a notification of the venue change
   */
  test.fixme('TC_E11S01_02 - Verify that a change to an event\'s date, time or venue should notify the Organiser, assigned V', async ({ page }) => {
    // Steps from the specification:
    // 1. As coordinator_1@connectsphere.com, change Event 1's venue
    // 2. Check notifications for organiser_a@clienta.com, venue_staff_1@connectsphere.com, tech_support_1@connectsphere.com, and attendee_a@example.com

    // TODO implement
  });

  /**
   * TC_E11S01_03
   * AC:      Scenario 3 - Unaffected users not notified
   * Sprint:  2.0
   *
   * Pre-conditions:
   *   Event "Annual Tech Summit" Event 1's Description field is about to be edited; venue_staff_1@connectsphere.com has no responsibility tied to the Description field
   *
   * Test data:
   *   Changed field: Description only
   *
   * Expected result:
   *   venue_staff_1@connectsphere.com receives no notification, since the Description change does not affect their responsibilities
   */
  test.fixme('TC_E11S01_03 - Verify that a user whose responsibilities are unaffected by a change should not be notified', async ({ page }) => {
    // Steps from the specification:
    // 1. As organiser_a@clienta.com, edit the Description field only
    // 2. Check venue_staff_1@connectsphere.com's notifications

    // TODO implement
  });

  /**
   * TC_E11S01_04
   * AC:      Scenario 4 - Only the affected event's Attendees
   * Sprint:  2.0
   *
   * Pre-conditions:
   *   Event "Tech Conference 2026" has Event 1 (attendee_a@example.com registered) and Event 2 (attendee_b@example.com registered)
   *
   * Test data:
   *   Changed event: Event 1 only
   *
   * Expected result:
   *   attendee_a@example.com (registered for Event 1) receives a notification; attendee_b@example.com (registered for Event 2 only) does not
   */
  test.fixme('TC_E11S01_04 - Verify that a change affecting only one event of a multi-event should notify only tha', async ({ page }) => {
    // Steps from the specification:
    // 1. As coordinator_1@connectsphere.com, change Event 1's time only
    // 2. Check notifications for attendee_a@example.com and attendee_b@example.com

    // TODO implement
  });

  /**
   * TC_E11S01_05
   * AC:      Scenario 5 - Delivered in-app and by email
   * Sprint:  2.0
   *
   * Pre-conditions:
   *   organiser_a@clienta.com's registered email is organiser_a@clienta.com; a notification-triggering status change is about to occur on their event
   *
   * Test data:
   *   Registered email: organiser_a@clienta.com
   *
   * Expected result:
   *   The notification appears in the in-app notification list, and an equivalent email is also delivered to organiser_a@clienta.com's inbox
   */
  test.fixme('TC_E11S01_05 - Verify that a generated notification should appear in the system and also be sent to the user\'s', async ({ page }) => {
    // Steps from the specification:
    // 1. Trigger a status change on organiser_a@clienta.com's event
    // 2. Log in as organiser_a@clienta.com and check the in-app notification list
    // 3. Check the inbox for organiser_a@clienta.com

    // TODO implement
  });

  /**
   * TC_E11S01_06
   * AC:      Scenario 6 - Unread notifications distinguished
   * Sprint:  2.0
   *
   * Pre-conditions:
   *   organiser_a@clienta.com has 3 notifications on 09/09/2026: 08:00 (read), 10:00 (unread), 14:00 (unread)
   *
   * Test data:
   *   Notifications: 08:00 (read), 10:00 (unread), 14:00 (unread)
   *
   * Expected result:
   *   Notifications are listed newest first (14:00, then 10:00, then 08:00), with the 14:00 and 10:00 entries visually marked as unread and 08:00 shown as read
   */
  test.fixme('TC_E11S01_06 - Verify that opening the notification list with several unread notifications should show them ne', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as organiser_a@clienta.com
    // 2. Open the notification list

    // TODO implement
  });

  /**
   * TC_E11S01_07
   * AC:      Scenario 7 - Marked as read
   * Sprint:  2.0
   *
   * Pre-conditions:
   *   organiser_a@clienta.com has an unread notification from 10:00 on 09/09/2026
   *
   * Test data:
   *   Notification: 10:00 on 09/09/2026 (initially unread)
   *
   * Expected result:
   *   The 10:00 notification is now shown as read (no longer marked unread) in the list
   */
  test.fixme('TC_E11S01_07 - Verify that opening an unread notification should mark it as read', async ({ page }) => {
    // Steps from the specification:
    // 1. Log in as organiser_a@clienta.com
    // 2. Open the notification list
    // 3. Click on the 10:00 notification to open it
    // 4. Return to the notification list

    // TODO implement
  });

});
