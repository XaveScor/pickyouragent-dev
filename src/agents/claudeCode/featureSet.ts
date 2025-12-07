import { declareSchema, FeatureStatus } from "../featureSetSchema";

export const claudeCode = declareSchema(
  {
    id: "claude-code",
    name: "Claude Code",
  },
  {
    planMode: {
      "dual-model": FeatureStatus.Supported,
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
