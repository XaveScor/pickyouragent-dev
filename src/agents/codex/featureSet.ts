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
      "dual-model": Status.NotSupported,
      questions: {
        status: Status.Supported,
        collectionId: "codex/planmode/questions",
      },
      "plan-editing": {
        status: Status.NotSupported,
        collectionId: "codex/planmode/plan-editing",
      },
      "orchestrator-mode": Status.NotSupported,
      todos: Status.NotSupported,
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
      "fetch-data": {
        status: Status.Supported,
        collectionId: "codex/tools/fetch-data",
      },
      browser: Status.NotSupported,
      linters: Status.NotSupported,
    },
    commands: Status.Supported,
    cliCalling: {
      "infinite-tasks-timeout": {
        status: Status.NotSupported,
        collectionId: "codex/cli-calling/infinite-tasks-timeout",
      },
      "processes-explorer": {
        status: Status.NotSupported,
        collectionId: "codex/cli-calling/processes-explorer",
      },
    },
    modelManagement: {
      filtering: Status.NotSupported,
      "region-tuning": Status.NotSupported,
    },
    specializedModes: Status.NotSupported,
    subscriptions: [openai],
  },
);
