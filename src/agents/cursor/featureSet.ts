import { declareAgent } from "../featureSetSchema";
import { Status } from "../../cms";
import { zai } from "../../cms/features/SubscriptionsFeature/subscriptions";

export const cursor = declareAgent(
  {
    id: "cursor",
    name: "Cursor",
  },
  {
    planMode: {
      "dual-model": {
        status: Status.Supported,
        collectionId: "cursor/planmode/dual-model",
      },
      questions: {
        status: Status.Supported,
        collectionId: "cursor/planmode/questions",
      },
      "plan-editing": {
        status: Status.Supported,
        collectionId: "cursor/planmode/plan-editing",
      },
      "orchestrator-mode": Status.NotSupported,
      todos: {
        status: Status.Supported,
        collectionId: "cursor/planmode/todos",
      },
    },
    documentation: {
      filesystem: {
        status: Status.Supported,
        collectionId: "cursor/documentation/filesystem",
      },
      tree: Status.Supported,
      "multi-file": Status.Supported,
      "llms-txt": Status.Supported,

      skills: Status.Supported,
      "web-to-docs": {
        status: Status.Supported,
        collectionId: "cursor/documentation/web-to-docs",
      },
    },
    tools: {
      "web-search-engine": Status.Supported,
      // https://forum.cursor.com/t/agent-cant-web-search-properly/132658/17
      "fetch-data": Status.NotSupported,
      browser: {
        status: Status.PartiallySupported,
        collectionId: "cursor/tools/browser",
      },
      linters: {
        status: Status.PartiallySupported,
        collectionId: "cursor/tools/linters",
      },
    },
    commands: Status.Supported,
    cliCalling: Status.NotSupported,
    modelManagement: {
      filtering: Status.Supported,
      "region-tuning": {
        status: Status.PartiallySupported,
        collectionId: "cursor/modelmanagement/region-tuning",
      },
    },
    specializedModes: {
      debug: {
        status: Status.Supported,
        collectionId: "cursor/specializedmodes/debug",
      },
      ask: {
        status: Status.Supported,
        collectionId: "cursor/specializedmodes/ask",
      },
    },
    subscriptions: [zai],
  },
);
