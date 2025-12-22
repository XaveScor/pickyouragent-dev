import { declareSchema, SubFeatureStatus } from "../featureSetSchema";

export const claudeCode = declareSchema(
  {
    id: "claude-code",
    name: "Claude Code",
  },
  {
    planMode: {
      "dual-model": SubFeatureStatus.Supported,
      questions: SubFeatureStatus.NotVerified,
      "plan-editing": SubFeatureStatus.NotVerified,
    },
    documentation: {
      filesystem: SubFeatureStatus.Supported,
      tree: SubFeatureStatus.Supported,
      "multi-file": SubFeatureStatus.NotSupported,
      "llms-txt": SubFeatureStatus.NotSupported,
      "auto-merge": SubFeatureStatus.NotSupported,
      skills: SubFeatureStatus.NotVerified,
    },
    reasoning: {
      "explanation-in-natural-language": SubFeatureStatus.PartiallySupported,
      "step-by-step-view": SubFeatureStatus.NotSupported,
    },
    tools: {
      "search-engine": SubFeatureStatus.Supported,
      "fetch-data": SubFeatureStatus.Supported,
      "browser": SubFeatureStatus.NotVerified,
      "linters": SubFeatureStatus.NotVerified,
    },
  },
);
