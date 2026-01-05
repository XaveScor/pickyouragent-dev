---
featureName: agentMode
subfeatureName: ask
---

Explore your code. No edits. Just answers

Ask mode lets you explore and ask questions about your codebase without making any changes. The agent can read code, answer questions, and explain how things work, but won't edit files or run commands. This makes it a safe option for learning and understanding your code. Some tools may not work in ask mode (for example, the browser tool is unavailable in Cursor's ask mode).

**Supported agents:**

- Cursor (Use Shift+Tab to switch to ask mode)
- Kilo Code (Ask Mode is available in mode selector - type `/ask` or use mode selector, limited to read/browser/mcp tools)
- Junie (Select "Ask" in the mode picker dropdown)

**Partially supported agents:**

- Claude Code (Use Plan Mode: `claude --permission-mode plan` or press Shift+Tab - provides read-only functionality)
- Codex (Use read-only mode: `/approvals` select "Read Only" or `codex --sandbox read-only`)

**Not supported agents:**

- None
