import {
  declareSchema,
  FeatureStatus,
  SubFeatureStatus,
} from "../featureSetSchema";

export const codex = declareSchema(
  {
    id: "codex",
    name: "Codex",
  },
  {
    planMode: FeatureStatus.NotSupported,
    documentation: {
      filesystem: SubFeatureStatus.Supported,
      tree: SubFeatureStatus.NotSupported,
      "multi-file": SubFeatureStatus.NotSupported,
      "llms-txt": SubFeatureStatus.NotSupported,
      "auto-merge": SubFeatureStatus.NotSupported,
      skills: SubFeatureStatus.Supported,
      "web-to-docs": SubFeatureStatus.NotSupported,
    },
    tools: {
      "web-search-engine": SubFeatureStatus.Supported,
      "fetch-data": SubFeatureStatus.NotSupported,
      browser: SubFeatureStatus.NotSupported,
      linters: SubFeatureStatus.NotSupported,
    },
    commands: FeatureStatus.Supported,
    cliCalling: {
      "infinite-tasks-timeout": SubFeatureStatus.NotSupported,
      "processes-explorer": SubFeatureStatus.NotSupported,
    },
    modelManagement: {
      filtering: SubFeatureStatus.NotSupported,
      "region-tuning": SubFeatureStatus.NotSupported,
    },
    agentMode: {
      debug: SubFeatureStatus.NotSupported,
      ask: SubFeatureStatus.PartiallySupported,
    },
    subscriptions: [{ label: "openai", url: "https://chatgpt.com/pricing/" }],
  },
);
