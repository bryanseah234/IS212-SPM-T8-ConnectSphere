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
