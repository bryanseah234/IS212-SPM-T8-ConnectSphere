-- Explicitly provision this mapping; never infer staff membership from an email.
ALTER TABLE users ADD COLUMN auth_subject uuid UNIQUE;
CREATE INDEX notifications_user_event_idx ON notifications (user_id, event_id);

-- Browser Supabase roles must not bypass the server's organisation checks.
-- Server queries use the private PostgreSQL connection as the table owner.
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
DO $$
DECLARE browser_role text;
BEGIN
  FOREACH browser_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = browser_role) THEN
      EXECUTE format('REVOKE ALL ON events, users, notifications, audit_logs FROM %I', browser_role);
    END IF;
  END LOOP;
END $$;
