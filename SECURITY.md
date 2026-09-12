# Security Policy

## Reporting a Vulnerability

Do not open a public GitHub issue for security vulnerabilities. Report it to the
project team privately through the course communication channel.

Include:

- what the vulnerability is
- how to reproduce it
- the expected impact
- any affected commit, branch, or deployment URL

## Automated Security

This repository currently checks for private keys, likely secrets, suspicious
large files, Git LFS pointer files, and dependency updates. These checks reduce
accidental exposure but are not a full historical audit.

If a real credential is committed, rotate or revoke it first. Removing it from a
later commit is not enough because Git history and forks may still contain it.

## Secrets

Keep real secrets out of Git. Use `.env.example` for variable names and safe
placeholder values only. Anything bundled into future frontend code should be
treated as public.
