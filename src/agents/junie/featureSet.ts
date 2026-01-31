import { declareAgent } from "../featureSetSchema";
import { Status } from "../../cms";

export const junie = declareAgent(
  {
    id: "junie",
    name: "Junie",
  },
  {
    planMode: {
      "dual-model": {
        status: Status.NotSupported,
        collectionId: "junie/planmode/dual-model",
      },
      questions: Status.NotSupported,
      "plan-editing": Status.NotSupported,
      "orchestrator-mode": Status.NotSupported,
      todos: {
        status: Status.NotSupported,
        collectionId: "junie/planmode/todos",
      },
    },
    documentation: {
      filesystem: {
        status: Status.Supported,
        collectionId: "junie/documentation/filesystem",
      },
      tree: Status.NotSupported,
      "multi-file": Status.NotSupported,
      "llms-txt": Status.NotSupported,

      skills: Status.NotSupported,
      "web-to-docs": Status.NotSupported,
    },
    tools: Status.NotSupported,
    commands: Status.NotSupported,
    cliCalling: {
      "infinite-tasks-timeout": Status.NotSupported,
      "processes-explorer": Status.NotSupported,
    },
    modelManagement: {
      filtering: {
        status: Status.NotSupported,
        collectionId: "junie/modelmanagement/filtering",
      },
      "region-tuning": Status.NotSupported,
    },
    specializedModes: {
      debug: {
        status: Status.NotSupported,
        collectionId: "junie/specializedmodes/debug",
      },
      ask: {
        status: Status.Supported,
        collectionId: "junie/specializedmodes/ask",
      },
    },
    subscriptions: [],
  },
);
