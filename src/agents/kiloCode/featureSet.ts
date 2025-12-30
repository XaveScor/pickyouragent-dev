import { declareSchema, FeatureStatus, SubFeatureStatus } from "../featureSetSchema";

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
    },
    documentation: {
      filesystem: SubFeatureStatus.Supported,
      tree: SubFeatureStatus.NotVerified,
      "multi-file": SubFeatureStatus.NotVerified,
      "llms-txt": SubFeatureStatus.NotVerified,
      "auto-merge": SubFeatureStatus.NotVerified,
      skills: SubFeatureStatus.NotVerified,
      "web-to-docs": SubFeatureStatus.NotVerified,
    },
    tools: {
      "search-engine": SubFeatureStatus.NotVerified,
      "fetch-data": SubFeatureStatus.NotVerified,
      browser: SubFeatureStatus.NotVerified,
      linters: SubFeatureStatus.NotVerified,
    },
    commands: FeatureStatus.NotVerified,
    cliCalling: {
      "infinite-tasks-timeout": SubFeatureStatus.NotSupported,
      "processes-explorer": SubFeatureStatus.NotSupported,
    },
  },
);
