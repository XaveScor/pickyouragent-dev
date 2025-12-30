# Agents Directory Documentation

## Overview

The `src/agents` directory contains the core data structures and feature definitions for AI agent comparison in the Pick Your Agent project. This directory manages feature sets for different AI coding agents (Claude Code, Codex, Cursor, Kilo Code) and provides schema validation, data parsing, and aggregation capabilities for comparing agent capabilities.

## Directory Structure

```
src/agents/
├── featureSetSchema.ts    # Core schema definitions and types
├── allAgents.ts           # Central export of all agent definitions
├── parsedTable.ts         # Table parsing and aggregation logic
├── claudeCode/
│   └── featureSet.ts      # Claude Code agent feature set
├── codex/
│   └── featureSet.ts      # Codex agent feature set
├── cursor/
│   └── featureSet.ts      # Cursor agent feature set
└── kiloCode/
    └── featureSet.ts      # Kilo Code agent feature set
```

## Core Files

### featureSetSchema.ts

The central schema definition file that establishes the type system for all agent feature sets.

#### Key Exports

| Export | Type | Description |
|--------|------|-------------|
| [`SubFeatureStatus`](src/agents/featureSetSchema.ts:5) | Enum | Status values for subfeatures: `Supported`, `PartiallySupported`, `NotSupported`, `NotVerified` |
| [`FeatureStatus`](src/agents/featureSetSchema.ts:12) | Enum | Status values for features: `Supported`, `PartiallySupported`, `NotSupported`, `NotVerified` |
| [`featureSetSchema`](src/agents/featureSetSchema.ts:101) | ZodSchema | Main schema defining all feature categories and subfeatures |
| [`declareSchema()`](src/agents/featureSetSchema.ts:207) | Function | Factory function to create typed agent feature sets |
| [`Agent`](src/agents/featureSetSchema.ts:214) | Type | Type alias for agent objects with meta and features |

#### Key Functions

**[`resolveSubfeature(id: string)`](src/agents/featureSetSchema.ts:42)**

Resolves a subfeature by its collection ID from the `subfeatures` collection. The function:

- Expects ID format: `<featureName>/<subFeatureName>/<filename>` (path relative to collection base without extension)
- Uses `getEntry()` to directly retrieve the entry by ID
- Throws descriptive errors if the entry is not found
- Must be called at the top level with `await` for Astro's static analysis

**[`feature(meta, subfeatures)`](src/agents/featureSetSchema.ts:73)**

Creates a feature schema that can be either a simple status enum or an object of subfeature statuses.

**[`subfeature(config)`](src/agents/featureSetSchema.ts:66)**

Creates a subfeature schema with a status enum and registers its metadata.

#### Feature Categories

The schema defines 5 main feature categories:

| Category | Slug | Main Color | Description |
|----------|------|------------|-------------|
| **Plan Mode** | `planmode` | #3b82f6 | Planning and strategy features |
| **Documentation** | `documentation` | #8b5cf6 | Code documentation capabilities |
| **Tools** | `tools` | #06b6d4 | External tool integrations |
| **Commands** | `commands` | #10b981 | Command execution features |
| **CLI Calling** | `cli-calling` | #f97316 | CLI command invocation |

#### Subfeatures by Category

**Plan Mode:**
- `dual-model` - Dual model planning
- `questions` - Interactive questions
- `plan-editing` - Plan editing capabilities

**Documentation:**
- `filesystem` - Filesystem documentation
- `tree` - Hierarchical tree view
- `multi-file` - Multi-file documentation
- `llms-txt` - LLMs.txt format support
- `auto-merge` - Automatic merging
- `skills` - Skills.md partial files
- `web-to-docs` - Web to documentation conversion

**Tools:**
- `web-search-engine` - Web search capabilities
- `fetch-data` - Data fetching
- `browser` - Browser automation
- `linters` - Linter integrations

**CLI Calling:**
- `infinite-tasks-timeout` - Task timeout handling
- `processes-explorer` - Process exploration

---

### allAgents.ts

Central export file that aggregates all agent definitions into a single array.

```typescript
export const allAgents: Agent[] = [cursor, claudeCode, codex, kiloCode];
```

This file is the main entry point for accessing all agent feature sets in the application.

---

### parsedTable.ts

Provides data structures and parsing logic for transforming raw agent feature sets into a structured, queryable format for comparison tables.

#### Key Classes

**[`ParsedSubfeature`](src/agents/parsedTable.ts:89)**

Represents a single subfeature with its status across all agents.

