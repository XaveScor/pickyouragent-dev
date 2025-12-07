import { declareSchema, FeatureStatus } from "../featureSetSchema";

export const codex = declareSchema(
  {
    id: "codex",
    name: "Codex",
  },
  {
    planMode: {
      "dual-model": FeatureStatus.NotSupported,
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
