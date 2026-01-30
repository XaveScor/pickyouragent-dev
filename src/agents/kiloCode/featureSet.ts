import { declareAgent } from "../featureSetSchema";
import { Status } from "../../cms";
import { zai } from "../../cms/features/SubscriptionsFeature/subscriptions";

export const kiloCode = declareAgent(
  {
    id: "kilo-code",
    name: "Kilo Code",
  },
  {
    planMode: {
      "dual-model": Status.Supported,
      questions: Status.Supported,
      "plan-editing": Status.NotSupported,
      "orchestrator-mode": Status.Supported,
      todos: Status.PartiallySupported,
    },
    documentation: {
      filesystem: Status.Supported,
      tree: Status.Supported,
      "multi-file": Status.NotSupported,
      "llms-txt": Status.NotSupported,
      "auto-merge": Status.NotSupported,
      skills: Status.Supported,
      "web-to-docs": Status.NotSupported,
    },
    tools: {
      "web-search-engine": Status.NotSupported,
      "fetch-data": Status.NotSupported,
      browser: Status.NotSupported,
      linters: Status.NotSupported,
    },
    commands: Status.Supported,
    cliCalling: {
      "infinite-tasks-timeout": Status.NotSupported,
      "processes-explorer": Status.NotSupported,
    },
    modelManagement: {
      filtering: Status.NotSupported,
      "region-tuning": Status.Supported,
    },
    agentMode: {
      debug: Status.Supported,
      ask: Status.Supported,
    },
    subscriptions: [zai],
  },
);
