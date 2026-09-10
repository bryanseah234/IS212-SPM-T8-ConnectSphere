"""Preview the proposed GitHub settings; an administrator can apply with --apply."""

import argparse
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPOSITORY = "jininggg/IS212-SPM-T8-ConnectSphere"


def api(endpoint: str, *, method: str = "GET", payload: dict | None = None):
    command = ["gh", "api", f"repos/{REPOSITORY}{endpoint}", "--method", method]
    if payload is not None:
        command.extend(["--input", "-"])
    result = subprocess.run(
        command, input=json.dumps(payload) if payload is not None else None,
        capture_output=True, text=True, check=False,
    )
    if result.returncode:
        raise RuntimeError(result.stderr.strip() or "GitHub request failed")
    return json.loads(result.stdout) if result.stdout.strip() else None


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apply", action="store_true", help="Apply after reviewing the preview")
    args = parser.parse_args()
    settings = json.loads((ROOT / ".github/settings/repository.json").read_text())
    protection = json.loads((ROOT / ".github/settings/main-protection.json").read_text())
    print(f"Target repository: {REPOSITORY}")
    print("Repository settings:\n" + json.dumps(settings, indent=2))
    print("Main protection:\n" + json.dumps(protection, indent=2))
    repo = api("")
    admin = repo.get("permissions", {}).get("admin", False)
    print(f"Authenticated account has admin permission: {admin}")
    if not args.apply:
        print("Preview only. No GitHub settings changed.")
        return 0
    if not admin:
        print("BLOCKED: a repository administrator must run this command. No settings changed.")
        return 1

    # This bootstrap script must never replace or weaken a protection added later.
    branch = api("/branches/main")
    if branch.get("protected") or api("/rulesets"):
        print("Existing protection/rulesets detected; review and adjust manually. No changes made.")
        return 1
    checks = api(f"/commits/{branch['commit']['sha']}/check-runs?per_page=100")
    successful = {check["name"] for check in checks["check_runs"] if check["conclusion"] == "success"}
    expected = set(protection["required_status_checks"]["contexts"])
    if not expected.issubset(successful):
        print("Wait for both required CI checks to succeed on the current main commit first.")
        return 1

    api("", method="PATCH", payload=settings)
    print("Repository merge settings applied.")
    api("/branches/main/protection", method="PUT", payload=protection)
    observed_repo = api("")
    observed_protection = api("/branches/main/protection")
    if any(observed_repo.get(key) != value for key, value in settings.items()):
        raise RuntimeError("Repository settings read-back differs from the requested values.")
    for key in ("enforce_admins", "required_linear_history", "required_conversation_resolution"):
        if not observed_protection[key]["enabled"]:
            raise RuntimeError(f"Protection read-back failed for {key}.")
    for key in ("allow_force_pushes", "allow_deletions"):
        if observed_protection[key]["enabled"]:
            raise RuntimeError(f"Protection read-back failed for {key}.")
    observed_checks = observed_protection["required_status_checks"]
    observed_reviews = observed_protection["required_pull_request_reviews"]
    if set(observed_checks["contexts"]) != expected or not observed_checks["strict"]:
        raise RuntimeError("Required checks read-back differs from the requested values.")
    if observed_reviews["required_approving_review_count"] != 1 or not observed_reviews["dismiss_stale_reviews"]:
        raise RuntimeError("Required reviews read-back differs from the requested values.")
    print("PASS: GitHub merge settings and main protection applied and read back.")
    print("Verify enforcement with a failing PR and a PR awaiting another person's approval.")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except RuntimeError as error:
        raise SystemExit(str(error)) from error
