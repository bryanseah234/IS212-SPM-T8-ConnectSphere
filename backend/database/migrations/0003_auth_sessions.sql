-- Only a digest of the opaque session token is persisted.
CREATE TABLE auth_sessions (
  token_hash char(64) PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX auth_sessions_user_idx ON auth_sessions (user_id);
CREATE INDEX auth_sessions_expiry_idx ON auth_sessions (expires_at);
ALTER TABLE auth_sessions ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON auth_sessions FROM PUBLIC;

-- Login is case-insensitive; duplicate identities must be resolved before migration.
CREATE UNIQUE INDEX users_email_case_insensitive_idx ON users (lower(email));
