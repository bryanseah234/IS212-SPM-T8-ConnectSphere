## Architecture Modular Monolith User Flow (Revised)
## 8. Dynamic view — Event Organiser

```mermaid
sequenceDiagram
    actor EO as Event Organiser
    participant UI as React Web Application
    participant IAM as Access Control
    participant EVT as Event Lifecycle
    participant DB as PostgreSQL
    participant NOT as Notification Dispatcher

    EO->>UI: Log in
    UI->>IAM: Submit credentials
    IAM->>DB: Read user, role and client organisation
    DB-->>IAM: Authorised organiser identity
    IAM-->>UI: Create authenticated session

    EO->>UI: Create or reopen event request
    UI->>EVT: Create or load draft
    EVT->>DB: Read or write event request
    EVT-->>UI: Display editable request

    EO->>UI: Save draft
    UI->>EVT: Save incomplete requirements
    EVT->>DB: Set status Draft, append audit entry

    EO->>UI: Submit completed request
    UI->>EVT: Submit event request
    EVT->>EVT: Validate all ten mandatory fields
    alt All mandatory fields present
        EVT->>DB: Set status Submitted, append audit entry
        EVT->>NOT: Raise submitted event
        NOT->>DB: Write Coordinator delivery rows in same transaction
        EVT-->>UI: Submission successful
    else Fields missing or preferred date in the past
        EVT-->>UI: Return validation errors naming each missing field
    end

    EO->>UI: Track request status
    UI->>EVT: Request event, comments and history
    EVT->>DB: Read event, clarifications and activity log
    EVT-->>UI: Display current status and history

    alt Coordinator raises clarification
        NOT-->>EO: Clarification notification
        EO->>UI: Submit response
        UI->>EVT: Record response
        EVT->>DB: Set status Under Review
    else Request approved
        EVT->>DB: Read venue and equipment readiness
        EVT-->>UI: Display planning or confirmed details
    end

    opt Post-approval change
        EO->>UI: Submit change request
        UI->>EVT: Record change request
        EVT->>DB: Write change request, audit entry and deliveries
        EVT-->>UI: Confirm request is pending Coordinator review
    end
```

## 9. Dynamic view — Event Coordinator

```mermaid
sequenceDiagram
    actor EC as Event Coordinator
    participant UI as React Web Application
    participant IAM as Access Control
    participant EVT as Event Lifecycle
    participant VEN as Venue Management
    participant EQ as Equipment and Support
    participant DB as PostgreSQL
    participant NOT as Notification Dispatcher

    EC->>UI: Log in and open review queue
    UI->>IAM: Validate session and Coordinator role
    UI->>EVT: Request assigned events
    EVT->>DB: Read events, assignments and statuses
    EVT-->>UI: Display review queue

    EC->>UI: Review event requirements
    UI->>EVT: Load complete request
    EVT->>DB: Read event, comments and clarifications

    alt Information incomplete
        EC->>UI: Raise clarification questions
        UI->>EVT: Record questions
        EVT->>DB: Set status Awaiting Clarification, write deliveries
    else Request unsuitable
        EC->>UI: Reject with a reason
        UI->>EVT: Record rejection
        EVT->>DB: Set status Rejected, store reason, write deliveries
    else Request acceptable
        EC->>UI: Approve
        UI->>EVT: Record approval
        EVT->>DB: Set status Approved, write deliveries
    end

    par Venue planning
        EVT->>VEN: Send event date, capacity, layout and accessibility needs
        VEN->>DB: Read venues, blocks and existing bookings
        VEN->>DB: Write booking request with status Pending
        Note over VEN,DB: First request moves the event from Approved to Planning
        VEN-->>EVT: Return pending, confirmed, rejected or conflicting
    and Equipment planning
        EVT->>EQ: Send event items, quantities and support needs
        EQ->>DB: Read equipment, unavailability and reservations
        EQ->>DB: Write reservations and staff assignments
        EQ-->>EVT: Return reserved, partial or shortfall
    end

    EC->>UI: Attempt to confirm event
    UI->>EVT: Check event readiness
    EVT->>DB: Read booking and reservation state for the event
    alt Event lacks a venue, has a partial reservation, or has an unstaffed support request
        EVT-->>UI: Block confirmation and list outstanding items
    else Event fully arranged
        EVT->>DB: Set status Confirmed, append audit entry, write deliveries
        EVT-->>UI: Event confirmed
    end

    opt Revert, cancel or complete
        EC->>UI: Apply lifecycle action
        UI->>EVT: Record action with reason
        EVT->>DB: Update status, release or flag arrangements, write audit and deliveries
    end
```

## 10. Dynamic view — Venue Staff

