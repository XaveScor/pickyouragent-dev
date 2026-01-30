import { compileFeatures, StatusFeature, StatusSubfeature, SubscriptionsFeature } from "../cms";

export const featureSetSchema = compileFeatures({
  subscriptions: new SubscriptionsFeature({
    name: "Subscriptions",
    mainColor: "#f43f5e",
    secondaryColor: "#fb7185",
    slug: "subscriptions",
  }),
  planMode: new StatusFeature({
    name: "Plan Mode",
    mainColor: "#3b82f6",
    secondaryColor: "#60a5fa",
    slug: "planmode",
    subfeatures: {
      "dual-model": new StatusSubfeature({
        displayName: "Dual Model",
        slug: "dual-mode",
        subfeatureCollectionId: "planmode/dual-model/dual-model",
      }),
      questions: new StatusSubfeature({
        displayName: "Questions",
        slug: "questions",
        subfeatureCollectionId: "planmode/questions/questions",
      }),
      "plan-editing": new StatusSubfeature({
        displayName: "Plan Editing",
        slug: "plan-editing",
        subfeatureCollectionId: "planmode/plan-editing/plan-editing",
      }),
      "orchestrator-mode": new StatusSubfeature({
        displayName: "Orchestrator Mode",
        slug: "orchestrator-mode",
        subfeatureCollectionId: "planmode/orchestrator-mode/orchestrator-mode",
      }),
      todos: new StatusSubfeature({
        displayName: "Todos",
        slug: "todos",
        subfeatureCollectionId: "planmode/todos/todos",
      }),
    },
  }),
  documentation: new StatusFeature({
    name: "Documentation",
    mainColor: "#8b5cf6",
    secondaryColor: "#a78bfa",
    slug: "documentation",
    subfeatures: {
      filesystem: new StatusSubfeature({
        displayName: "Filesystem Documentation",
        slug: "filesystem-documentation",
        subfeatureCollectionId: "documentation/filesystem/filesystem",
      }),
      tree: new StatusSubfeature({
        displayName: "Hierarchical Tree",
        slug: "hierarchical-tree",
        subfeatureCollectionId: "documentation/tree/tree",
      }),
      "multi-file": new StatusSubfeature({
        displayName: "Multi File",
        slug: "multi-file",
        subfeatureCollectionId: "documentation/multi-file/multi-file",
      }),
      "llms-txt": new StatusSubfeature({
        displayName: "Llms Txt",
        slug: "llms-txt",
        subfeatureCollectionId: "documentation/llms-txt/llms-txt",
      }),
      "auto-merge": new StatusSubfeature({
        displayName: "Auto Merge",
        slug: "auto-merge",
        subfeatureCollectionId: "documentation/auto-merge/auto-merge",
      }),
      skills: new StatusSubfeature({
        displayName: "Partial/Skills.md",
        slug: "Partial/Skills.md",
        subfeatureCollectionId: "documentation/skills/skills",
      }),
      "web-to-docs": new StatusSubfeature({
        displayName: "Web To Docs",
        slug: "web-to-docs",
        subfeatureCollectionId: "documentation/web-to-docs/web-to-docs",
      }),
    },
  }),
  tools: new StatusFeature({
    name: "Tools",
    mainColor: "#06b6d4",
    secondaryColor: "#22d3ee",
    slug: "tools",
    subfeatures: {
      "web-search-engine": new StatusSubfeature({
        displayName: "Web Search Engine",
        slug: "web-search-engine",
        subfeatureCollectionId: "tools/web-search-engine/web-search-engine",
      }),
      "fetch-data": new StatusSubfeature({
        displayName: "Fetch Data",
        slug: "fetch-data",
        subfeatureCollectionId: "tools/fetch-data/fetch-data",
      }),
      browser: new StatusSubfeature({
        displayName: "Browser",
        slug: "browser",
        subfeatureCollectionId: "tools/browser/browser",
      }),
      linters: new StatusSubfeature({
        displayName: "Linters",
        slug: "linters",
        subfeatureCollectionId: "tools/linters/linters",
      }),
    },
  }),
  commands: new StatusFeature({
    name: "Commands",
    mainColor: "#10b981",
    secondaryColor: "#34d399",
    slug: "commands",
    subfeatures: {},
  }),
  cliCalling: new StatusFeature({
    name: "CLI Calling",
    mainColor: "#f97316",
    secondaryColor: "#fb923c",
    slug: "cli-calling",
    subfeatures: {
      "infinite-tasks-timeout": new StatusSubfeature({
        displayName: "Infinite Tasks Timeout",
        slug: "infinite-tasks-timeout",
        subfeatureCollectionId:
          "clicalling/infinite-tasks-timeout/infinite-tasks-timeout",
      }),
      "processes-explorer": new StatusSubfeature({
        displayName: "Processes Explorer",
        slug: "processes-explorer",
        subfeatureCollectionId:
          "clicalling/processes-explorer/processes-explorer",
      }),
    },
  }),
  modelManagement: new StatusFeature({
    name: "Model management",
    mainColor: "#ec4899",
    secondaryColor: "#f472b6",
    slug: "model-management",
    subfeatures: {
      filtering: new StatusSubfeature({
        displayName: "Filtering",
        slug: "filtering",
        subfeatureCollectionId: "modelmanagement/filtering/filtering",
      }),
      "region-tuning": new StatusSubfeature({
        displayName: "Region Tuning",
        slug: "region-tuning",
        subfeatureCollectionId: "modelmanagement/region-tuning/region-tuning",
      }),
    },
  }),
  agentMode: new StatusFeature({
    name: "Agent Mode",
    mainColor: "#ef4444",
    secondaryColor: "#f87171",
    slug: "agent-mode",
    subfeatures: {
      debug: new StatusSubfeature({
        displayName: "Debug",
        slug: "debug",
        subfeatureCollectionId: "agentmode/debug/debug",
      }),
      ask: new StatusSubfeature({
        displayName: "Ask",
        slug: "ask",
        subfeatureCollectionId: "agentmode/ask/ask",
      }),
    },
  }),
});

export const declareAgent = featureSetSchema.declareAgent;
export const compileTable = featureSetSchema.compileTable;
