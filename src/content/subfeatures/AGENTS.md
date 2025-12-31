# Subfeature File Structure

This document describes the structure and format of subfeature markdown files in the `src/content/subfeatures/` directory.

## File Structure

Each subfeature file follows a consistent markdown format with frontmatter metadata and organized content sections.

## Frontmatter

Every subfeature file must include the following frontmatter at the top:

```yaml
---
featureName: <feature-category>
subfeatureName: <subfeature-slug>
---
```

- **featureName**: The parent feature category (e.g., `cliCalling`, `documentation`, `modelManagement`, `planMode`, `tools`)
- **subfeatureName**: The unique slug identifier for this subfeature (must match the directory name)

## Content Sections

### 1. Short Beautiful English Slogan

A catchy one-line slogan that captures the essence of the subfeature. This should be concise, memorable, and immediately convey the value proposition.

**Example:**
> Find the missing information in the web.

### 2. Description

A detailed explanation of what the subfeature does. This section should provide context, explain the functionality, and help users understand when and how to use this feature. You may include code examples or use cases to illustrate the feature.

**Example:**
> It's better when the agent verifies things on the web for you. The agent can search the internet to find current information, verify facts, and gather data that isn't available in your local codebase.

### 3. Supported Agents List

A list of agents that fully support this subfeature. These agents have been tested and confirmed to work correctly with this feature.

**Format:**
```markdown
**Supported agents:**

- Agent Name
- Another Agent
```

Optionally, you can add additional information in parentheses to provide context about how each agent supports the feature, what specific implementations they use, or any relevant notes about their support:

```markdown
**Supported agents:**

- Agent Name (additional details about support)
- Another Agent (specific implementation notes)
```

### 4. Unsupported Agents List

A list of agents that do not support this subfeature. These agents either lack the functionality or have known incompatibilities.

**Format:**
```markdown
**Not supported agents:**

- Agent Name
- Another Agent
```

Optionally, you can add additional information in parentheses to explain why an agent doesn't support the feature, what limitations exist, or any relevant context about the lack of support:

```markdown
**Not supported agents:**

- Agent Name (reason for lack of support)
- Another Agent (known limitations)
```

### 5. Not Verified Agents List

A list of agents where the support status hasn't been verified yet. These agents may or may not support the feature, but testing is incomplete.

**Format:**
```markdown
**Not verified yet:**

- Agent Name
- Another Agent
```

Optionally, you can add additional information in parentheses to provide context about the verification status, what testing has been done, or any notes about why verification is pending:

```markdown
**Not verified yet:**

- Agent Name (testing status or notes)
- Another Agent (pending verification details)
```

## Available Agents

The following agents are tracked in the system:

- **Claude Code** - Anthropic's Claude-based coding assistant
- **Codex** - OpenAI's Codex-powered agent
- **Cursor** - Cursor AI-powered editor
- **Kilo Code** - Kilo Code's AI assistant

## Complete Example

Here is a complete example of a subfeature file:

```markdown
---
featureName: tools
subfeatureName: web-search-engine
---

Find the missing information in the web.

It's better when the agent verifies things on the web for you. The agent can search the internet to find current information, verify facts, and gather data that isn't available in your local codebase.

**Supported agents:**

- Claude Code (native web search integration)
- Codex (via web browsing tool)
- Cursor (built-in web search capabilities)

**Not supported agents:**

- Kilo Code (no web search functionality)
```

## Another Example with All Sections

```markdown
---
featureName: cliCalling
subfeatureName: infinite-tasks-timeout
---

Stop runaway commands before they consume your resources.

The agent lets you set a timeout for commands. This helps automatically stop commands that might run forever, like a development server. This is particularly useful when you need to run long-running operations but want to prevent them from hanging indefinitely.

For example:

```
devserver | head -50
```

This command will run the development server but automatically stop after capturing the first 50 lines of output.

**Supported agents:**

- None

**Not supported agents:**

- Kilo Code (commands run indefinitely)
- Cursor (no timeout mechanism available)

**Not verified yet:**

- Claude Code (testing in progress)
- Codex (needs verification)
```

## Best Practices

1. **Keep slogans short** - Aim for 5-10 words maximum
2. **Be descriptive** - The description should clearly explain the feature's purpose and use cases
3. **Use code examples** - When applicable, include code snippets to illustrate usage
4. **Verify agent support** - Only list agents as "supported" after thorough testing
5. **Keep lists up to date** - Regularly update agent support status as features evolve
6. **Match directory names** - Ensure `subfeatureName` in frontmatter matches the directory name exactly
7. **Add optional agent-specific details** - Optionally include additional information in parentheses for each agent to provide context about their specific implementation, limitations, or support details. This is optional but can be helpful for clarity

## File Naming Convention

- Files should be named using kebab-case: `subfeature-name.md`
- The filename should match the `subfeatureName` in the frontmatter
- Directory structure: `src/content/subfeatures/<featureName>/<subfeatureName>/<subfeatureName>.md`
