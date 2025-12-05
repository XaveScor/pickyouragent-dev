import { declareSchema, FeatureStatus } from "../featureSetSchema";

export const codex = declareSchema(
  {
    id: "codex",
    name: "Codex",
  },
  {
    planning: {
      "multi-step-planning": FeatureStatus.Supported,
      "plan-editing": FeatureStatus.Supported,
      "plan-execution": FeatureStatus.Supported,
    },
    reasoning: {
      "explanation-in-natural-language": FeatureStatus.Supported,
      "step-by-step-view": FeatureStatus.Supported,
    },
    tests: {
      "test-generation": FeatureStatus.NotSupported,
      "integrates-with-ci": FeatureStatus.Supported,
      "editor-plugins-available": FeatureStatus.Supported,
    },
  }
);
