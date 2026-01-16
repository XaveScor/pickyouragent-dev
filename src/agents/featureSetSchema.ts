import { z } from "zod";
import { getEntry, getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export enum SubFeatureStatus {
  Supported = "supported",
  PartiallySupported = "partially-supported",
  NotSupported = "not-supported",
  NotVerified = "not-verified",
}

export enum FeatureStatus {
  Supported = "supported",
  PartiallySupported = "partially-supported",
  NotSupported = "not-supported",
  NotVerified = "not-verified",
}

export type SubscriptionLink = {
  label: string;
  url: string;
};

type FeatureMeta = {
  name: string;
  mainColor: string;
  secondaryColor: string;
  slug?: string;
};

type SubfeatureMeta = {
  name: string;
  description: CollectionEntry<"subfeatures">;
};

export const featuresRegistry = z.registry<FeatureMeta>();
export const subfeaturesRegistry = z.registry<SubfeatureMeta>();

/**
 * Resolves a subfeature by its collection ID.
 * ID should be the path relative to the collection base without extension (e.g., 'planmode/dual-model/dual-model').
 * Throws an error if the entry does not exist, failing the build.
 *
 * Note: This function must be called at the top level with await for Astro's static analysis.
 */
export async function resolveSubfeature(
  id: string,
): Promise<CollectionEntry<"subfeatures">> {
  // Use getCollection and find by ID to ensure entries are processed the same way
  // as they were with the old implementation
  const allEntries = await getCollection("subfeatures");
  const entry = allEntries.find((e) => e.id === id);

  if (!entry) {
    const availableIds = allEntries.map((e) => e.id).join("\n  ");
    throw new Error(
      `Subfeature entry not found: ${id}\n\nAvailable IDs:\n  ${availableIds}`,
    );
  }

  return entry;
}

function subfeature(config: {
  name: string;
  description: CollectionEntry<"subfeatures">;
}) {
  const subfeatureSchema = z.enum(SubFeatureStatus);
  // Type assertion to work around Astro version compatibility issue with render() method signature
  subfeaturesRegistry.add(subfeatureSchema, {
    name: config.name,
    description: config.description as any,
  });
  return subfeatureSchema;
}

function feature<T extends Record<string, z.ZodType>>(
  meta: FeatureMeta,
  subfeatures: T,
) {
  const subfeaturesSchema = z.object(subfeatures);
  const linksSchema = z.array(
    z.object({
      label: z.string(),
      url: z.string().url(),
    }),
  );
  const featureSchema = z.union([
    z.nativeEnum(FeatureStatus),
    subfeaturesSchema,
    linksSchema,
  ]);
  featuresRegistry.add(featureSchema, meta);
  return featureSchema;
}

const dualModelDesc = await resolveSubfeature("planmode/dual-model/dual-model");
const questionsDesc = await resolveSubfeature("planmode/questions/questions");
const planEditingDesc = await resolveSubfeature(
  "planmode/plan-editing/plan-editing",
);
const orchestratorModeDesc = await resolveSubfeature(
  "planmode/orchestrator-mode/orchestrator-mode",
);
const todosDesc = await resolveSubfeature("planmode/todos/todos");
const filesystemDesc = await resolveSubfeature(
  "documentation/filesystem/filesystem",
);
const treeDesc = await resolveSubfeature("documentation/tree/tree");
const multiFileDesc = await resolveSubfeature(
  "documentation/multi-file/multi-file",
);
const llmsTxtDesc = await resolveSubfeature("documentation/llms-txt/llms-txt");
const autoMergeDesc = await resolveSubfeature(
  "documentation/auto-merge/auto-merge",
);
const skillsDesc = await resolveSubfeature("documentation/skills/skills");
const webToDocsDesc = await resolveSubfeature(
  "documentation/web-to-docs/web-to-docs",
);
const webSearchEngineDesc = await resolveSubfeature(
  "tools/web-search-engine/web-search-engine",
);
const fetchDataDesc = await resolveSubfeature("tools/fetch-data/fetch-data");
const browserDesc = await resolveSubfeature("tools/browser/browser");
const lintersDesc = await resolveSubfeature("tools/linters/linters");
const cliCallingInfiniteTasksTimeoutDesc = await resolveSubfeature(
  "clicalling/infinite-tasks-timeout/infinite-tasks-timeout",
);
const cliCallingProcessesExplorerDesc = await resolveSubfeature(
  "clicalling/processes-explorer/processes-explorer",
);
const modelManagementFilteringDesc = await resolveSubfeature(
  "modelmanagement/filtering/filtering",
);
const modelManagementRegionTuningDesc = await resolveSubfeature(
  "modelmanagement/region-tuning/region-tuning",
);
const agentModeDebugDesc = await resolveSubfeature("agentmode/debug/debug");
const agentModeAskDesc = await resolveSubfeature("agentmode/ask/ask");

export const featureSetSchema = z.object({
  subscriptions: feature(
    {
      name: "Subscriptions",
      mainColor: "#f43f5e",
      secondaryColor: "#fb7185",
      slug: "subscriptions",
    },
    {},
  ),
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
      questions: subfeature({
        name: "questions",
        description: questionsDesc,
      }),
      "plan-editing": subfeature({
        name: "plan-editing",
        description: planEditingDesc,
      }),
      "orchestrator-mode": subfeature({
        name: "orchestrator-mode",
        description: orchestratorModeDesc,
      }),
      todos: subfeature({
        name: "todos",
        description: todosDesc,
      }),
    },
  ),
  documentation: feature(
    {
      name: "Documentation",
      mainColor: "#8b5cf6",
      secondaryColor: "#a78bfa",
      slug: "documentation",
    },
    {
      filesystem: subfeature({
        name: "filesystem-documentation",
        description: filesystemDesc,
      }),
      tree: subfeature({
        name: "hierarchical-tree",
        description: treeDesc,
      }),
      "multi-file": subfeature({
        name: "multi-file",
        description: multiFileDesc,
      }),
      "llms-txt": subfeature({
        name: "llms-txt",
        description: llmsTxtDesc,
      }),
      "auto-merge": subfeature({
        name: "auto-merge",
        description: autoMergeDesc,
      }),
      skills: subfeature({
        name: "Partial/Skills.md",
        description: skillsDesc,
      }),
      "web-to-docs": subfeature({
        name: "web-to-docs",
        description: webToDocsDesc,
      }),
    },
  ),
  tools: feature(
    {
      name: "Tools",
      mainColor: "#06b6d4",
      secondaryColor: "#22d3ee",
      slug: "tools",
    },
    {
      "web-search-engine": subfeature({
        name: "web-search-engine",
        description: webSearchEngineDesc,
      }),
      "fetch-data": subfeature({
        name: "fetch-data",
        description: fetchDataDesc,
      }),
      browser: subfeature({
        name: "browser",
        description: browserDesc,
      }),
      linters: subfeature({
        name: "linters",
        description: lintersDesc,
      }),
    },
  ),
  commands: feature(
    {
      name: "Commands",
      mainColor: "#10b981",
      secondaryColor: "#34d399",
      slug: "commands",
    },
    {},
  ),
  cliCalling: feature(
    {
      name: "CLI Calling",
      mainColor: "#f97316",
      secondaryColor: "#fb923c",
      slug: "cli-calling",
    },
    {
      "infinite-tasks-timeout": subfeature({
        name: "infinite-tasks-timeout",
        description: cliCallingInfiniteTasksTimeoutDesc,
      }),
      "processes-explorer": subfeature({
        name: "processes-explorer",
        description: cliCallingProcessesExplorerDesc,
      }),
    },
  ),
  modelManagement: feature(
    {
      name: "Model management",
      mainColor: "#ec4899",
      secondaryColor: "#f472b6",
      slug: "model-management",
    },
    {
      filtering: subfeature({
        name: "filtering",
        description: modelManagementFilteringDesc,
      }),
      "region-tuning": subfeature({
        name: "region-tuning",
        description: modelManagementRegionTuningDesc,
      }),
    },
  ),
  agentMode: feature(
    {
      name: "Agent Mode",
      mainColor: "#ef4444",
      secondaryColor: "#f87171",
      slug: "agent-mode",
    },
    {
      debug: subfeature({
        name: "debug",
        description: agentModeDebugDesc,
      }),
      ask: subfeature({
        name: "ask",
        description: agentModeAskDesc,
      }),
    },
  ),
});

type AgentMeta = {
  id: string;
  name: string;
};
export const agentRegistry = z.registry<AgentMeta>();
export function declareSchema<T extends z.infer<typeof featureSetSchema>>(
  meta: AgentMeta,
  features: T,
) {
  return {
    meta,
    features: featureSetSchema.parse(features),
  };
}

export type Agent = ReturnType<typeof declareSchema>;
