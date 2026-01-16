---
featureName: remoteDevelopment
subfeatureName: internet-connection
---

Control how the agent accesses the network.

Configure network access levels for security and compliance. Options include no internet (air-gapped), limited access (allowlisted domains), or full internet access. Perfect for environments with strict network policies or when working offline.

**Supported agents:**

- Claude Code (configurable network access: None/Limited/Full - https://code.claude.com/docs/en/network-config)
- Codex (configurable domain allowlist, access levels - https://developers.openai.com/codex/cloud/internet-access)
- OpenCode (proxy environment variables, custom certificates - https://opencode.ai/docs/network/)

**Partially supported agents:**

- Kilo Code (offline access supported with local models, but no network configuration controls documented for cloud models)

**Not verified yet:**

- Cursor
- Junie
