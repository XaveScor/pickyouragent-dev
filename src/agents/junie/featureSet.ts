import {
  declareSchema,
  FeatureStatus,
  SubFeatureStatus,
} from "../featureSetSchema";

export const junie = declareSchema(
  {
    id: "junie",
    name: "Junie",
  },
  {
    planMode: FeatureStatus.NotSupported,
    documentation: {
      filesystem: SubFeatureStatus.Supported,
      tree: SubFeatureStatus.NotSupported,
      "multi-file": SubFeatureStatus.NotSupported,
      "llms-txt": SubFeatureStatus.NotSupported,
      "auto-merge": SubFeatureStatus.NotSupported,
      skills: SubFeatureStatus.NotSupported,
      "web-to-docs": SubFeatureStatus.NotSupported,
    },
    tools: FeatureStatus.NotSupported,
    commands: FeatureStatus.NotSupported,
    cliCalling: {
      "infinite-tasks-timeout": SubFeatureStatus.NotSupported,
      "processes-explorer": SubFeatureStatus.NotSupported,
    },
    modelManagement: FeatureStatus.NotSupported,
    agentMode: {
      debug: SubFeatureStatus.NotSupported,
      ask: SubFeatureStatus.Supported,
    },
    subscriptions: FeatureStatus.NotSupported,
  },
);
