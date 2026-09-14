# Figma wireframe refinement plan

## Current source

- Figma file: `ConnectSphere-Wireframes`
- File key: `i6w23xtH8NmmtbI47P7Lpe`
- Shared link inspected: `https://www.figma.com/design/i6w23xtH8NmmtbI47P7Lpe/ConnectSphere-Wireframes?node-id=0-1`
- Repository branch for this plan: `docs/figma-high-fi-proposal`

The shared link points to the page root (`0:1`), not to an individual screen
frame. It is usable for file-level proposal work, but future exact
screen-by-screen inspection should use frame-specific links or exported
screenshots/SVGs.

## What exists in Figma now

The file has one page, `Page 1`, with a large imported wireframe section:

- Section: `ConnectSphere Wireframes.dc.html.html by html.to.design FREE version`
- Main frame: `Frame`, approximately `1920 x 11371`
- First visible workflow: `Access & role-based shell - Login -> role switch -> dashboard`
- First visible screen: `Login - default state`

The canvas also contains design inspiration notes:

- Primary teal: `#0E7C7B`
- Hover teal: `#14A3A1`
- Pressed/dark teal: `#0A5958`
- Primary text: `#0F0F0F`
- Secondary text: `#5C5C5C`
- Muted text: `#9B9B9B`
- Borders/dividers: `#E5E5E5`
- Page background: `#F7F7F5`
- Surface background: `#FFFFFF`
- Success/confirmed/approved: `#1F9254`
- Warning/pending/at-risk: `#D9A017`
- Danger/blocked/rejected: `#C0392B`
- Info/under review: `#2B6CB0`
- Typeface note: `Inter`

The current direction already fits a quiet operational web app: role-based
navigation, workflow queues, forms, statuses, and review decisions. The high-fi
work should refine that product interface, not turn it into a marketing page.

## Product screens to refine first

Prioritise screens that prove the core workflows and map to the acceptance tests:

1. Access shell
   - Login
   - Account creation
   - Role-aware dashboard shell
2. Event Organiser
   - Organiser dashboard and event status list
   - Create or edit event request
   - Request status/history and clarification response
3. Event Coordinator
   - Review queue
   - Event request review/detail
   - Approval, rejection, clarification, and confirmation decision states
4. Venue Staff
   - Pending booking request list
   - Venue suitability/availability review
   - Approve/reject booking decision dialog
5. Technical Support Staff
   - Equipment request list
   - Reservation/partial reservation state
   - Staff assignment conflict state
6. Attendee
   - Confirmed event discovery/detail
   - Registration and waitlist state
   - Withdrawal confirmation

## High-fi design direction

Use the existing teal palette as an action signal, not as a full-page wash.
Most of the interface should stay neutral so status chips and decision warnings
remain easy to scan.

Recommended system:

- Layout: left role navigation, top utility bar, main work area, optional detail
  drawer for status history, comments, and audit context.
- Tables: dense but readable, with sticky headers for long queues.
- Forms: grouped sections with clear required-field markers, inline validation,
  and a summary of missing fields before submission.
- Statuses: consistent chips for draft, submitted, under review, awaiting
  clarification, approved, planning, confirmed, rejected, cancelled, completed.
- Decisions: use modals or side panels only for real decision moments such as
  reject with reason, request clarification, approve booking, and confirm event.
- Accessibility: visible focus rings, labelled fields, keyboard-reachable
  actions, and no color-only status communication.
- Responsive: desktop-first for staff workflows, with mobile layouts for attendee
  event viewing and organiser status tracking.

## Figma update plan

Work in Figma should happen in controlled batches to avoid API/rate-limit waste:

1. Ask the designer or product owner to select the exact frame for each priority
   screen and copy frame-specific Figma links with `node-id=...`.
2. Create or update a Figma page named `High-fi proposal`.
3. Add a small design-token area with colors, type scale, spacing, radius, and
   status chip examples.
