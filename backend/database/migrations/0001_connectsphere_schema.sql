CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE TYPE user_role AS ENUM (
  'event_organiser',
  'event_coordinator',
  'venue_staff',
  'technical_support_staff',
  'attendee'
);

CREATE TYPE event_status AS ENUM (
  'draft',
  'submitted',
  'under_review',
  'awaiting_clarification',
  'rejected',
  'approved',
  'planning',
  'confirmed',
  'cancelled',
  'completed'
);

CREATE TYPE booking_status AS ENUM (
  'pending',
  'confirmed',
  'rejected',
  'released',
  'conflicting'
);

CREATE TYPE equipment_status AS ENUM (
  'available',
  'maintenance',
  'retired'
);

CREATE TYPE reservation_status AS ENUM (
  'reserved',
  'partial',
  'released'
);

CREATE TYPE support_status AS ENUM (
  'open',
  'staffed',
  'cancelled'
);

CREATE TYPE assignment_status AS ENUM (
  'assigned',
  'released',
  'cancelled'
);

CREATE TYPE registration_status AS ENUM (
  'registered',
  'waitlisted',
  'withdrawn'
);

CREATE TYPE thread_type AS ENUM (
  'comment',
  'clarification_request',
  'clarification_response'
);

CREATE TYPE change_status AS ENUM (
  'pending',
  'approved',
  'declined',
  'applied'
);

CREATE TYPE notification_channel AS ENUM (
  'in_app',
  'email'
);

CREATE TYPE delivery_status AS ENUM (
  'queued',
  'sent',
  'failed'
);

CREATE TABLE client_organisations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(160) NOT NULL UNIQUE,
  contact_email varchar(255),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_org_id uuid REFERENCES client_organisations(id) ON DELETE RESTRICT,
  email varchar(255) NOT NULL UNIQUE,
  password_hash varchar(255) NOT NULL,
  full_name varchar(160) NOT NULL,
  role user_role NOT NULL,
  contact_number varchar(32),
  is_active boolean NOT NULL DEFAULT true,
  deactivated_at timestamptz,
  failed_login_count smallint NOT NULL DEFAULT 0 CHECK (failed_login_count >= 0),
  locked_until timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE password_reset_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash varchar(255) NOT NULL,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE room_layouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code varchar(80) NOT NULL UNIQUE,
  label varchar(160) NOT NULL
);

CREATE TABLE venues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(160) NOT NULL UNIQUE,
  location varchar(255) NOT NULL,
  max_capacity int NOT NULL CHECK (max_capacity > 0),
  opens_at time NOT NULL,
  closes_at time NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (opens_at < closes_at)
);

CREATE TABLE venue_supported_layouts (
  venue_id uuid NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
  layout_id uuid NOT NULL REFERENCES room_layouts(id) ON DELETE RESTRICT,
  capacity int NOT NULL CHECK (capacity > 0),
  PRIMARY KEY (venue_id, layout_id)
);

CREATE TABLE accessibility_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code varchar(80) NOT NULL UNIQUE,
  label varchar(160) NOT NULL
);

CREATE TABLE venue_accessibility_features (
  venue_id uuid NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
  feature_id uuid NOT NULL REFERENCES accessibility_features(id) ON DELETE RESTRICT,
  PRIMARY KEY (venue_id, feature_id)
);

CREATE TABLE facilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code varchar(80) NOT NULL UNIQUE,
  label varchar(160) NOT NULL
);

CREATE TABLE venue_facilities (
  venue_id uuid NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
  facility_id uuid NOT NULL REFERENCES facilities(id) ON DELETE RESTRICT,
  PRIMARY KEY (venue_id, facility_id)
);

CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_code varchar(40) UNIQUE,
  organiser_id uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  coordinator_id uuid REFERENCES users(id) ON DELETE SET NULL,
  client_org_id uuid NOT NULL REFERENCES client_organisations(id) ON DELETE RESTRICT,
  title varchar(240) NOT NULL,
  description text,
  purpose text,
  status event_status NOT NULL DEFAULT 'draft',
  decision_reason text,
  status_changed_at timestamptz NOT NULL DEFAULT now(),
  registration_enabled boolean NOT NULL DEFAULT false,
  waitlist_enabled boolean NOT NULL DEFAULT false,
  registration_opens_at timestamptz,
  registration_closes_at timestamptz,
  withdrawal_deadline timestamptz,
  event_range tstzrange NOT NULL,
  expected_attendance int NOT NULL CHECK (expected_attendance > 0),
  layout_id uuid REFERENCES room_layouts(id) ON DELETE RESTRICT,
  accessibility_note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (NOT isempty(event_range)),
  CHECK (
    registration_opens_at IS NULL
    OR registration_closes_at IS NULL
    OR registration_opens_at < registration_closes_at
  )
);

CREATE TABLE event_accessibility_needs (
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  feature_id uuid NOT NULL REFERENCES accessibility_features(id) ON DELETE RESTRICT,
  PRIMARY KEY (event_id, feature_id)
);

CREATE TABLE event_facility_needs (
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  facility_id uuid NOT NULL REFERENCES facilities(id) ON DELETE RESTRICT,
  PRIMARY KEY (event_id, facility_id)
);

CREATE TABLE venue_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id uuid NOT NULL REFERENCES venues(id) ON DELETE RESTRICT,
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  booking_range tstzrange NOT NULL,
  status booking_status NOT NULL DEFAULT 'pending',
  requires_reconfirmation boolean NOT NULL DEFAULT false,
  decision_reason text,
  suggested_venue_id uuid REFERENCES venues(id) ON DELETE SET NULL,
  decided_by uuid REFERENCES users(id) ON DELETE SET NULL,
  decided_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (NOT isempty(booking_range))
);

