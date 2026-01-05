---
featureName: documentation
subfeatureName: llms-txt
---

Let service authors provide the docs.

Our code relies on many external sources, such as libraries and APIs. Only the service authors truly know how to use them most effectively.

The community has introduced a useful format: [llms-txt](https://llmstxt.org). For example:

- Cloudflare API: https://developers.cloudflare.com/llms-full.txt
- Bun: https://bun.sh/llms-full.txt
- OpenAI: https://cdn.openai.com/API/docs/txt/llms-full.txt
  etc.

However, these files are typically very large and cannot be fully loaded into an LLM's context. Some agents natively support selective inclusion of these files in context.

One approach is RAG (https://en.wikipedia.org/wiki/Retrieval-augmented-generation), which allows the agent to include only the relevant sections from the entire llms-full.txt file as needed.

**Supported agents:**

- Cursor

**Not supported agents:**

- Claude Code
- Codex
- Kilo Code
- Junie