```mermaid
sequenceDiagram
    actor VS as Venue Staff
    participant UI as React Web Application
    participant IAM as Access Control
    participant VEN as Venue Management
    participant EVT as Event Lifecycle
    participant DB as PostgreSQL
    participant NOT as Notification Dispatcher

    VS->>UI: Log in
    UI->>IAM: Validate session and Venue Staff role

    VS->>UI: Maintain venue catalogue
    UI->>VEN: Save capacity, layouts, accessibility features and facilities
    VEN->>DB: Write venue, layouts and feature links, append audit entry

    opt Venue unavailable
        VS->>UI: Record maintenance period
        UI->>VEN: Create venue block
        VEN->>DB: Write block
        alt Block overlaps a confirmed booking
            VEN-->>UI: Warn and require conflict to be resolved first
        else No overlap
            VEN->>DB: Write deliveries for affected Coordinators
        end
    end

    VS->>UI: Open a pending booking request
    UI->>VEN: Load event requirements and venue
    VEN->>DB: Read event, requirements and venue state

    VS->>UI: Review suitability and availability
    VEN->>DB: Read capacity, layouts, features, operating hours, blocks and bookings
    Note over VEN: Suitability is advisory; the decision remains with Venue Staff

    alt Approve
        UI->>VEN: Approve booking request
        VEN->>DB: Set booking status Confirmed
        Note over VEN,DB: EXCLUDE constraint rejects overlapping confirmed bookings
        alt Constraint violation, another approval won
            VEN-->>UI: Report that the venue has just been taken
        else Written successfully
            VEN->>DB: Flag competing pending requests as conflicting
            VEN-->>EVT: Return confirmed booking
            VEN->>DB: Write Coordinator deliveries
        end
    else Reject
        UI->>VEN: Reject with reason and optional alternative venue
        VEN->>DB: Set booking status Rejected, store reason and suggestion
        VEN-->>EVT: Return rejection so Coordinator can amend the request
    end
```

## 11. Dynamic view — Technical Support Staff

```mermaid
sequenceDiagram
    actor TS as Technical Support Staff
    participant UI as React Web Application
    participant IAM as Access Control
    participant EQ as Equipment and Support
    participant EVT as Event Lifecycle
    participant DB as PostgreSQL
    participant NOT as Notification Dispatcher

    TS->>UI: Log in
    UI->>IAM: Validate session and Technical Support role

    TS->>UI: Maintain equipment catalogue
    UI->>EQ: Save type, description, quantity, location and operational status
    EQ->>DB: Write equipment, append audit entry

    TS->>UI: Open an equipment request
    UI->>EQ: Load requested items, quantities and event times
    EQ->>DB: Read request and event

    TS->>UI: Check availability
    EQ->>DB: Read total quantity, overlapping reservations and dated unavailability
    Note over EQ: Location does not affect availability; no transit allowance applies

    alt Full quantity available
        TS->>UI: Reserve equipment
        EQ->>DB: Write reservation with status Reserved
        EQ-->>EVT: Return reserved
    else Only part available
        TS->>UI: Record partial reservation
        EQ->>DB: Write reservation with status Partial
        EQ->>DB: Write Coordinator deliveries stating outstanding quantity
        EQ-->>EVT: Return shortfall, which blocks confirmation
    end

    opt Event requested technical support
        TS->>UI: Assign an available colleague
        UI->>EQ: Record assignment
        EQ->>DB: Write assignment
        Note over EQ,DB: EXCLUDE constraint rejects overlapping assignments for the same colleague
    end

    opt Item damaged or entering maintenance
        TS->>UI: Mark item unavailable for a period with a reason
        EQ->>DB: Write dated unavailability row
        EQ->>DB: Flag affected events and write Coordinator deliveries
        Note over EQ,DB: Existing reservations are flagged, never released automatically
    end
```

## 12. Dynamic view — Attendee

```mermaid
sequenceDiagram
    actor AT as Attendee
    participant UI as React Web Application
    participant IAM as Access Control
    participant REG as Registration
    participant EVT as Event Lifecycle
    participant DB as PostgreSQL
    participant NOT as Notification Dispatcher

    AT->>UI: Create account or log in
    UI->>IAM: Submit details or credentials
    IAM->>DB: Read or write attendee account
    Note over IAM: Public sign-up grants the Attendee role only

    AT->>UI: View a confirmed event
    UI->>REG: Request published information
    REG->>DB: Read confirmed event, venue and accessibility details
    Note over REG: Coordinator notes, booking decisions and internal planning are excluded

    AT->>UI: Register for the event
    UI->>REG: Submit registration
    REG->>DB: Check event capacity and current registrations
    alt Capacity available
        REG->>DB: Create registration with status Registered
        REG->>DB: Write confirmation delivery
        REG-->>UI: Display successful registration
    else Event is full
        REG->>DB: Create registration with status Waitlisted
        REG->>DB: Write waitlist delivery
        REG-->>UI: Display waitlist status
    end

    opt Attendee withdraws
        AT->>UI: Withdraw registration
        UI->>REG: Submit withdrawal
        REG->>DB: Set registration status Withdrawn
        alt Waitlisted attendee can be promoted
            REG->>DB: Promote next waitlisted registration
            REG->>DB: Write promotion delivery
            NOT-->>AT: Registration status updated
        end
    end

    opt Event completed
        REG->>DB: Record attendance against the registration
    end

    opt Confirmed event changes
        EVT->>DB: Read affected registrations
        EVT->>DB: Write deliveries
        NOT-->>AT: Updated date, time, venue or cancellation details
    end
```
