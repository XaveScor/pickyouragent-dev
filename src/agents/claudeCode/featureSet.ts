import { declareAgent } from "../featureSetSchema";
import { Status } from "../../cms";
import { zai, claudeMax } from "../../cms/features/SubscriptionsFeature/subscriptions";

export const claudeCode = declareAgent(
  {
    id: "claude-code",
    name: "Claude Code",
  },
  {
    planMode: {
      "dual-model": Status.Supported,
      questions: Status.NotVerified,
      "plan-editing": Status.NotVerified,
      "orchestrator-mode": Status.NotVerified,
      todos: Status.Supported,
    },
    documentation: {
      filesystem: Status.Supported,
      tree: Status.Supported,
      "multi-file": Status.NotSupported,
      "llms-txt": Status.NotSupported,
      "auto-merge": Status.NotSupported,
      skills: Status.NotVerified,
      "web-to-docs": Status.NotSupported,
    },
    tools: {
      "web-search-engine": Status.Supported,
      "fetch-data": Status.Supported,
      browser: Status.NotVerified,
      linters: Status.NotVerified,
    },
    commands: Status.Supported,
    cliCalling: {
      "infinite-tasks-timeout": Status.NotVerified,
      "processes-explorer": Status.NotVerified,
    },
    modelManagement: {
      filtering: Status.NotSupported,
      "region-tuning": Status.NotSupported,
    },
    agentMode: {
      debug: Status.NotSupported,
      ask: Status.PartiallySupported,
    },
    subscriptions: [zai, claudeMax],
  },
);
