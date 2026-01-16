import {
  declareSchema,
  FeatureStatus,
  SubFeatureStatus,
} from "../featureSetSchema";

export const kiloCode = declareSchema(
  {
    id: "kilo-code",
    name: "Kilo Code",
  },
  {
    planMode: {
      "dual-model": SubFeatureStatus.Supported,
      questions: SubFeatureStatus.Supported,
      "plan-editing": SubFeatureStatus.NotSupported,
      "orchestrator-mode": SubFeatureStatus.Supported,
      todos: SubFeatureStatus.PartiallySupported,
    },
    documentation: {
      filesystem: SubFeatureStatus.Supported,
      tree: SubFeatureStatus.Supported,
      "multi-file": SubFeatureStatus.NotSupported,
      "llms-txt": SubFeatureStatus.NotSupported,
      "auto-merge": SubFeatureStatus.NotSupported,
      skills: SubFeatureStatus.Supported,
      "web-to-docs": SubFeatureStatus.NotSupported,
    },
    tools: {
      "web-search-engine": SubFeatureStatus.NotSupported,
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
      "region-tuning": SubFeatureStatus.Supported,
    },
    agentMode: {
      debug: SubFeatureStatus.Supported,
      ask: SubFeatureStatus.Supported,
    },
    remoteDevelopment: {
      "own-server": SubFeatureStatus.Supported,
      "mobile-app": SubFeatureStatus.NotVerified,
      "internet-connection": SubFeatureStatus.PartiallySupported,
    },
    subscriptions: [
      { label: "z.ai", url: "https://z.ai/subscribe?ic=9GRH0KS07Z" },
    ],
  },
);
