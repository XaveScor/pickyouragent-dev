import {
  declareSchema,
  FeatureStatus,
  SubFeatureStatus,
} from "../featureSetSchema";

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
      "orchestrator-mode": SubFeatureStatus.NotVerified,
      todos: SubFeatureStatus.Supported,
    },
    documentation: {
      filesystem: SubFeatureStatus.Supported,
      tree: SubFeatureStatus.Supported,
      "multi-file": SubFeatureStatus.NotSupported,
      "llms-txt": SubFeatureStatus.NotSupported,
      "auto-merge": SubFeatureStatus.NotSupported,
      skills: SubFeatureStatus.NotVerified,
      "web-to-docs": SubFeatureStatus.NotSupported,
    },
    tools: {
      "web-search-engine": SubFeatureStatus.Supported,
      "fetch-data": SubFeatureStatus.Supported,
      browser: SubFeatureStatus.NotVerified,
      linters: SubFeatureStatus.NotVerified,
    },
    commands: FeatureStatus.Supported,
    cliCalling: {
      "infinite-tasks-timeout": SubFeatureStatus.NotVerified,
      "processes-explorer": SubFeatureStatus.NotVerified,
    },
    modelManagement: {
      filtering: SubFeatureStatus.NotSupported,
      "region-tuning": SubFeatureStatus.NotSupported,
    },
    agentMode: {
      debug: SubFeatureStatus.NotSupported,
      ask: SubFeatureStatus.PartiallySupported,
    },
    subscriptions: [
      { label: "z.ai", url: "https://z.ai/subscribe?ic=9GRH0KS07Z" },
      { label: "max plan", url: "https://claude.com/pricing/max" },
    ],
  },
);
