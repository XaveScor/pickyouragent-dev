import {
  declareSchema,
  FeatureStatus,
  SubFeatureStatus,
} from "../featureSetSchema";

export const opencode = declareSchema(
  {
    id: "opencode",
    name: "OpenCode",
  },
  {
    planMode: {
      "dual-model": SubFeatureStatus.Supported,
      questions: SubFeatureStatus.Supported,
      "plan-editing": SubFeatureStatus.NotSupported,
      "orchestrator-mode": SubFeatureStatus.NotSupported,
      todos: SubFeatureStatus.PartiallySupported,
    },
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
      "web-search-engine": SubFeatureStatus.NotSupported,
      "fetch-data": SubFeatureStatus.Supported,
      browser: SubFeatureStatus.NotSupported,
      linters: SubFeatureStatus.Supported,
    },
    commands: FeatureStatus.Supported,
    cliCalling: {
      "infinite-tasks-timeout": SubFeatureStatus.NotSupported,
      "processes-explorer": SubFeatureStatus.NotSupported,
    },
    modelManagement: {
      filtering: SubFeatureStatus.Supported,
      "region-tuning": SubFeatureStatus.NotSupported,
    },
    agentMode: {
      debug: SubFeatureStatus.NotSupported,
      ask: SubFeatureStatus.PartiallySupported,
    },
    remoteDevelopment: {
      "own-server": SubFeatureStatus.Supported,
      "mobile-app": SubFeatureStatus.PartiallySupported,
      "internet-connection": SubFeatureStatus.Supported,
    },
    subscriptions: [
      { label: "z.ai", url: "https://z.ai/subscribe?ic=9GRH0KS07Z" },
      { label: "openai", url: "https://chatgpt.com/pricing/" },
      {
        label: "copilot",
        url: "https://github.com/features/copilot/plans",
      },
    ],
  },
);
