import { declareAgent } from "../featureSetSchema";
import { Status } from "../../cms";
import { openai } from "../../cms/features/SubscriptionsFeature/subscriptions";

export const codex = declareAgent(
  {
    id: "codex",
    name: "Codex",
  },
  {
    planMode: {
      "dual-model": {
        status: Status.NotSupported,
        collectionId: "codex/planmode/dual-model",
      },
      questions: {
        status: Status.NotSupported,
        collectionId: "codex/planmode/questions",
      },
      "plan-editing": Status.NotSupported,
      "orchestrator-mode": Status.NotSupported,
      todos: {
        status: Status.NotSupported,
        collectionId: "codex/planmode/todos",
      },
    },
    documentation: {
      filesystem: {
        status: Status.Supported,
        collectionId: "codex/documentation/filesystem",
      },
      tree: Status.NotSupported,
      "multi-file": Status.NotSupported,
      "llms-txt": Status.NotSupported,

      skills: {
        status: Status.Supported,
        collectionId: "codex/documentation/skills",
      },
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
    specializedModes: {
      debug: {
        status: Status.NotSupported,
        collectionId: "codex/specializedmodes/debug",
      },
      ask: {
        status: Status.PartiallySupported,
        collectionId: "codex/specializedmodes/ask",
      },
    },
    subscriptions: [openai],
  },
);
