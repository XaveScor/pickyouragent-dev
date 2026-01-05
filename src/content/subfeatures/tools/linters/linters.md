---
featureName: tools
subfeatureName: linters
---

Code fixes, automated by agents.

Linters look for mistakes and style problems in your code. Agents can use these tools to find and fix issues without you doing it by hand or using extra tokens.

You could make your own skill (see [partial/skills page](/features/documentation#skills)), but that uses more context and tokens. Agents can get a list of errors and fix them directly, without needing an AI model. This way is faster, cheaper, and more reliable.

**Supported agents:**

- Cursor (partial support): You can install plugins for your linter—such as ESLint, TypeScript, etc.—and Cursor will detect errors directly, without consuming tokens. However, it cannot run `--autofix` to automatically fix issues; instead, it uses the selected model to resolve the errors.

**Not supported agents:**

- Codex
- Kilo Code
- Junie

**Not verified yet:**

- Claude Code
