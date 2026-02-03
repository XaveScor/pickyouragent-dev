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

      skills: {
        status: Status.Supported,
        collectionId: "kilocode/documentation/skills",
      },
      "web-to-docs": Status.NotSupported,
    },
    tools: Status.NotSupported,
    commands: Status.Supported,
    cliCalling: Status.NotSupported,
    modelManagement: {
      filtering: Status.NotSupported,
      "region-tuning": Status.Supported,
    },
    specializedModes: {
      debug: {
        status: Status.Supported,
        collectionId: "kilocode/specializedmodes/debug",
      },
      ask: {
        status: Status.Supported,
        collectionId: "kilocode/specializedmodes/ask",
      },
    },
    subscriptions: [zai],
  },
);