ALTER TABLE venue_bookings
  ADD CONSTRAINT venue_bookings_no_active_overlap
  EXCLUDE USING gist (venue_id WITH =, booking_range WITH &&)
  WHERE (status IN ('pending', 'confirmed'));

CREATE TABLE venue_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id uuid NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
  block_range tstzrange NOT NULL,
  reason varchar(255) NOT NULL,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (NOT isempty(block_range))
);

CREATE TABLE equipment (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(160) NOT NULL UNIQUE,
  category varchar(120) NOT NULL,
  description text,
  operational_status equipment_status NOT NULL DEFAULT 'available',
  total_quantity int NOT NULL CHECK (total_quantity >= 0),
  home_location varchar(255),
  is_active boolean NOT NULL DEFAULT true
);

CREATE TABLE equipment_unavailability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  equipment_id uuid NOT NULL REFERENCES equipment(id) ON DELETE CASCADE,
  quantity int NOT NULL CHECK (quantity > 0),
  unavailable_range tstzrange NOT NULL,
  reason varchar(255) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (NOT isempty(unavailable_range))
);

CREATE TABLE equipment_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  equipment_id uuid NOT NULL REFERENCES equipment(id) ON DELETE RESTRICT,
  quantity_requested int NOT NULL CHECK (quantity_requested > 0),
  technical_notes text,
  requested_by uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE equipment_reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES equipment_requests(id) ON DELETE CASCADE,
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  equipment_id uuid NOT NULL REFERENCES equipment(id) ON DELETE RESTRICT,
  quantity_reserved int NOT NULL CHECK (quantity_reserved > 0),
  reservation_range tstzrange NOT NULL,
  status reservation_status NOT NULL DEFAULT 'reserved',
  requires_reconfirmation boolean NOT NULL DEFAULT false,
  reserved_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (NOT isempty(reservation_range))
);

CREATE TABLE tech_support_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  support_required boolean NOT NULL DEFAULT false,
  support_description text,
  support_range tstzrange NOT NULL,
  status support_status NOT NULL DEFAULT 'open',
  requested_by uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (NOT isempty(support_range))
);

CREATE TABLE tech_staff_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES tech_support_requests(id) ON DELETE CASCADE,
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  staff_id uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  assignment_range tstzrange NOT NULL,
  status assignment_status NOT NULL DEFAULT 'assigned',
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (NOT isempty(assignment_range))
);

ALTER TABLE tech_staff_assignments
  ADD CONSTRAINT tech_staff_assignments_no_active_overlap
  EXCLUDE USING gist (staff_id WITH =, assignment_range WITH &&)
  WHERE (status = 'assigned');

CREATE TABLE event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  attendee_id uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  status registration_status NOT NULL DEFAULT 'registered',
  registered_at timestamptz NOT NULL DEFAULT now(),
  withdrawn_at timestamptz,
  UNIQUE (event_id, attendee_id)
);

CREATE TABLE event_attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id uuid NOT NULL REFERENCES event_registrations(id) ON DELETE CASCADE,
  attended boolean NOT NULL,
  recorded_by uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  recorded_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE event_threads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  author_id uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  type thread_type NOT NULL,
  body text NOT NULL,
  parent_id uuid REFERENCES event_threads(id) ON DELETE SET NULL,
  resolved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE change_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  requested_by uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  description text NOT NULL,
  requested_changes jsonb NOT NULL DEFAULT '{}'::jsonb,
  status change_status NOT NULL DEFAULT 'pending',
  reviewed_by uuid REFERENCES users(id) ON DELETE SET NULL,
  decision_reason text,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  title varchar(240) NOT NULL,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE notification_deliveries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_id uuid NOT NULL REFERENCES notifications(id) ON DELETE CASCADE,
  channel notification_channel NOT NULL,
  delivery_status delivery_status NOT NULL DEFAULT 'queued',
  sent_at timestamptz,
  failure_reason text
);

CREATE INDEX notification_deliveries_delivery_status_idx
  ON notification_deliveries (delivery_status);

CREATE TABLE audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid REFERENCES users(id) ON DELETE SET NULL,
  entity_type varchar(120) NOT NULL,
  entity_id uuid NOT NULL,
  event_id uuid REFERENCES events(id) ON DELETE SET NULL,
  action varchar(160) NOT NULL,
  field_changed varchar(160),
  old_value text,
  new_value text,
  occurred_at timestamptz NOT NULL DEFAULT now()
);

REVOKE UPDATE, DELETE ON audit_logs FROM PUBLIC;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'connectsphere_app') THEN
    REVOKE UPDATE, DELETE ON audit_logs FROM connectsphere_app;
  END IF;
END $$;

CREATE INDEX users_client_org_id_idx ON users (client_org_id);
CREATE INDEX events_client_org_id_idx ON events (client_org_id);
CREATE INDEX events_organiser_id_idx ON events (organiser_id);
CREATE INDEX venue_bookings_event_id_idx ON venue_bookings (event_id);
CREATE INDEX equipment_requests_event_id_idx ON equipment_requests (event_id);
CREATE INDEX tech_support_requests_event_id_idx ON tech_support_requests (event_id);
CREATE INDEX event_registrations_attendee_id_idx ON event_registrations (attendee_id);
CREATE INDEX audit_logs_event_id_idx ON audit_logs (event_id);
