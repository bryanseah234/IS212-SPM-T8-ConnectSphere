"""Exercise policy boundaries, including forged bot branch names and PR title edits."""

import importlib.util
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[2] / "scripts" / "check_metadata.py"
SPEC = importlib.util.spec_from_file_location("metadata", SCRIPT)
metadata = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(metadata)


class MetadataTests(unittest.TestCase):
    def test_conventional_titles_and_breaking_changes(self):
        for title in ("feat(frontend): add form", "fix(backend)!: require a date", "ci: add checks"):
            with self.subTest(title=title):
                self.assertTrue(metadata.check_title(title))

    def test_malformed_and_multiline_titles_fail(self):
        for title in ("update", "feat:", "feat: ", "feat: one\nfix: two", "chore: " + "a" * 100):
            with self.subTest(title=title):
                self.assertFalse(metadata.check_title(title))

    def test_branch_boundaries(self):
        for branch in ("feature/42-user-profile", "fix/57-empty-form", "chore/setup-ci"):
            self.assertTrue(metadata.check_branch(branch))
        for branch in ("main", "feature/", "feature/Fix", "feature/a--b", "bryan-work"):
            self.assertFalse(metadata.check_branch(branch))

    def test_dependabot_exception_requires_bot_identity(self):
        self.assertFalse(metadata.check_branch("dependabot/pip/tooling/update"))
        self.assertTrue(metadata.check_branch("dependabot/pip/tooling/update", automated=True))

    def test_pr_event_validation_uses_author_identity(self):
        event = {"pull_request": {
            "title": "chore(deps): update tooling",
            "head": {"ref": "dependabot/pip/tooling/update"},
            "user": {"login": "student", "type": "User"},
        }}
        with tempfile.TemporaryDirectory() as temporary:
            event_file = Path(temporary) / "event.json"
            event_file.write_text(json.dumps(event), encoding="utf-8")
            result = subprocess.run(
                [sys.executable, str(SCRIPT), "pr", str(event_file)], capture_output=True
            )
            self.assertEqual(result.returncode, 1)
            event["pull_request"]["user"] = {"login": "dependabot[bot]", "type": "Bot"}
            event_file.write_text(json.dumps(event), encoding="utf-8")
            result = subprocess.run(
                [sys.executable, str(SCRIPT), "pr", str(event_file)], capture_output=True
            )
            self.assertEqual(result.returncode, 0)

    def test_invalid_commit_message_is_rejected(self):
        with tempfile.TemporaryDirectory() as temporary:
            message = Path(temporary) / "COMMIT_EDITMSG"
            message.write_text("just stuff\n", encoding="utf-8")
            result = subprocess.run(
                [sys.executable, str(SCRIPT), "commit-msg", str(message)], capture_output=True
            )
            self.assertEqual(result.returncode, 1)


if __name__ == "__main__":
    unittest.main()
