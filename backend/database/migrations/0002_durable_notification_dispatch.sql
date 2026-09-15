-- Additive dispatch state. Existing delivery rows and notification history stay
-- intact. Older rows are not publishable until their payload is prepared.
ALTER TABLE notification_deliveries
  ADD COLUMN dispatch_state text NOT NULL DEFAULT 'pending'
    CHECK (dispatch_state IN ('pending', 'publishing', 'published', 'sending', 'done', 'failed', 'uncertain')),
  ADD COLUMN recipient_email text,
  ADD COLUMN subject text,
  ADD COLUMN html text,
  ADD COLUMN created_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN next_attempt_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN next_publish_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN publish_token uuid,
  ADD COLUMN publish_lease_until timestamptz,
  ADD COLUMN send_token uuid,
  ADD COLUMN send_lease_until timestamptz,
  ADD COLUMN attempts integer NOT NULL DEFAULT 0 CHECK (attempts >= 0),
  ADD COLUMN provider_message_id text,
  ADD CONSTRAINT notification_delivery_payload_bound CHECK (
    (recipient_email IS NULL AND subject IS NULL AND html IS NULL) OR
    (recipient_email IS NOT NULL AND subject IS NOT NULL AND html IS NOT NULL
      AND octet_length(recipient_email) BETWEEN 3 AND 254
      AND octet_length(subject) BETWEEN 1 AND 998
      AND octet_length(html) BETWEEN 1 AND 65536)
  );

CREATE INDEX notification_deliveries_pending_dispatch_idx
  ON notification_deliveries (next_publish_at, created_at, id)
  WHERE delivery_status = 'queued' AND recipient_email IS NOT NULL
    AND dispatch_state IN ('pending', 'publishing', 'published');
CREATE INDEX notification_deliveries_expired_send_idx
  ON notification_deliveries (send_lease_until, id)
  WHERE dispatch_state = 'sending';

-- Outbox payloads are server-private. No browser policy is introduced.
ALTER TABLE notification_deliveries ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON notification_deliveries FROM PUBLIC;
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
    REVOKE ALL ON notification_deliveries FROM anon;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
    REVOKE ALL ON notification_deliveries FROM authenticated;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'connectsphere_app') THEN
    GRANT SELECT, INSERT, UPDATE ON notification_deliveries TO connectsphere_app;
    CREATE POLICY notification_deliveries_server_access ON notification_deliveries
      TO connectsphere_app USING (true) WITH CHECK (true);
  END IF;
END $$;
