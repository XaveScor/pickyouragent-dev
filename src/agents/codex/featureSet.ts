import { declareSchema, FeatureStatus, SubFeatureStatus } from "../featureSetSchema";

export const codex = declareSchema(
  {
    id: "codex",
    name: "Codex",
  },
  {
    planMode: {
      "dual-model": SubFeatureStatus.NotSupported,
      questions: SubFeatureStatus.NotSupported,
      "plan-editing": SubFeatureStatus.NotSupported,
    },
    documentation: {
      filesystem: SubFeatureStatus.Supported,
      tree: SubFeatureStatus.NotSupported,
      "multi-file": SubFeatureStatus.NotSupported,
      "llms-txt": SubFeatureStatus.NotSupported,
      "auto-merge": SubFeatureStatus.NotSupported,
      skills: SubFeatureStatus.NotVerified,
      "web-to-docs": SubFeatureStatus.NotSupported,
    },
    tools: {
      "web-search-engine": SubFeatureStatus.Supported,
      "fetch-data": SubFeatureStatus.NotSupported,
      "browser": SubFeatureStatus.NotSupported,
      "linters": SubFeatureStatus.NotSupported,
    },
    commands: FeatureStatus.Supported,
    cliCalling: {
      "infinite-tasks-timeout": SubFeatureStatus.NotVerified,
      "processes-explorer": SubFeatureStatus.NotVerified,
    },
    modelManagement: {
      filtering: SubFeatureStatus.NotSupported,
    },
  },
);
