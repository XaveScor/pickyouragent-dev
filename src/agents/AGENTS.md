# Agents Directory Documentation

## Overview

The `src/agents` directory contains the core data structures and feature definitions for AI agent comparison in the Pick Your Agent project. This directory manages feature sets for different AI coding agents and provides schema validation, data parsing, and aggregation capabilities for comparing agent capabilities.

## Feature and Subfeature File Network

### What is a Feature?

A feature represents a category of functionality that AI coding agents may or may not support. Each feature has:

- A display name (e.g., "Plan Mode", "Documentation")
- A slug identifier used in URLs (e.g., "planmode", "documentation")
- Main and secondary colors for UI display
- Zero or more subfeatures that represent specific capabilities within that category

Features can be simple (like "Commands") or complex with multiple subfeatures (like "Documentation" which includes filesystem, tree, multi-file, etc.).

### How to Find Feature Definitions

Feature definitions are located in the schema file at:

```
src/agents/featureSetSchema.ts
```

To find a feature:

1. Open `src/agents/featureSetSchema.ts`
2. Look for the `featureSetSchema` constant export near the bottom of the file
3. Find the feature object with the desired feature key (e.g., `planMode`, `documentation`, `tools`)
4. The feature's metadata includes: `name`, `mainColor`, `secondaryColor`, and `slug`

### How to Find Subfeature Descriptions

Each subfeature has a detailed markdown description file. The location follows this pattern:

```
src/content/subfeatures/<featureCategory>/<subfeatureName>/<filename>.md[dx]
```

Where:

- `<featureCategory>` matches the feature's slug (e.g., `planmode`, `documentation`, `tools`)
- `<subfeatureName>` matches the subfeature's key as defined in the schema
- `<filename>` matches the subfeature's key (typically the same as subfeatureName)
- Files can have either `.md` or `.mdx` extension

**To locate a subfeature description:**

1. First, find the subfeature in `src/agents/featureSetSchema.ts` by searching for its key
2. Look for the `resolveSubfeature()` call that loads this subfeature (these are at the top of the file, around lines 85-122)
3. The ID passed to `resolveSubfeature()` shows the path structure: `featureCategory/subfeatureName/filename`
4. Navigate to `src/content/subfeatures/` and follow that path structure

**Example:**

If you see this in `src/agents/featureSetSchema.ts`:

```typescript
const dualModelDesc = await resolveSubfeature("planmode/dual-model/dual-model");
```

The description file is located at:

```
src/content/subfeatures/planmode/dual-model/dual-model.md
```

### Example: Looking Up a Subfeature Description

**Goal:** Find the description for the "dual-model" subfeature in the "Plan Mode" feature

**Step 1:** Open `src/agents/featureSetSchema.ts` and search for "dual-model"

You'll find it defined in the planMode feature:

```typescript
planMode: feature(
  {
    name: "Plan Mode",
    mainColor: "#3b82f6",
    secondaryColor: "#60a5fa",
    slug: "planmode",
  },
  {
    "dual-model": subfeature({
      name: "dual-model",
      description: dualModelDesc,
    }),
    // ... other subfeatures
  },
),
```

**Step 2:** Look for where `dualModelDesc` is defined at the top of the file (around line 85):

```typescript
const dualModelDesc = await resolveSubfeature("planmode/dual-model/dual-model");
```

**Step 3:** The ID "planmode/dual-model/dual-model" tells you the path:

- Navigate to `src/content/subfeatures/`
- Follow the path: `planmode/dual-model/dual-model.md`
- Open this file to read the full description, which includes a slogan, detailed explanation, and list of supported/unsupported agents

**Alternative method:** If you don't have access to the TypeScript file, you can:

1. Determine the feature category (Plan Mode → slug: planmode)
2. Determine the subfeature key (dual-model)
3. Navigate to `src/content/subfeatures/planmode/dual-model/dual-model.md`
4. Open the file to read the description

### Feature Categories

The following feature categories are defined in the schema:

| Feature          | Slug             | Main Color | Secondary Color |
| ---------------- | ---------------- | ---------- | --------------- |
| Plan Mode        | planmode         | #3b82f6    | #60a5fa         |
| Documentation    | documentation    | #8b5cf6    | #a78bfa         |
| Tools            | tools            | #06b6d4    | #22d3ee         |
| Commands         | commands         | #10b981    | #34d399         |
| CLI Calling      | cli-calling      | #f97316    | #fb923c         |
| Model Management | model-management | #ec4899    | #f472b6         |

### How to Get Feature Support for an Agent

To find what features an agent supports:

1. Open the agent's feature set file at `src/agents/<agentName>/featureSet.ts`
2. Read the exported agent object created with `declareSchema(meta, features)`
3. The `meta` property contains the agent's `id` and `name`
4. The `features` property maps feature keys to status values

For features with subfeatures, the status is an object mapping subfeature keys to their individual status values. For simple features (like Commands), the status is a single value.

### Example: Finding Claude Code's Feature Support

**Goal:** Find what features Claude Code supports

**Step 1:** Open `src/agents/claudeCode/featureSet.ts`

**Step 2:** Read the exported `claudeCode` object:

