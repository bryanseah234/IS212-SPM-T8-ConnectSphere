"""Find this clone's tooling environment without sharing it between machines."""

import hashlib
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def environment_dir() -> Path:
    if os.name == "nt" and str(ROOT).startswith("\\\\"):
        clone_id = hashlib.sha256(str(ROOT).casefold().encode()).hexdigest()[:16]
        cache = Path(os.environ.get("LOCALAPPDATA", str(Path.home() / ".cache")))
        return cache / "ConnectSphere" / "tooling" / clone_id
    return ROOT / ".venv-tools"


def python_path() -> Path:
    return environment_dir() / ("Scripts/python.exe" if os.name == "nt" else "bin/python")
