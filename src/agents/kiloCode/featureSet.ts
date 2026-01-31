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
      "dual-model": {
        status: Status.Supported,
        collectionId: "kilocode/planmode/dual-model",
      },
      questions: {
        status: Status.Supported,
        collectionId: "kilocode/planmode/questions",
      },
      "plan-editing": Status.NotSupported,
      "orchestrator-mode": {
        status: Status.Supported,
        collectionId: "kilocode/planmode/orchestrator-mode",
      },
      todos: {
        status: Status.PartiallySupported,
        collectionId: "kilocode/planmode/todos",
      },
    },
    documentation: {
      filesystem: {
        status: Status.Supported,
        collectionId: "kilocode/documentation/filesystem",
      },
      tree: {
        status: Status.Supported,
        collectionId: "kilocode/documentation/tree",
      },
      "multi-file": Status.NotSupported,
      "llms-txt": Status.NotSupported,
      "auto-merge": Status.NotSupported,
      skills: {
        status: Status.Supported,
        collectionId: "kilocode/documentation/skills",
      },
      "web-to-docs": Status.NotSupported,
    },
    tools: {
      "web-search-engine": Status.NotSupported,
      "fetch-data": Status.NotSupported,
      browser: {
        status: Status.NotSupported,
        collectionId: "kilocode/tools/browser",
      },
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
      debug: {
        status: Status.Supported,
        collectionId: "kilocode/agentmode/debug",
      },
      ask: {
        status: Status.Supported,
        collectionId: "kilocode/agentmode/ask",
      },
    },
    subscriptions: [zai],
  },
);
