---
featureName: planMode
subfeatureName: todos
---

Track progress with auto-generated task lists.

You have to generate todo-list before plan execution to move the progress tracking from the model to your agent.
It is useful for complex features because a model has no chance to skip any required step in the plan.

**How it works:**

When you build a plan and click execute. The agent creates a numbered list of subtasks that need to be completed. Each todo item represents a specific action or milestone in the implementation. As the agent executes the plan, it marks items as complete, giving you real-time visibility into progress.

**Why it matters:**

- Agent forces a model to follow the plan step by step;
- Agent can run some steps by himself without calling the model. For example: tests. If they are green, the agent don't need to include the result into the context;
- Clear visibility into what's been completed;
- Easier to review and approve before execution;
- Agent can create checkpoints between steps for easy rollback if needed. You don't need rollback all the work if some step was finished incorrectly.

**Supported agents:**

- Claude Code (creates todos automatically when you execute a plan)
- Cursor (creates todos automatically when you build a plan)

**Partially supported agents:**

- Kilo Code (you need to explicitly ask it to create todos; not automatic. I recommend to write "create todos and execute" for Architect mode implementation)
- OpenCode (you need to explicitly ask it to create todos; not automatic. I recommend to write "create todos and execute" for plan execution)

**Not supported agents:**

- Codex (plan mode not implemented)
- Junie (plan mode not implemented)
