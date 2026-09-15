# ADR 0002: Attendee registration

- Status: accepted registration requirements supplied for E01-S08; implementation choices documented below

Required fields are full_name, email, password and contact_number. Passwords require
at least 12 characters, one uppercase letter, one number and one special character.
These explicit story instructions supersede illustrative passwords in older test cases.
The implementation interprets uppercase and number as A-Z and 0-9; special characters
are Unicode punctuation or symbols, not whitespace. Passwords are never trimmed.
Contact number is required but no regional phone-number format is imposed.

Use the existing TypeScript accessControl module, React frontend and PostgreSQL users
table. Preserve the database's lowercase attendee enum and its account defaults.
Reject a supplied role field. Email is trimmed and lowercased before validation and
persistence. Migration 0002 retains the original UNIQUE constraint, adds a unique
index on lower(btrim(email)), and normalizes existing addresses. Concurrent case
variants are rejected by the database. If existing accounts collide after normalization,
the migration fails transactionally; resolve those accounts explicitly before retrying.
Apply migration 0002 before deploying the updated registration repository.

No secure application hasher existed: the seed-only SHA-256 helper is unsuitable for
registration. Use Node crypto scrypt (N=131072, r=8, p=1), a random 16-byte salt and a
64-byte derived key. Store the versioned parameters with the hash; provide a matching
constant-time verifier in accessControl for future login. Existing seed data is unchanged.
No login/session implementation is added by this story.

## Run

Install dependencies with npm ci. Set DATABASE_URL to your PostgreSQL database, then
run npm run db:migrate. Start npm run dev --workspace backend in one terminal and
npm run dev in another; visit http://127.0.0.1:5173/register.
Vercel serves POST /api/auth/register directly. Local Vite proxies /api to port 3001.

Run npm run test --workspace backend for service, hashing and endpoint tests.
Run npm run test:db --workspace backend with TEST_DATABASE_URL set to a disposable
PostgreSQL database with the existing migration applied. Database tests use an isolated
schema and remove it afterward. Run npm run test:e2e -- tests/e2e/registration.spec.ts
with the frontend running for browser form tests (API responses are mocked).
Run npm run typecheck and python scripts/check.py for additional checks.