```typescript
export const claudeCode = declareSchema(
  {
    id: "claude-code",
    name: "Claude Code",
  },
  {
    planMode: {
      "dual-model": SubFeatureStatus.Supported,
      questions: SubFeatureStatus.NotVerified,
      "plan-editing": SubFeatureStatus.NotVerified,
      "orchestrator-mode": SubFeatureStatus.NotVerified,
    },
    documentation: {
      filesystem: SubFeatureStatus.Supported,
      tree: SubFeatureStatus.Supported,
      // ... more subfeatures
    },
    tools: {
      "web-search-engine": SubFeatureStatus.Supported,
      // ... more subfeatures
    },
    commands: FeatureStatus.Supported,
    cliCalling: {
      // ... subfeature statuses
    },
    modelManagement: {
      filtering: SubFeatureStatus.NotSupported,
    },
  },
);
```

**Step 3:** Interpret the values using the status enums (see Status Values section below):

- Claude Code fully supports Plan Mode's "dual-model" subfeature
- Claude Code's Questions support is not verified
- Commands is fully supported
- Model Management filtering is not supported

## Status Values

### FeatureStatus Enum

Used for simple features that don't have subfeatures.

| Value                | Meaning                                          |
| -------------------- | ------------------------------------------------ |
| `Supported`          | The feature is fully supported                   |
| `PartiallySupported` | The feature is partially supported               |
| `NotSupported`       | The feature is not supported                     |
| `NotVerified`        | The feature support status has not been verified |

### SubFeatureStatus Enum

Used for individual subfeatures within a feature.

| Value                | Meaning                                             |
| -------------------- | --------------------------------------------------- |
| `Supported`          | The subfeature is fully supported                   |
| `PartiallySupported` | The subfeature is partially supported               |
| `NotSupported`       | The subfeature is not supported                     |
| `NotVerified`        | The subfeature support status has not been verified |

## Agent Directories

Each agent has its own directory containing a `featureSet.ts` file that defines the agent's capabilities using the schema.

Each agent directory should also contain an `AGENTS.md` file with a URL to the agent's official documentation. This helps developers quickly find the documentation for each agent.

Available agents:

- `claudeCode/` - Claude Code agent
- `codex/` - Codex agent
- `cursor/` - Cursor agent
- `kiloCode/` - Kilo Code agent

## Core Files

### featureSetSchema.ts

The central schema definition file that establishes the type system for all agent feature sets. Defines the `featureSetSchema` Zod schema, feature and subfeature registries, status enums, and the `declareSchema()` factory function for creating typed agent feature sets.

### allAgents.ts

Central export file that aggregates all agent definitions into a single array. This is the main entry point for accessing all agent feature sets in the application.

### parsedTable.ts

Provides data structures and parsing logic for transforming raw agent feature sets into a structured, queryable format for comparison tables. Includes `ParsedSubfeature`, `ParsedFeature`, and `ParsedTable` classes.

## Usage in the Broader Project

The agents directory integrates with Astro's content collection system:

1. **Subfeature Descriptions**: Each subfeature references a markdown file in `src/content/subfeatures/` via the [`resolveSubfeature()`](src/agents/featureSetSchema.ts:41) function
2. **Content Schema**: The [`src/content/config.ts`](src/content/config.ts:1) defines the `subfeatures` collection with `featureName` and `subfeatureName` frontmatter fields
3. **Markdown Resolution**: At build time, markdown files are resolved and linked to their corresponding subfeature schemas

### Typical Usage Pattern

```typescript
// Import all agents
import { allAgents } from "./agents/allAgents";
import { ParsedTable } from "./agents/parsedTable";

// Create a parsed table for comparison
const table = new ParsedTable(allAgents);

// Get all features
const features = table.getFeatures();

// Get a specific feature
const planMode = table.getFeature("planmode");

// Get subfeatures of a feature
const subfeatures = planMode?.getSubfeatures();
```

## Adding a New Agent

To add a new agent to the system:

1. Create a new directory: `src/agents/<agentName>/`
2. Create `featureSet.ts` with the agent's feature status definitions
3. Import and add the agent to [`allAgents.ts`](src/agents/allAgents.ts:1)
4. The agent will automatically be included in comparisons via the [`ParsedTable`](src/agents/parsedTable.ts:157) class

Example:

```typescript
// src/agents/newAgent/featureSet.ts
import {
  declareSchema,
  FeatureStatus,
  SubFeatureStatus,
} from "../featureSetSchema";

export const newAgent = declareSchema(
  {
    id: "new-agent",
    name: "New Agent",
  },
  {
    planMode: {
      "dual-model": SubFeatureStatus.Supported,
      // ... other subfeatures
    },
    // ... other features
  },
);
```

Then in `allAgents.ts`:

```typescript
import { newAgent } from "./newAgent/featureSet";

export const allAgents: Agent[] = [
  cursor,
  claudeCode,
  codex,
  kiloCode,
  newAgent,
];
```

## Dependencies

- **zod**: Runtime type validation and schema definitions
- **astro:content**: Astro's content collection system for markdown files

## Related Files

- [`src/content/config.ts`](src/content/config.ts:1) - Content collection schema definitions
- [`src/components/ComparisonTable.astro`](src/components/ComparisonTable.astro) - UI component for displaying agent comparisons
- [`src/components/CategoryRow.astro`](src/components/CategoryRow.astro) - UI component for displaying feature categories
