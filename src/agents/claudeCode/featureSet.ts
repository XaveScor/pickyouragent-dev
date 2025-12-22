import { declareSchema, SubFeatureStatus } from "../featureSetSchema";

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
      partial: SubFeatureStatus.NotSupported,
    },
    reasoning: {
      "explanation-in-natural-language": SubFeatureStatus.PartiallySupported,
      "step-by-step-view": SubFeatureStatus.NotSupported,
    },
    tools: {
      "search-engine": SubFeatureStatus.Supported,
      "fetch-data": SubFeatureStatus.Supported,
    },
  },
);
