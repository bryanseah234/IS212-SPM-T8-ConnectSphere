-- Published snapshots are separate from mutable internal planning records.
CREATE TABLE event_publications (
  event_id uuid PRIMARY KEY REFERENCES events(id) ON DELETE CASCADE,
  name varchar(240) NOT NULL,
  starts_at timestamptz NOT NULL,
  ends_at timestamptz NOT NULL,
  venue_name varchar(160) NOT NULL,
  venue_location varchar(255) NOT NULL,
  published_at timestamptz NOT NULL DEFAULT now(),
  CHECK (ends_at > starts_at)
);

ALTER TABLE event_publications ENABLE ROW LEVEL SECURITY;
-- No browser role receives a policy permitting direct reads of planning data.
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE venue_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_threads ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON event_publications FROM PUBLIC;
