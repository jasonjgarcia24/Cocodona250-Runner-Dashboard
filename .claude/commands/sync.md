---
description: Stage, commit, and push changes. Defaults to main with an auto-generated commit message.
---

Sync local changes to GitHub.

**Arguments** (all optional, parsed from `$ARGUMENTS`):
- `--branch <name>` (or `-b <name>`): override the default branch (`main`)
- Any other text: use as the commit message instead of auto-generating one

**Examples:**
- `/sync` -> push to `main` with an auto-generated commit message
- `/sync fix typo in slide 5` -> push to `main` with "fix typo in slide 5" as the message
- `/sync --branch draft` -> push to `draft` with an auto-generated message
- `/sync -b draft fix typo` -> push to `draft` with "fix typo" as the message

**Steps:**

1. Run `git status`, `git diff` (staged and unstaged), and `git log -5 --oneline` in parallel to see what changed and to match the repo's existing commit message style.

2. If the working tree is clean (nothing staged, nothing modified, no untracked files worth committing), stop and report "Nothing to sync."

3. Parse `$ARGUMENTS`:
   - Extract `--branch <name>` or `-b <name>` if present -> target branch.
   - Treat any remaining non-flag text as the commit message.
   - Defaults: target branch = `main`, commit message = auto-generated.

4. Verify the current branch matches the target branch. If not, warn the user and ask for confirmation before switching.

5. If no commit message was provided in arguments, draft a concise one that summarizes the changes. Match the repo's existing style (sentence-case imperative, no conventional-commit prefix). Focus on the *why* over the *what*.

6. Stage changes by listing specific files explicitly (do NOT use `git add -A` or `git add .`) to avoid accidentally committing anything sensitive like `.env`, credentials, or large binaries. Skip anything that looks sensitive and warn the user.

7. Create the commit with the standard `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>` trailer, passed via HEREDOC for correct formatting.

8. Push to `origin <branch>`, using `-u` if the branch has no upstream set.

9. Report:
   - The commit SHA
   - The branch pushed to
   - Confirmation that the push succeeded
