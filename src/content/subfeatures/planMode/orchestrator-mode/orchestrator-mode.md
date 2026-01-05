---
featureName: planMode
subfeatureName: orchestrator-mode
---

Delegate complex tasks to specialized agents.

Plan Mode on steroids. The agent delegates each task to specialized agents, which allows it to achieve:

1. Each agent has only the required context. Previous unrelated history doesn't affect your task. For example, if you run tests in a cycle and have a lot of useless logs in the history, a new agent for the next edit task doesn't see the test logs because they are not needed for editing.
2. You can run agents in parallel if needed, because the orchestrator controls their execution area. For example: parallel fetching of information from the web.

**Supported agents:**

- Kilo Code

**Not supported agents:**

- Cursor
- Codex
- Junie

**Not verified yet:**

- Claude Code