| Property | Type | Description |
|----------|------|-------------|
| `key` | string | The subfeature key (e.g., "dual-model") |
| `name` | string | Display name (formatted from key) |
| `slug` | string | URL-friendly identifier |
| `statusByAgent` | Map<string, SubFeatureStatus> | Status for each agent (keyed by agent ID) |
| `aggregatedStatus` | FeatureStatus | Overall status aggregated across all agents |
| `description` | CollectionEntry<'subfeatures'> | Markdown content describing the subfeature |

**[`ParsedFeature`](src/agents/parsedTable.ts:116)**

Represents a feature category with its subfeatures.

| Property | Type | Description |
|----------|------|-------------|
| `key` | string | The feature key (e.g., "planMode") |
| `name` | string | Display name |
| `slug` | string | URL-friendly identifier |
| `mainColor` | string | Primary color for UI display |
| `secondaryColor` | string | Secondary color for UI display |
| `subfeatures` | ParsedSubfeature[] | Array of subfeatures |
| `aggregatedStatus` | FeatureStatus | Overall status across all agents |
| `statusByAgent` | Map<string, FeatureStatus> | Status for each agent |

**Methods:**
- [`getSubfeatures()`](src/agents/parsedTable.ts:148) - Returns all subfeatures
- [`getSubfeature(slug)`](src/agents/parsedTable.ts:152) - Finds a subfeature by slug or key

**[`ParsedTable`](src/agents/parsedTable.ts:157)**

The main class that parses all agent feature sets into a structured table format.

| Property | Type | Description |
|----------|------|-------------|
| `features` | ParsedFeature[] | All parsed features |
| `agents` | Agent[] | Reference to original agent data |

**Methods:**
- [`getFeatures()`](src/agents/parsedTable.ts:166) - Returns all features
- [`getFeature(slug)`](src/agents/parsedTable.ts:170) - Finds a feature by slug or key
- [`getFeatureByKey(key)`](src/agents/parsedTable.ts:174) - Finds a feature by exact key

#### Helper Functions

**[`formatDisplayName(key: string)`](src/agents/parsedTable.ts:13)**

Converts kebab-case keys to display names (e.g., "dual-model" → "Dual Model").

**[`aggregateSubfeatureStatuses(statuses)`](src/agents/parsedTable.ts:26)**

Aggregates multiple subfeature statuses into a single feature status:
- All `Supported` → `Supported`
- All `NotVerified` → `NotVerified`
- All `NotSupported` → `PartiallySupported` (not `NotSupported`)
- Mixed → `PartiallySupported`

**[`aggregateFeatureStatuses(statuses)`](src/agents/parsedTable.ts:50)**

Aggregates multiple feature statuses:
- All `Supported` → `Supported`
- All `NotVerified` → `NotVerified`
- All `NotSupported` → `NotSupported`
- Mixed → `PartiallySupported`

---

## Agent Feature Sets

Each agent has its own directory containing a `featureSet.ts` file that defines the agent's capabilities using the schema.

### claudeCode/featureSet.ts

Defines the feature set for Claude Code agent.

| Feature | Status |
|---------|--------|
| Plan Mode - dual-model | Supported |
| Plan Mode - questions | Not Supported |
| Plan Mode - plan-editing | Not Supported |
| Documentation - tree | Supported |
| Documentation - filesystem | Not Supported |
| Documentation - multi-file | Not Supported |
| Documentation - llms-txt | Not Supported |
| Documentation - auto-merge | Not Supported |
| Documentation - skills | Not Verified |
| Documentation - web-to-docs | Not Supported |
| Tools - web-search-engine | Supported |
| Tools - fetch-data | Supported |
| Tools - browser | Not Verified |
| Tools - linters | Not Verified |
| Commands | Supported |
| CLI Calling - infinite-tasks-timeout | Not Verified |
| CLI Calling - processes-explorer | Not Verified |

### codex/featureSet.ts

Defines the feature set for Codex agent.

| Feature | Status |
|---------|--------|
| Plan Mode - dual-model | Not Supported |
| Plan Mode - questions | Not Supported |
| Plan Mode - plan-editing | Not Supported |
| Documentation - filesystem | Supported |
| Documentation - tree | Not Supported |
| Documentation - multi-file | Not Supported |
| Documentation - llms-txt | Not Supported |
| Documentation - auto-merge | Not Supported |
| Documentation - skills | Not Verified |
| Documentation - web-to-docs | Not Supported |
| Tools - web-search-engine | Supported |
| Tools - fetch-data | Not Supported |
| Tools - browser | Not Supported |
| Tools - linters | Not Supported |
| Commands | Supported |
| CLI Calling - infinite-tasks-timeout | Not Verified |
| CLI Calling - processes-explorer | Not Verified |

