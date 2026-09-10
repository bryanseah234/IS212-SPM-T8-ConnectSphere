# ConnectSphere

IS212 Software Project Management team 8 web application monorepo.

- Status: repository foundation; application scope and technology stack are undecided.
- Owners: the project team listed in [CODEOWNERS](.github/CODEOWNERS).
- Frontend and backend will live together with independent application boundaries.
- Licensing: not selected; the team should decide in line with course requirements.

## Start here

Install Git and Python 3.12 or newer. Python is used for repository tooling only.
From the cloned repository root, run:

```text
python scripts/setup.py
git add <files-you-intend-to-commit>
python scripts/check.py
```

On macOS/Linux, use `python3` if `python` is unavailable. On Windows, `py -3.12`
also works. No environment activation or global package installation is required.
The first setup needs internet access to install the pinned tools and hooks.

Local clones use `.venv-tools/`. Windows network-share clones use an isolated
per-clone environment under `%LOCALAPPDATA%/ConnectSphere/tooling/` to avoid slow
network filesystem installs. The setup prints the location; the check command
finds it automatically.

The setup installs commit, commit-message, and push hooks in this clone. It
preserves inherited hooks and leaves global Git configuration unchanged. Rerun
setup after cloning, moving the repository, or changing the tooling dependencies.

## Read the guides

- [Full repository setup and engineering guide](docs/repository-setup.md): the
  rationale, conventions, review bots, tests, CI/CD, security, and staged rollout.
- [Contributing](CONTRIBUTING.md): everyday commands and the PR workflow.
- [GitHub owner setup](docs/github-owner-setup.md): activate the merge protections
  and optional review bot that cannot be enabled by a write-only collaborator.
- [Architecture boundary](docs/architecture.md) and
  [initial decision record](docs/decisions/0001-repository-foundation.md).

## What exists today

Local hooks and CI check whitespace, structured-file syntax, conflicts, filename
case collisions, large files, private keys, likely secrets, and repository-tooling
behaviour. PRs also get branch/title validation. Dependabot is configured for
GitHub Actions and the repository tooling.

**There is no application to run yet.** Frontend/backend linting, type checking,
application tests, builds, and deployment are not configured. A green repository
check does not claim those have passed. CodeRabbit configuration is prepared;
its GitHub App must be installed before automated reviews are active.

## Layout

```text
frontend/             Future browser application
backend/              Future API, application logic, and database migrations
tests/e2e/            Future tests across the complete application
tooling/              Repository tooling requirements and its own tests
scripts/              Cross-platform setup, checks, and GitHub settings helper
docs/                 Setup guide, architecture, and decision records
.github/              CI, templates, ownership, dependency updates, proposed settings
```

See the owner guide for the outstanding server-side setup. Checking in the JSON
settings files does not enable protection automatically.
