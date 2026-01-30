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
        name: "dual-model",
        slug: "dual-mode",
        subfeatureCollectionId: "planmode/dual-model/dual-model",
      }),
      questions: new StatusSubfeature({
        name: "questions",
        slug: "questions",
        subfeatureCollectionId: "planmode/questions/questions",
      }),
      "plan-editing": new StatusSubfeature({
        name: "plan-editing",
        slug: "plan-editing",
        subfeatureCollectionId: "planmode/plan-editing/plan-editing",
      }),
      "orchestrator-mode": new StatusSubfeature({
        name: "orchestrator-mode",
        slug: "orchestrator-mode",
        subfeatureCollectionId: "planmode/orchestrator-mode/orchestrator-mode",
      }),
      todos: new StatusSubfeature({
        name: "todos",
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
        name: "filesystem-documentation",
        slug: "filesystem-documentation",
        subfeatureCollectionId: "documentation/filesystem/filesystem",
      }),
      tree: new StatusSubfeature({
        name: "hierarchical-tree",
        slug: "hierarchical-tree",
        subfeatureCollectionId: "documentation/tree/tree",
      }),
      "multi-file": new StatusSubfeature({
        name: "multi-file",
        slug: "multi-file",
        subfeatureCollectionId: "documentation/multi-file/multi-file",
      }),
      "llms-txt": new StatusSubfeature({
        name: "llms-txt",
        slug: "llms-txt",
        subfeatureCollectionId: "documentation/llms-txt/llms-txt",
      }),
      "auto-merge": new StatusSubfeature({
        name: "auto-merge",
        slug: "auto-merge",
        subfeatureCollectionId: "documentation/auto-merge/auto-merge",
      }),
      skills: new StatusSubfeature({
        name: "Partial/Skills.md",
        slug: "Partial/Skills.md",
        subfeatureCollectionId: "documentation/skills/skills",
      }),
      "web-to-docs": new StatusSubfeature({
        name: "web-to-docs",
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
        name: "web-search-engine",
        slug: "web-search-engine",
        subfeatureCollectionId: "tools/web-search-engine/web-search-engine",
      }),
      "fetch-data": new StatusSubfeature({
        name: "fetch-data",
        slug: "fetch-data",
        subfeatureCollectionId: "tools/fetch-data/fetch-data",
      }),
      browser: new StatusSubfeature({
        name: "browser",
        slug: "browser",
        subfeatureCollectionId: "tools/browser/browser",
      }),
      linters: new StatusSubfeature({
        name: "linters",
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
        name: "infinite-tasks-timeout",
        slug: "infinite-tasks-timeout",
        subfeatureCollectionId:
          "clicalling/infinite-tasks-timeout/infinite-tasks-timeout",
      }),
      "processes-explorer": new StatusSubfeature({
        name: "processes-explorer",
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
        name: "filtering",
        slug: "filtering",
        subfeatureCollectionId: "modelmanagement/filtering/filtering",
      }),
      "region-tuning": new StatusSubfeature({
        name: "region-tuning",
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
        name: "debug",
        slug: "debug",
        subfeatureCollectionId: "agentmode/debug/debug",
      }),
      ask: new StatusSubfeature({
        name: "ask",
        slug: "ask",
        subfeatureCollectionId: "agentmode/ask/ask",
      }),
    },
  }),
});

export const declareAgent = featureSetSchema.declareAgent;
export const compileTable = featureSetSchema.compileTable;
