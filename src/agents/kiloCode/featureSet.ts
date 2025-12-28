import { declareSchema, FeatureStatus, SubFeatureStatus } from "../featureSetSchema";

export const kiloCode = declareSchema(
  {
    id: "kilo-code",
    name: "Kilo Code",
  },
  {
    planMode: {
      "dual-model": SubFeatureStatus.NotVerified,
      questions: SubFeatureStatus.NotVerified,
      "plan-editing": SubFeatureStatus.NotVerified,
    },
    documentation: {
      filesystem: SubFeatureStatus.NotVerified,
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
  },
);
