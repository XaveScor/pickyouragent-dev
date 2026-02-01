import {
  compileFeatures,
  StatusFeature,
  StatusSubfeature,
  SubscriptionsFeature,
} from "../cms";

export const featureSetSchema = compileFeatures({
  subscriptions: new SubscriptionsFeature({
    name: "Subscriptions",
    mainColor: "#f43f5e",
    secondaryColor: "#fb7185",
    slug: "subscriptions",
    weight: 0,
  }),
  planMode: new StatusFeature({
    name: "Plan Mode",
    mainColor: "#3b82f6",
    secondaryColor: "#60a5fa",
    slug: "planmode",
    weight: 8,
    subfeatures: {
      "dual-model": new StatusSubfeature({
        displayName: "Dual Model",
        slug: "dual-mode",
        subfeatureCollectionId: "planmode/dual-model/dual-model",
        weight: 1,
      }),
      questions: new StatusSubfeature({
        displayName: "Questions",
        slug: "questions",
        subfeatureCollectionId: "planmode/questions/questions",
        weight: 4,
      }),
      "plan-editing": new StatusSubfeature({
        displayName: "Plan Editing",
        slug: "plan-editing",
        subfeatureCollectionId: "planmode/plan-editing/plan-editing",
        weight: 5,
      }),
      "orchestrator-mode": new StatusSubfeature({
        displayName: "Orchestrator Mode",
        slug: "orchestrator-mode",
        subfeatureCollectionId: "planmode/orchestrator-mode/orchestrator-mode",
        weight: 3,
      }),
      todos: new StatusSubfeature({
        displayName: "Todos",
        slug: "todos",
        subfeatureCollectionId: "planmode/todos/todos",
        weight: 6,
      }),
    },
  }),
  documentation: new StatusFeature({
    name: "Documentation",
    mainColor: "#8b5cf6",
    secondaryColor: "#a78bfa",
    slug: "documentation",
    weight: 5,
    subfeatures: {
      filesystem: new StatusSubfeature({
        displayName: "Filesystem Documentation",
        slug: "filesystem-documentation",
        subfeatureCollectionId: "documentation/filesystem/filesystem",
        weight: 7,
      }),
      tree: new StatusSubfeature({
        displayName: "Hierarchical Tree",
        slug: "hierarchical-tree",
        subfeatureCollectionId: "documentation/tree/tree",
        weight: 5,
      }),
      "multi-file": new StatusSubfeature({
        displayName: "Multi File",
        slug: "multi-file",
        subfeatureCollectionId: "documentation/multi-file/multi-file",
        weight: 2,
      }),
      "llms-txt": new StatusSubfeature({
        displayName: "Llms Txt",
        slug: "llms-txt",
        subfeatureCollectionId: "documentation/llms-txt/llms-txt",
        weight: 4,
      }),
      skills: new StatusSubfeature({
        displayName: "Partial/Skills.md",
        slug: "Partial/Skills.md",
        subfeatureCollectionId: "documentation/skills/skills",
        weight: 3,
      }),
      "web-to-docs": new StatusSubfeature({
        displayName: "Web To Docs",
        slug: "web-to-docs",
        subfeatureCollectionId: "documentation/web-to-docs/web-to-docs",
        weight: 1,
      }),
    },
  }),
  tools: new StatusFeature({
    name: "Tools",
    mainColor: "#06b6d4",
    secondaryColor: "#22d3ee",
    slug: "tools",
    weight: 4,
    subfeatures: {
      "web-search-engine": new StatusSubfeature({
        displayName: "Web Search Engine",
        slug: "web-search-engine",
        subfeatureCollectionId: "tools/web-search-engine/web-search-engine",
        weight: 2,
      }),
      "fetch-data": new StatusSubfeature({
        displayName: "Fetch Data",
        slug: "fetch-data",
        subfeatureCollectionId: "tools/fetch-data/fetch-data",
        weight: 2,
      }),
      browser: new StatusSubfeature({
        displayName: "Browser",
        slug: "browser",
        subfeatureCollectionId: "tools/browser/browser",
        weight: 2,
      }),
      linters: new StatusSubfeature({
        displayName: "Linters",
        slug: "linters",
        subfeatureCollectionId: "tools/linters/linters",
        weight: 2,
      }),
    },
  }),
  commands: new StatusFeature({
    name: "Commands",
    mainColor: "#10b981",
    secondaryColor: "#34d399",
    slug: "commands",
    weight: 3,
    subfeatures: {},
  }),
  cliCalling: new StatusFeature({
    name: "CLI Calling",
    mainColor: "#f97316",
    secondaryColor: "#fb923c",
    slug: "cli-calling",
    weight: 5,
    subfeatures: {
      "infinite-tasks-timeout": new StatusSubfeature({
        displayName: "Infinite Tasks Timeout",
        slug: "infinite-tasks-timeout",
        subfeatureCollectionId:
          "clicalling/infinite-tasks-timeout/infinite-tasks-timeout",
        weight: 3,
      }),
      "processes-explorer": new StatusSubfeature({
        displayName: "Processes Explorer",
        slug: "processes-explorer",
        subfeatureCollectionId:
          "clicalling/processes-explorer/processes-explorer",
        weight: 1,
      }),
    },
  }),
  modelManagement: new StatusFeature({
    name: "Model management",
    mainColor: "#ec4899",
    secondaryColor: "#f472b6",
    slug: "model-management",
    weight: 3,
    subfeatures: {
      filtering: new StatusSubfeature({
        displayName: "Filtering",
        slug: "filtering",
        subfeatureCollectionId: "modelmanagement/filtering/filtering",
        weight: 1,
      }),
      "region-tuning": new StatusSubfeature({
        displayName: "Region Tuning",
        slug: "region-tuning",
        subfeatureCollectionId: "modelmanagement/region-tuning/region-tuning",
        weight: 1,
      }),
    },
  }),
  specializedModes: new StatusFeature({
    name: "Specialized Modes",
    mainColor: "#ef4444",
    secondaryColor: "#f87171",
    slug: "specialized-modes",
    weight: 2,
    subfeatures: {
      debug: new StatusSubfeature({
        displayName: "Debug",
        slug: "debug",
        subfeatureCollectionId: "specializedmodes/debug/debug",
        weight: 2,
      }),
      ask: new StatusSubfeature({
        displayName: "Ask",
        slug: "ask",
        subfeatureCollectionId: "specializedmodes/ask/ask",
        weight: 4,
      }),
    },
  }),
});

export const declareAgent = featureSetSchema.declareAgent;
export const compileTable = featureSetSchema.compileTable;
