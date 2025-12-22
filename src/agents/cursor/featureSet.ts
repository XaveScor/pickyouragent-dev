import { declareSchema, SubFeatureStatus } from "../featureSetSchema";

export const cursor = declareSchema(
  {
    id: "cursor",
    name: "Cursor",
  },
  {
    planMode: {
      "dual-model": SubFeatureStatus.NotSupported,
      questions: SubFeatureStatus.Supported,
      "plan-editing": SubFeatureStatus.Supported,
    },
    documentation: {
      filesystem: SubFeatureStatus.Supported,
      tree: SubFeatureStatus.Supported,
      "multi-file": SubFeatureStatus.Supported,
      "llms-txt": SubFeatureStatus.Supported,
      "auto-merge": SubFeatureStatus.NotSupported,
      skills: SubFeatureStatus.Supported,
    },
    tools: {
      "search-engine": SubFeatureStatus.Supported,
      // https://forum.cursor.com/t/agent-cant-web-search-properly/132658/17
      "fetch-data": SubFeatureStatus.NotSupported,
      "browser": SubFeatureStatus.PartiallySupported,
      "linters": SubFeatureStatus.PartiallySupported,
    },
  },
);
