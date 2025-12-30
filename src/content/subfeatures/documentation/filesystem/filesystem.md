---
featureName: documentation
subfeatureName: filesystem
---

Agents can use filesystem-based documentation files to understand project-specific instructions and context.

Common documentation files include:

- `AGENTS.md` - Standard file placed in the project root to tell the LLM how to use the agents. It acts as system context for each session and can declare tool usage, plan mode steps, file generation instructions, or any custom instructions. More info: https://agents.md/
- `CLAUDE.md` - Claude Code's alternative to AGENTS.md
- `.cursor/rules/` - Cursor's folder for project-specific rules and context. More info: https://cursor.com/docs/context/rules

**Supported agents:**

- Cursor (supports AGENTS.md, CLAUDE.md and .cursor/rules/)
- Claude Code (supports CLAUDE.md)
- Kilo Code (supports AGENTS.md)
- Codex (supports AGENTS.md)
