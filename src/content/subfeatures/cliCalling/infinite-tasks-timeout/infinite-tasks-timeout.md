---
featureName: cliCalling
subfeatureName: infinite-tasks-timeout
---

Stop runaway commands before they consume your resources.

The agent lets you set a timeout for commands. This helps automatically stop commands that might run forever, like a development server.

For example:

```
devserver | head -50
```

**Supported agents:**

None

**Not supported agents:**

- Cursor
- Kilo Code
- Codex
- Junie

**Not verified yet:**

- Claude Code
