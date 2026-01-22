# Agent-Specific Subfeature Files

This directory contains markdown files that provide agent-specific details for subfeatures. These files are rendered in the agent tabs within the subfeature detail pages.

## Prerequisite Reading

Read the info inside `/src/agents/AGENTS.md` and `/src/content/subfeatures/AGENTS.md` first to understand the system.

## Purpose

Agent-specific subfeature files allow you to provide detailed, per-agent information about how a specific agent implements or handles a particular subfeature. This content is displayed in the agent's tab on the subfeature detail page.

## File Structure

Files follow this pattern:

```
src/content/agent-subfeatures/<agentId>/<featureName>/<subfeatureName>.mdx
```

Where:

- `<agentId>` - The agent's ID from its featureSet.ts (e.g., `claude-code`, `cursor`, `kilo-code`)
- `<featureName>` - The parent feature category (e.g., `planmode`, `documentation`, `tools`)
- `<subfeatureName>` - The subfeature slug (e.g., `dual-model`, `filesystem`)

## Frontmatter

Every agent-specific subfeature file must include the following frontmatter:

```yaml
---
agentId: <agent-id>
featureName: <feature-category>
subfeatureName: <subfeature-slug>
---
```

- **agentId**: The agent's ID (must match the `id` from the agent's `featureSet.ts`)
- **featureName**: The parent feature category
- **subfeatureName**: The subfeature slug (must match the key used in the schema)

## Content Guidelines

The content should focus on:

1. **Agent-specific implementation details** - How this particular agent handles the feature
2. **Unique capabilities** - Any special or unique aspects of this agent's implementation
3. **Limitations or caveats** - Known issues or things to be aware of
4. **Configuration options** - If applicable, how to configure or enable the feature
5. **Examples** - Code examples or use cases specific to this agent

## Linking to Agent Feature Sets

To use an agent-specific subfeature file, you need to reference it in the agent's `featureSet.ts` by adding a `detailsId` to the status cell:

```typescript
// src/agents/my-agent/featureSet.ts
import { Status, statusCell } from "../cells";

export const myAgent = declareSchema(
  {
    id: "my-agent",
    name: "My Agent",
  },
  {
    planMode: {
      "dual-model": statusCell(
        Status.Supported,
        "my-agent/planmode/dual-model",
      ),
      //                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      //                                  This references the file:
      //                                  src/content/agent-subfeatures/my-agent/planmode/dual-model.mdx
    },
  },
);
```

Note: You'll need to update the `statusCell` function to accept an optional second parameter for `detailsId`, or construct the cell object directly.

## When to Use Agent-Specific Files

You should create an agent-specific subfeature file when:

1. An agent has a unique or interesting implementation of a subfeature
2. You need to explain specific configuration or usage details for this agent
3. The agent has known limitations or caveats that users should be aware of
4. The agent offers additional capabilities beyond the standard implementation

You don't need to create files for:

- Agents that don't support the subfeature at all
- Simple implementations that match the standard description
- Features with nothing special to note

## Example

````markdown
---
agentId: claude-code
featureName: planmode
subfeatureName: dual-model
---

Claude Code supports dual-model configuration through the model selector in the settings panel. You can choose separate models for planning and execution phases.

**How to configure:**

1. Open the Claude Code settings
2. Navigate to the "Models" section
3. Select your preferred planning model (e.g., Claude 3.5 Sonnet)
4. Select your preferred execution model (e.g., Claude 3 Haiku for cost efficiency)

**Recommendations:**

- Use a more capable model (Sonnet) for planning to ensure high-quality task breakdown
- Use a faster/cheaper model (Haiku) for execution to reduce costs
- The planning model determines the quality of your task breakdown
- The execution model affects how well individual tasks are completed

**Example workflow:**

```typescript
// In planning mode (Claude 3.5 Sonnet):
"Build a REST API with Express";

// Generates detailed steps and task list

// In execution mode (Claude 3 Haiku):
// Each task is executed efficiently using the plan from above
```
````

```

## Best Practices

1. **Keep agent IDs consistent** - Use the same `agentId` that appears in the agent's `featureSet.ts`
2. **Match file paths to detailsId** - Ensure the `detailsId` in `featureSet.ts` matches the file path structure
3. **Be specific and practical** - Focus on actionable information users can apply
4. **Include examples** - Code snippets, screenshots, or step-by-step guides
5. **Stay current** - Keep agent-specific files updated as agents evolve
6. **Test links** - Ensure all references and links in your markdown are correct

## Complete Example Workflow

1. **Create the agent-specific file:**
```

src/content/agent-subfeatures/claude-code/planmode/dual-model.mdx

````

2. **Add frontmatter and content:**
```markdown
---
agentId: claude-code
featureName: planmode
subfeatureName: dual-model
---

Claude Code's dual-model implementation...
````

3. **Update the agent's featureSet.ts:**

   ```typescript
   "dual-model": statusCell(Status.Supported, "claude-code/planmode/dual-model"),
   ```

4. **Build and verify:**

   ```bash
   pnpm build
   ```

5. **Test in the UI:**
   - Navigate to the subfeature detail page
   - Click on the agent's tab
   - Verify the agent-specific content appears correctly
