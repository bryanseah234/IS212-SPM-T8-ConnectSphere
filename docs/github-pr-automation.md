# GitHub PR automation

This repository uses protected pull requests into `main`.

Current live repository settings:

- Squash merge only.
- Delete branch on merge.
- Update-branch support enabled.
- Native GitHub auto-merge enabled.
- `main` requires up-to-date branches, the required checks, one human approval,
  resolved conversations, linear history, and no force pushes or deletions.

## What auto-merge means here

Auto-merge does not bypass review. A maintainer or PR author can enable
auto-merge on a PR, and GitHub will complete the squash merge only after all
branch-protection requirements are satisfied.

That means the normal flow is:

1. Open a PR.
2. Keep the branch updated with `main`.
3. Wait for `repository-checks`, `pr-conventions`, and `lfs-guard`.
4. Get one human approval.
5. Resolve conversations.
6. Enable auto-merge if the PR should merge as soon as those gates are green.

## What is not automated

GitHub does not automatically enable auto-merge for every future PR from this
repository setting alone. Someone with permission still enables it per PR.

GitHub also does not automatically update every PR branch just because
`allow_update_branch` is enabled. That setting makes the update-branch operation
available. Because `main` uses strict required checks, stale PR branches must be
updated before merge.

Do not add a custom bot workflow that updates or merges PRs automatically unless
the team records that decision first. Native GitHub auto-merge after human review
is the current automation boundary.