### cursor/featureSet.ts

Defines the feature set for Cursor agent.

| Feature | Status |
|---------|--------|
| Plan Mode - dual-model | Not Supported |
| Plan Mode - questions | Supported |
| Plan Mode - plan-editing | Supported |
| Documentation - filesystem | Supported |
| Documentation - tree | Supported |
| Documentation - multi-file | Supported |
| Documentation - llms-txt | Supported |
| Documentation - auto-merge | Not Supported |
| Documentation - skills | Supported |
| Documentation - web-to-docs | Supported |
| Tools - web-search-engine | Supported |
| Tools - fetch-data | Not Supported |
| Tools - browser | Partially Supported |
| Tools - linters | Partially Supported |
| Commands | Supported |
| CLI Calling - infinite-tasks-timeout | Not Supported |
| CLI Calling - processes-explorer | Not Supported |

### kiloCode/featureSet.ts

Defines the feature set for Kilo Code agent.

| Feature | Status |
|---------|--------|
| Plan Mode - dual-model | Supported |
| Plan Mode - questions | Supported |
| Plan Mode - plan-editing | Not Supported |
| Documentation - filesystem | Supported |
| Documentation - tree | Not Verified |
| Documentation - multi-file | Not Verified |
| Documentation - llms-txt | Not Verified |
| Documentation - auto-merge | Not Verified |
| Documentation - skills | Not Verified |
| Documentation - web-to-docs | Not Verified |
| Tools - web-search-engine | Not Supported |
| Tools - fetch-data | Not Verified |
| Tools - browser | Not Verified |
| Tools - linters | Not Verified |
| Commands | Not Verified |
| CLI Calling - infinite-tasks-timeout | Not Supported |
| CLI Calling - processes-explorer | Not Supported |

---

## Usage in the Broader Project

### Integration with Astro Content System

The agents directory integrates with Astro's content collection system:

1. **Subfeature Descriptions**: Each subfeature references a markdown file in `src/content/subfeatures/` via the [`resolveSubfeature()`](src/agents/featureSetSchema.ts:42) function
2. **Content Schema**: The [`src/content/config.ts`](src/content/config.ts:1) defines the `subfeatures` collection with `featureName` and `subfeatureName` frontmatter fields
3. **Markdown Resolution**: At build time, markdown files are resolved and linked to their corresponding subfeature schemas

### Typical Usage Pattern

```typescript
// Import all agents
import { allAgents } from './agents/allAgents';
import { ParsedTable } from './agents/parsedTable';

// Create a parsed table for comparison
const table = new ParsedTable(allAgents);

// Get all features
const features = table.getFeatures();

// Get a specific feature
const planMode = table.getFeature('planmode');

// Get subfeatures of a feature
const subfeatures = planMode?.getSubfeatures();
```

### Data Flow

```
Agent Feature Sets (featureSet.ts files)
         ↓
    allAgents.ts (aggregation)
         ↓
    ParsedTable (parsing & aggregation)
         ↓
    UI Components (ComparisonTable, CategoryRow)
```

---

## Adding a New Agent

To add a new agent to the system:

1. Create a new directory: `src/agents/<agentName>/`
2. Create `featureSet.ts` with the agent's feature status definitions
3. Import and add the agent to [`allAgents.ts`](src/agents/allAgents.ts:1)
4. The agent will automatically be included in comparisons via the [`ParsedTable`](src/agents/parsedTable.ts:157) class

Example:

```typescript
// src/agents/newAgent/featureSet.ts
import { declareSchema, FeatureStatus, SubFeatureStatus } from "../featureSetSchema";

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

---

## Status Values

| Status | Meaning |
|--------|---------|
| `Supported` | The feature/subfeature is fully supported |
| `PartiallySupported` | The feature/subfeature is partially supported |
| `NotSupported` | The feature/subfeature is not supported |
| `NotVerified` | The feature/subfeature support status has not been verified |

---

## Dependencies

- **zod**: Runtime type validation and schema definitions
- **astro:content**: Astro's content collection system for markdown files

---

## Related Files

- [`src/content/config.ts`](src/content/config.ts:1) - Content collection schema definitions
- [`src/components/ComparisonTable.astro`](src/components/ComparisonTable.astro) - UI component for displaying agent comparisons
- [`src/components/CategoryRow.astro`](src/components/CategoryRow.astro) - UI component for displaying feature categories
