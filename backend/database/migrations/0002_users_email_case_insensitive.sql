-- Preserve the existing email UNIQUE constraint and additionally protect case variants.
-- If existing accounts collide after normalization, fail without merging or deleting them.
-- The migration runner executes this migration in a transaction.
CREATE UNIQUE INDEX users_email_normalized_key ON users (lower(btrim(email)));

UPDATE users SET email = lower(btrim(email)) WHERE email <> lower(btrim(email));
