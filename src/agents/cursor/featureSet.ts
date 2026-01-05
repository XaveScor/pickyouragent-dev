import { declareSchema, FeatureStatus, SubFeatureStatus } from "../featureSetSchema";

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
      "orchestrator-mode": SubFeatureStatus.NotSupported,
    },
    documentation: {
      filesystem: SubFeatureStatus.Supported,
      tree: SubFeatureStatus.Supported,
      "multi-file": SubFeatureStatus.Supported,
      "llms-txt": SubFeatureStatus.Supported,
      "auto-merge": SubFeatureStatus.NotSupported,
      skills: SubFeatureStatus.Supported,
      "web-to-docs": SubFeatureStatus.Supported,
    },
    tools: {
      "web-search-engine": SubFeatureStatus.Supported,
      // https://forum.cursor.com/t/agent-cant-web-search-properly/132658/17
      "fetch-data": SubFeatureStatus.NotSupported,
      "browser": SubFeatureStatus.PartiallySupported,
      "linters": SubFeatureStatus.PartiallySupported,
    },
    commands: FeatureStatus.Supported,
    cliCalling: {
      "infinite-tasks-timeout": SubFeatureStatus.NotSupported,
      "processes-explorer": SubFeatureStatus.NotSupported,
    },
    modelManagement: {
      filtering: SubFeatureStatus.Supported,
      "region-tuning": SubFeatureStatus.PartiallySupported,
    },
    agentMode: {
      debug: SubFeatureStatus.Supported,
      ask: SubFeatureStatus.Supported,
    },
  },
);
