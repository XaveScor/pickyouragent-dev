---
featureName: documentation
subfeatureName: auto-merge
---

Let the agent pick the right docs for you.

There are many llms-txt files available across the web—for example, https://github.com/SecretiveShell/Awesome-llms-txt.
Users often aren't aware that some of these files exist. Ideally, the agent should be proactive and suggest helpful files. For example:

```
# User request:
Add a new feature to the 'example.astro' file.
```

The agent should suggest including the Astro llms-txt file in the context.

```
# Agent response:
I see you're using the Astro framework. Would you like to add their llms-txt file to your context?
```

**Supported agents:**

- None

**Not supported agents:**

- Cursor
- Claude Code
- Codex
- Kilo Code
- Junie

**Not verified yet:**

- None