4. Refine the access shell first, then reuse that shell across role screens.
5. Convert each workflow into a small screen set:
   - list/queue state
   - detail state
   - decision/error state
   - success/confirmation state
6. Export one PNG per approved high-fi screen into `docs/design/exports/`, named
   by story or workflow, for example `E02-S01-submit-request.png`.
7. Link the final Figma frames from Jira/backlog items and PR descriptions.

Do not run broad repeated Figma inspections. Use one frame-specific design
context call per selected screen, or use manual Figma exports when rate limits
matter more than structured node data.

## Executed proposal pass

On 2026-09-13, a first high-fi comparison board was added to the side of the
existing Figma canvas. Existing boards were not modified.

- Board name: `High-fi proposal - Batch 1, side-by-side comparison`
- Board node id: `53:2`
- Canvas position: `x=4018`, `y=-360`
- Included proposal screens:
  - Login
  - Organiser dashboard
  - Coordinator review queue
  - Venue booking review

This proposal is intentionally a comparison draft, not the final design system.
On 2026-09-13, a second high-fi comparison board was added to continue the
proposal beside the existing canvas content. Existing boards were not modified.

- Board name: `High-fi proposal - Batch 2, event request and attendee registration`
- Board node id: `55:2`
- Canvas position: `x=6098`, `y=-360`
- Included proposal screens:
  - Submit event request
  - Request detail/status history
  - Clarification response
  - Attendee registration

The next Figma pass should use frame-specific links for exact screen refinement,
or team review can start from the two proposal boards now on the canvas.

On 2026-09-13, a third high-fi comparison board was added as a cleaner
responsive proposal after review feedback that Batch 2 was too rough and had
overlapping text. Existing boards were not modified.

- Board name: `High-fi proposal - Batch 3, responsive web and mobile`
- Board node id: `58:2`
- Canvas position: `x=8168`, `y=-360`
- Included proposal screens:
  - Desktop organiser dashboard
  - Desktop coordinator review queue
  - Mobile organiser request status
  - Mobile attendee event registration
- Palette used from the existing Figma notes:
  - Primary teal `#0E7C7B`
  - Hover teal `#14A3A1`
  - Pressed/dark teal `#0A5958`
  - Page background `#F7F7F5`
  - Surface `#FFFFFF`
  - Border `#E5E5E5`
  - Success `#1F9254`
  - Warning `#D9A017`
  - Danger `#C0392B`
  - Info `#2B6CB0`

Batch 3 is the preferred proposal for team review. Batch 1 and Batch 2 remain on
the canvas only for comparison.

## Batch 4 plan: depth-first role boards

Batch 4 should extend the Batch 3 direction rather than restart the visual style.
Use the same neutral operational interface, existing teal palette, status colors,
Inter type direction, and paired desktop/mobile layouts.

Create one separated Figma area per role so the team can review ownership and
workflow depth without mixing responsibilities:

| Role board | Desktop screens | Mobile companion screens | Include future backlog |
| --- | --- | --- | --- |
| Event Organiser | Create event request wizard, request detail timeline, clarification response, change/cancel request | Request status, clarification reply, cancellation confirmation | Change request, cancellation, reusable draft |
| Event Coordinator | Review queue, request detail, approval/rejection/clarification decision panel, event readiness checklist | Review summary, clarification thread, decision confirmation | Bulk triage, coordinator workload view |
| Venue Staff | Venue request queue, venue availability/detail review, approve/reject with alternative venue | Booking request detail, availability response | Tentative holds, venue conflict suggestions |
| Technical Support Staff | Equipment request queue, equipment reservation detail, partial reservation and staff assignment states | Equipment assignment summary, conflict response | Substitution suggestions, technician workload view |
| Attendee | Event discovery, event detail, registration, waitlist, withdrawal | Event detail, register/waitlist, ticket/status, withdrawal | Personalized recommendations, post-event feedback |
| Shared Access and Notifications | Login/account shell, permission denied, notification center, audit/history drawer | Login, notifications, role-aware home | Role switching, digest preferences |

