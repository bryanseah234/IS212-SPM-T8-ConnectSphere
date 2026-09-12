# GitHub administrator setup

The repository was bootstrapped under a personal account, then transferred to
the course organization. GitHub reported administrator access after the transfer,
so the authenticated administrator account can manage branch protection and merge
settings.

## Activate the prepared settings

After changing required checks, wait for the relevant jobs to succeed on a pull
request. With GitHub CLI authenticated as an administrator, run from this repo:

```text
python scripts/configure_github.py
python scripts/configure_github.py --apply
```

The first command previews both JSON payloads and checks permissions without
changing anything. The second applies and reads back the settings. It stops before
mutations if admin access is missing, either expected check has not passed on the
current main commit, or existing protection/rulesets need reconciliation.

The script targets the repository reported by `gh repo view`, so update the
local `origin` remote before running it after any future transfer. It is an
initial bootstrap helper; it does not overwrite rulesets added later. If an API
call fails after the first update, it exits with the raw failure: inspect GitHub
before retrying because earlier successful updates are not rolled back
automatically.

Reviewable payloads:

- [Repository merge settings](../.github/settings/repository.json): squash-only
  merges, PR title/body as squash message, delete merged branches, allow updating
  feature branches, and enable issues.
- [Main protection](../.github/settings/main-protection.json): require an
  up-to-date PR, the repository checks, one approval, stale-approval dismissal,
  resolved conversations, and linear history; disallow force pushes/deletion and
  enforce the rules for admins too.

In the GitHub UI, equivalent settings are under repository Settings, General
(merge methods) and Branches (protection for `main`). Configure the required checks
only after they have run. When possible, select GitHub Actions as the expected
source for those checks.

`CODEOWNERS` initially routes reviews to the current six collaborators. Code-owner
approval is not an additional hard requirement; any eligible teammate can provide
the required approval. Agree on narrower responsibilities later if helpful.

Once protected, direct `main` pushes will be rejected. Use reviewed PRs for
subsequent changes. The user's direct-main bootstrap instruction does not require
disabling these protections for later work.

## Verify enforcement

Open a small PR from a correctly named branch. Confirm the required checks run.
Change its title to an invalid title and verify `pr-conventions` fails, then
correct it and verify it reruns successfully. Make a check fail and confirm merge
is blocked. Confirm an otherwise green PR still needs another person's approval.
After approval, push another change and verify the prior approval is dismissed.
This is a manual acceptance exercise; the bootstrap does not claim it was
completed remotely.

## Reviews and dependency updates

Teammates review pull requests, supported by the automated CI checks. The team has
chosen not to use AI review services or pay for review subscriptions. There is no
reviewer App to install.

Dependabot remains configured to propose dependency updates. It is separate from
code review and does not use an AI reviewer. No AWS or other deployment account is
required for the repository foundation.

## After selecting the stack

Add actual frontend/backend checks and then update the required-check list to
include them. Choose hosting and configure separate deployment environments and
secrets only when there is a deployable application. See the
[full guide](repository-setup.md) for the intended test and CI/CD design.
