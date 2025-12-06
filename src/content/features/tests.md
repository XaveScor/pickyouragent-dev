---
title: Tests
description: Features related to test generation, CI integration, and development tooling
categoryKey: tests
---

# Tests

Testing capabilities help ensure code quality by automating test creation and integrating with your existing development workflow.

## Test Generation

Test generation allows the agent to automatically create unit tests, integration tests, or other test types for the code it writes or existing code in your project.

**Why it matters:**
- Saves time on writing boilerplate test code
- Ensures new features have test coverage
- Can identify edge cases you might miss

**Capabilities vary:** Some agents generate basic happy-path tests, while more advanced ones create comprehensive suites covering edge cases, error conditions, and boundary values.

## Integrates with CI

CI integration means the agent can work with your continuous integration pipeline, running tests, checking builds, and responding to CI feedback.

**Why it matters:**
- Catches issues before they reach main branch
- Agent can iterate based on CI failures
- Maintains your existing quality gates

**How it works:** The agent monitors CI status, interprets failure messages, and can automatically attempt fixes when tests or builds fail.

## Editor Plugins Available

Editor plugin availability indicates whether the agent offers extensions or plugins for popular code editors like VS Code, JetBrains IDEs, Vim, or Emacs.

**Why it matters:**
- Enables use within your familiar environment
- Reduces context switching
- Often provides better UX than web interfaces

**Common integrations:** Most agents prioritize VS Code support, with varying levels of functionality in other editors. Features may differ between editor plugins and web/CLI versions.

