import { declareSchema, FeatureStatus, SubFeatureStatus } from "../featureSetSchema";

export const claudeCode = declareSchema(
  {
    id: "claude-code",
    name: "Claude Code",
  },
  {
    planMode: {
      "dual-model": SubFeatureStatus.Supported,
      questions: SubFeatureStatus.NotSupported,
      "plan-editing": SubFeatureStatus.NotSupported,
    },
    documentation: {
      filesystem: SubFeatureStatus.Supported,
      tree: SubFeatureStatus.Supported,
      "multi-file": SubFeatureStatus.NotSupported,
      "llms-txt": SubFeatureStatus.NotSupported,
      "auto-merge": SubFeatureStatus.NotSupported,
      skills: SubFeatureStatus.NotVerified,
      "web-to-docs": SubFeatureStatus.NotSupported,
    },
    tools: {
      "web-search-engine": SubFeatureStatus.Supported,
      "fetch-data": SubFeatureStatus.Supported,
      "browser": SubFeatureStatus.NotVerified,
      "linters": SubFeatureStatus.NotVerified,
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
