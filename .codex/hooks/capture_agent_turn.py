"""Append Codex prompts and final responses to the public 8x session log."""

from __future__ import annotations

import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path


AUTHOR = "mhuzaifaawan7"
PROJECT = "higgsfield-rebuild"
TOOL = "codex"


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def safe_id(value: str) -> str:
    return re.sub(r"[^A-Za-z0-9._-]", "-", value)


def find_log(log_dir: Path, session_id: str) -> Path | None:
    suffix = f"_{safe_id(session_id)}.md"
    return next(log_dir.glob(f"*{suffix}"), None)


def parse_entries(content: str) -> tuple[int, int]:
    prompt_numbers = [int(n) for n in re.findall(r"type=PROMPT num=(\d+)", content)]
    response_numbers = [int(n) for n in re.findall(r"type=RESPONSE num=(\d+)", content)]
    return max(prompt_numbers, default=0), max(response_numbers, default=0)


def write_header(
    path: Path,
    *,
    session_id: str,
    model: str,
    timestamp: str,
    day: str,
) -> None:
    path.write_text(
        "\n".join(
            [
                "---",
                f"session_id: {session_id}",
                f"date: {day}",
                f"author: {AUTHOR}",
                f"model: {model}",
                f"tool: {TOOL}",
                f"project: {PROJECT}",
                "total_exchanges: pending",
                f"first_prompt_time: {timestamp}",
                "last_prompt_time: pending",
                "---",
                "",
                f"# Session Log - {day}",
                "",
                f"Session: `{session_id[:8]}` | Project: `{PROJECT}` | Author: `{AUTHOR}`",
                "",
                "---",
                "",
            ]
        ),
        encoding="utf-8",
    )


def update_header(content: str, *, total: int, last_prompt_time: str | None) -> str:
    content = re.sub(
        r"(?m)^total_exchanges:.*$", f"total_exchanges: {total}", content, count=1
    )
    if last_prompt_time:
        content = re.sub(
            r"(?m)^last_prompt_time:.*$",
            f"last_prompt_time: {last_prompt_time}",
            content,
            count=1,
        )
    return content


def main() -> int:
    # Codex writes hook JSON as UTF-8. Windows' text-mode stdin can otherwise
    # decode it with the active ANSI code page and corrupt non-ASCII prompts.
    event = json.loads(sys.stdin.buffer.read().decode("utf-8"))
    event_name = event.get("hook_event_name", "")
    if event_name not in {"UserPromptSubmit", "Stop"}:
        return 0

    cwd = Path(event.get("cwd") or os.getcwd()).resolve()
    log_dir = cwd / ".agent-logs"
    log_dir.mkdir(parents=True, exist_ok=True)

    session_id = str(event.get("session_id") or "unknown-session")
    model = str(event.get("model") or "unknown-model")
    now = utc_now()
    timestamp = now.isoformat(timespec="milliseconds").replace("+00:00", "Z")
    day = now.date().isoformat()

    path = find_log(log_dir, session_id)
    if path is None:
        filename = f"{now.strftime('%Y-%m-%d_%H-%M-%S')}_{safe_id(session_id)}.md"
        path = log_dir / filename
        write_header(
            path,
            session_id=session_id,
            model=model,
            timestamp=timestamp,
            day=day,
        )

    content = path.read_text(encoding="utf-8")
    prompt_num, response_num = parse_entries(content)

    if event_name == "UserPromptSubmit":
        number = prompt_num + 1
        body = str(event.get("prompt") or "")
        entry_type = "PROMPT"
    else:
        number = response_num + 1
        body = str(event.get("last_assistant_message") or "")
        entry_type = "RESPONSE"

    short_session = session_id[:8]
    entry = (
        f"[LOG_ENTRY type={entry_type} num={number} session={short_session}]\n"
        f"timestamp: {timestamp}\n"
        f"model: {model}\n\n"
        f"{body}\n\n\n"
    )
    content += entry

    if event_name == "UserPromptSubmit":
        prompt_num = number
    else:
        response_num = number
    content = update_header(
        content,
        total=max(prompt_num, response_num),
        last_prompt_time=timestamp if event_name == "UserPromptSubmit" else None,
    )
    path.write_text(content, encoding="utf-8")

    if event_name == "Stop":
        print(json.dumps({"continue": True}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