Depth-first means each role should get a complete mini-flow, not a single pretty
dashboard. For each role, show:

1. list or entry state;
2. detail or form state;
3. decision/error/empty state;
4. success or status-tracking state;
5. mobile companion for the same workflow.

Future backlog content should be visually marked as `Future` or `Later` so the
team can discuss it without confusing it with Release 1 implementation scope.
Use it to reserve space in the information architecture, not to imply immediate
build commitment.

Recommended Batch 4 Figma execution:

1. Make one new section named `High-fi proposal - Batch 4, role-based depth flows`.
2. Place role boards left-to-right in the order above.
3. Reuse Batch 3 dimensions and tokens where possible.
4. Avoid broad repeated Figma reads; use the current documented palette and one
   controlled write pass.
5. After team review, export accepted frames into `docs/design/exports/` and
   link each frame from the matching Jira issue.

## Batch 5 plan: breadth-first full screen inventory

Batch 5 should keep the Batch 4 visual quality and role separation, but switch
from depth to breadth. The goal is to show every major screen family the team is
likely to build, including release-one screens and clearly marked future-backlog
screens, so frontend scaffolding and Jira breakdown can be planned from the same
map.

Create one new Figma area named
`High-fi proposal - Batch 5, breadth screen inventory`.

Use the same documented palette, Inter type direction, neutral operational
layout, and paired desktop/mobile approach. Every role should have a desktop
screen strip and a mobile companion strip where the workflow is user-facing.
Future backlog screens must be marked with `Future` or `Later`.

Planned Batch 5 coverage:

| Role or area | Screens |
| --- | --- |
| Access and account | Login, create account, forgot password, role-aware home, permission denied, profile/settings |
| Event Organiser | Dashboard, request list, create request wizard, draft editor, submitted detail, clarification response, change request, cancellation |
| Event Coordinator | Workload dashboard, review queue, request detail, decision panel, clarification thread, event planning workspace, readiness checklist, final confirmation |
| Venue Staff | Venue dashboard, venue inventory, availability calendar, pending booking detail, booking approval/rejection, venue blockout, conflict warning |
| Technical Support Staff | Equipment dashboard, equipment catalogue, request queue, reservation detail, partial fulfilment, technician assignment, conflict state |
| Attendee | Event discovery, event detail, registration, waitlist, registration status, withdrawal, post-event feedback |
| Shared operations | Notification center, audit/history drawer, comments/activity, search/filter patterns, empty/loading/error states |
| Admin/future backlog | User management, role assignment, reporting dashboard, digest preferences, recommendation/personalisation placeholders |

Batch 5 todo list:

1. Add the Batch 5 Figma board to the existing wireframe file without replacing
   Batches 1-4.
2. Record the Batch 5 node id and screen list in this document.
3. Export accepted Batch 5 frames into `docs/design/exports/` after review.
4. Link approved screens to Jira stories once the Jira project is connected.
5. Use Batch 5 to drive frontend route/component folder scaffolding.

## GitHub workflow plan

Keep Figma planning separate from application implementation:

1. Use a docs branch for design planning and exported reference screens.
2. Add design notes and exports under `docs/design/`.
3. Open a PR with screenshots/exports and reviewer notes.
4. After team approval, create implementation tickets for individual screens.
5. Only after the frontend stack/package manager is recorded, add React source,
   package manifests, tests, and CI commands.

Each future frontend PR should link:

- the Jira issue or backlog item;
- the relevant Figma frame;
- the acceptance criteria/test cases covered;
- the screenshots or Playwright evidence once implemented.

## Information still needed

To produce high-fi Figma updates safely, the next input should be one of:

- frame-specific Figma links for the priority screens;
- exported PNG/SVG files from the current wireframes;
- approval to make one Figma write pass that creates a `High-fi proposal` page
  and a token board without modifying the existing wireframes.

The current page-root link is useful for orientation, but not enough for exact
screen-by-screen refinement.
