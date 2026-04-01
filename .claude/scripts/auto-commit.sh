#!/bin/bash
# Auto-commit and push script for Claude Code PostToolUse hook
# Runs after Edit/Write tool calls to keep changes committed

cd "$(git rev-parse --show-toplevel 2>/dev/null)" || exit 0

# Skip if no changes exist
if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
    exit 0
fi

# Stage all changes and commit
git add -A
git commit -q -m "auto-commit: $(date '+%Y-%m-%d %H:%M:%S')" \
    -m "Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>" 2>/dev/null || exit 0

# Push if a remote is configured (silently skip otherwise)
if git remote | grep -q .; then
    git push -q 2>/dev/null || true
fi
