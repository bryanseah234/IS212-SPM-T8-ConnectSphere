# GitHub PR automation

This repository uses protected pull requests into `main`.

Current live repository settings:

- Squash merge only.
- Delete branch on merge.
- Update-branch support enabled.
- Native GitHub auto-merge enabled.
- Same-repository PR branch updates enabled after pushes to `main`, by hourly
  schedule, and by manual dispatch.
- `main` requires up-to-date branches, the required checks, one human approval,
  resolved conversations, linear history, and no force pushes or deletions.

## What auto-merge means here

Auto-merge does not bypass review. A maintainer or PR author can enable
auto-merge on a PR, and GitHub will complete the squash merge only after all
branch-protection requirements are satisfied.

That means the normal flow is:

1. Open a draft PR.
2. Keep the branch updated with `main`.
3. Resolve merge conflicts and failing checks before requesting review.
4. Wait for `repository-checks`, `pr-conventions`, and `lfs-guard` on the
   latest commit.
5. Mark the PR ready and request a human approval.
6. Resolve conversations.
7. Enable auto-merge if the PR should merge as soon as those gates are green.

Request reviews only after the PR is review-ready: no merge conflicts, not behind
`main`, and required checks passing or queued for the latest commit. Protected
branch rules dismiss stale approvals after new commits, so early approvals often
force teammates to review the same PR again after conflict fixes.

## What is not automated

GitHub does not automatically enable auto-merge for every future PR from this
repository setting alone. Someone with permission still enables it per PR.

`allow_update_branch` makes the update-branch operation available. The
`Update PR branches` workflow runs after pushes to `main`, on an hourly schedule,
and by manual dispatch to update open, non-draft PRs whose branches are behind
`main`.

The updater is intentionally narrow:

- It only updates PRs targeting `main`.
- It only updates branches in this repository.
- It skips draft PRs.
- It updates only PRs GitHub reports as `BEHIND`.
- It does not merge PRs.
- It does not use `pull_request_target`.

Do not add a bot workflow that merges PRs automatically unless the team records
that decision first. Native GitHub auto-merge after human review is the current
merge automation boundary.
