import { declareAgent } from "../featureSetSchema";
import { Status } from "../../cms";
import { openai } from "../../cms/features/SubscriptionsFeature/subscriptions";

export const codex = declareAgent(
  {
    id: "codex",
    name: "Codex",
  },
  {
    planMode: Status.NotSupported,
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
      "web-search-engine": Status.Supported,
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
      "region-tuning": Status.NotSupported,
    },
    agentMode: {
      debug: Status.NotSupported,
      ask: Status.PartiallySupported,
    },
    subscriptions: [openai],
  },
);
