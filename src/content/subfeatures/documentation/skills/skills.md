---
featureName: documentation
subfeatureName: skills
---

Smart inclusion of relevant docs.

Sometimes you have a lot of local docs, but you don't need all of them. For example:

```
root
├── .cursor
│   └── rules
│       └── deploy.mdc // describes how to deploy the project
│       └── lint.mdc // describes how to lint the project
│       └── test.mdc // describes how to test the project
```

If you want only to tune the deployment process, you don't need to include the lint and test docs into the context.

Read more about the standard: https://agentskills.io/home

**Supported agents:**

- Cursor

**Not verified yet:**

- Codex
- Claude Code
