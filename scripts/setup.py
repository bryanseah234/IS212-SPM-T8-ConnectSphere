"""Install isolated repository tooling and Git hooks. Run after every clone."""

import os
import subprocess
import sys
import venv
from pathlib import Path

from tooling_env import environment_dir, python_path

ROOT = Path(__file__).resolve().parents[1]


def run(*args: str, **kwargs: object) -> None:
    subprocess.run(args, cwd=ROOT, check=True, **kwargs)


def main() -> None:
    if sys.version_info < (3, 12):
        raise SystemExit("Repository tooling requires Python 3.12 or newer.")
    run("git", "rev-parse", "--git-dir")
    tool_env = environment_dir()
    tool_python = python_path()
    print(f"Tooling environment: {tool_env}", flush=True)
    if not tool_python.exists():
        venv.EnvBuilder(with_pip=True).create(tool_env)
    run(str(tool_python), "-m", "pip", "install", "-r", "tooling/requirements.txt")

    common_dir = subprocess.check_output(
        ["git", "rev-parse", "--git-common-dir"], cwd=ROOT, text=True
    ).strip()
    # --git-path hooks follows core.hooksPath (even when empty); use the common
    # Git directory explicitly so an inherited global path is never overwritten.
    hooks_output = str(Path(common_dir) / "hooks")
    hooks_dir = (ROOT / hooks_output).resolve()
    configured = subprocess.run(
        ["git", "config", "--get", "core.hooksPath"],
        cwd=ROOT, capture_output=True, text=True, check=False,
    ).stdout.strip()
    previous_dir = (ROOT / Path(configured).expanduser()).resolve() if configured else hooks_dir
    hooks_dir.mkdir(parents=True, exist_ok=True)
    if previous_dir != hooks_dir:
        # pre-commit preserves these forwarding scripts as *.legacy and calls them.
        # Existing personal hooks remain at their original paths, with their helpers.
        for hook in ("pre-commit", "commit-msg", "pre-push"):
            source, target = previous_dir / hook, hooks_dir / hook
            if source.is_file():
                if target.exists():
                    raise SystemExit(f"Both {source} and {target} exist; reconcile before setup.")
                # Let Git execute the original hook: it resolves Unix-style
                # shebangs on Windows, unlike Python's direct subprocess launcher.
                command = [
                    "git", "-c", f"core.hooksPath={previous_dir.as_posix()}",
                    "hook", "run", hook, "--",
                ]
                target.write_text(
                    "#!/usr/bin/env python\n"
                    "# ConnectSphere: preserve the inherited hook at its original path.\n"
                    "import subprocess\nimport sys\n"
                    f"raise SystemExit(subprocess.call({command!r} + sys.argv[1:]))\n",
                    encoding="utf-8", newline="\n",
                )
                target.chmod(target.stat().st_mode | 0o111)
                print(f"Preserving inherited {hook}: {source}", flush=True)

    # Hide hooksPath only from this installer process. Never change global Git config.
    install_env = os.environ.copy()
    config_index = int(install_env.get("GIT_CONFIG_COUNT", "0"))
    install_env["GIT_CONFIG_COUNT"] = str(config_index + 1)
    install_env[f"GIT_CONFIG_KEY_{config_index}"] = "core.hooksPath"
    install_env[f"GIT_CONFIG_VALUE_{config_index}"] = ""
    run(str(tool_python), "-m", "pre_commit", "install", env=install_env)
    run("git", "config", "--local", "core.hooksPath", hooks_output)
    run(str(tool_python), "-m", "pre_commit", "install-hooks")
    print("Repository hooks installed. Global Git settings are unchanged.")
    print("Run: python scripts/check.py")


if __name__ == "__main__":
    main()
