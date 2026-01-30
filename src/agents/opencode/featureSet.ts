import { declareAgent } from "../featureSetSchema";
import { Status } from "../../cms";
import { zai, openai, copilot } from "../../cms/features/SubscriptionsFeature/subscriptions";

export const opencode = declareAgent(
  {
    id: "opencode",
    name: "OpenCode",
  },
  {
    planMode: {
      "dual-model": Status.Supported,
      questions: Status.Supported,
      "plan-editing": Status.NotSupported,
      "orchestrator-mode": Status.NotSupported,
      todos: Status.PartiallySupported,
    },
    documentation: {
      filesystem: Status.Supported,
      tree: Status.NotSupported,
      "multi-file": Status.NotSupported,
      "llms-txt": Status.NotSupported,
      "auto-merge": Status.NotSupported,
      skills: Status.Supported,
      "web-to-docs": Status.NotSupported,
    },
    tools: {
      "web-search-engine": Status.NotSupported,
      "fetch-data": Status.Supported,
      browser: Status.NotSupported,
      linters: Status.Supported,
    },
    commands: Status.Supported,
    cliCalling: {
      "infinite-tasks-timeout": Status.NotSupported,
      "processes-explorer": Status.NotSupported,
    },
    modelManagement: {
      filtering: Status.Supported,
      "region-tuning": Status.NotSupported,
    },
    agentMode: {
      debug: Status.NotSupported,
      ask: Status.PartiallySupported,
    },
    subscriptions: [zai, openai, copilot],
  },
);
