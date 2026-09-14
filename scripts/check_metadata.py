"""Validate the team's branch and title conventions locally and in CI."""

import argparse
import json
import os
import re
import subprocess
from pathlib import Path

TYPES = "feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert"
TITLE = re.compile(rf"(?:{TYPES})(?:\([a-z0-9][a-z0-9-]*\))?!?: \S.*")
BRANCH = re.compile(
    r"(?:feature|fix|chore|docs|test|refactor|ci)/"
    r"(?:[a-z0-9]+(?:-[a-z0-9]+)*|[A-Z][A-Z0-9]+-\d+(?:-[a-z0-9]+)*)"
)


def check_title(title: str) -> bool:
    return bool(TITLE.fullmatch(title)) and len(title) <= 100 and title == title.strip()


def check_branch(branch: str, *, automated: bool = False) -> bool:
    if automated and branch.startswith("dependabot/"):
        return True
    return bool(BRANCH.fullmatch(branch))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("mode", choices=["commit-msg", "branch", "pr"])
    parser.add_argument("value", nargs="?")
    args = parser.parse_args()

    if args.mode == "commit-msg":
        if not args.value:
            parser.error("commit-msg requires a message file")
        lines = Path(args.value).read_text(encoding="utf-8-sig").splitlines()
        title = lines[0] if lines else ""
        # Git-generated merge/revert messages stay usable on feature branches.
        if title.startswith(("Merge ", 'Revert "')) or check_title(title):
            return 0
        print("Use type(scope): description, at most 100 characters.")
        print("Example: feat(frontend): add profile form")
        return 1

    if args.mode == "branch":
        branch = args.value
        if branch is None:
            branch = subprocess.check_output(
                ["git", "symbolic-ref", "--short", "HEAD"], text=True
            ).strip()
        if branch == "main":
            print("Direct main push: repository checks run in CI; use a PR after bootstrap.")
            return 0
        if check_branch(branch):
            return 0
        print("Use feature/SCRUM-123-description, fix/57-description, or chore/setup-ci.")
        return 1

    event_path = args.value or os.environ.get("GITHUB_EVENT_PATH")
    if not event_path:
        parser.error("pr requires an event JSON file or GITHUB_EVENT_PATH")
    event = json.loads(Path(event_path).read_text(encoding="utf-8"))
    pr = event["pull_request"]
    author = pr["user"]
    automated = author["login"] == "dependabot[bot]" and author["type"] == "Bot"
    valid = True
    if not check_title(pr["title"]):
        print("PR title must use type(scope): description, at most 100 characters.")
        valid = False
    if not check_branch(pr["head"]["ref"], automated=automated):
        print("PR branch must use the naming convention in CONTRIBUTING.md.")
        valid = False
    return 0 if valid else 1


if __name__ == "__main__":
    raise SystemExit(main())
