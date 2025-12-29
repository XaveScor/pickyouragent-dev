import { declareSchema, FeatureStatus, SubFeatureStatus } from "../featureSetSchema";

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
      skills: SubFeatureStatus.NotVerified,
      "web-to-docs": SubFeatureStatus.NotSupported,
    },
    reasoning: {
      "explanation-in-natural-language": SubFeatureStatus.Supported,
      "step-by-step-view": SubFeatureStatus.Supported,
    },
    tools: {
      "search-engine": SubFeatureStatus.Supported,
      "fetch-data": SubFeatureStatus.NotSupported,
      "browser": SubFeatureStatus.NotSupported,
      "linters": SubFeatureStatus.NotSupported,
    },
    commands: FeatureStatus.Supported,
    cliCalling: FeatureStatus.NotVerified,
  },
);
