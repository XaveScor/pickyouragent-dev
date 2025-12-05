import { declareSchema, FeatureStatus } from "../featureSetSchema";

export const claudeCode = declareSchema(
  {
    id: "claude-code",
    name: "Claude Code",
  },
  {
    planning: {
      "multi-step-planning": FeatureStatus.NotSupported,
      "plan-editing": FeatureStatus.NotSupported,
      "plan-execution": FeatureStatus.Supported,
    },
    reasoning: {
      "explanation-in-natural-language": FeatureStatus.PartiallySupported,
      "step-by-step-view": FeatureStatus.NotSupported,
    },
    tests: {
      "test-generation": FeatureStatus.Supported,
      "integrates-with-ci": FeatureStatus.Supported,
      "editor-plugins-available": FeatureStatus.NotSupported,
    },
  }
);
