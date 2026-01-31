import { declareAgent } from "../featureSetSchema";
import { Status } from "../../cms";
import {
  zai,
  openai,
  copilot,
} from "../../cms/features/SubscriptionsFeature/subscriptions";

export const opencode = declareAgent(
  {
    id: "opencode",
    name: "OpenCode",
  },
  {
    planMode: {
      "dual-model": {
        status: Status.Supported,
        collectionId: "opencode/planmode/dual-model",
      },
      questions: {
        status: Status.Supported,
        collectionId: "opencode/planmode/questions",
      },
      "plan-editing": Status.NotSupported,
      "orchestrator-mode": Status.NotSupported,
      todos: {
        status: Status.PartiallySupported,
        collectionId: "opencode/planmode/todos",
      },
    },
    documentation: {
      filesystem: {
        status: Status.Supported,
        collectionId: "opencode/documentation/filesystem",
      },
      tree: Status.NotSupported,
      "multi-file": Status.NotSupported,
      "llms-txt": Status.NotSupported,
      "auto-merge": Status.NotSupported,
      skills: {
        status: Status.Supported,
        collectionId: "opencode/documentation/skills",
      },
      "web-to-docs": Status.NotSupported,
    },
    tools: {
      "web-search-engine": Status.NotSupported,
      "fetch-data": {
        status: Status.Supported,
        collectionId: "opencode/tools/fetch-data",
      },
      browser: Status.NotSupported,
      linters: {
        status: Status.Supported,
        collectionId: "opencode/tools/linters",
      },
    },
    commands: Status.Supported,
    cliCalling: {
      "infinite-tasks-timeout": Status.NotSupported,
      "processes-explorer": Status.NotSupported,
    },
    modelManagement: {
      filtering: {
        status: Status.Supported,
        collectionId: "opencode/modelmanagement/filtering",
      },
      "region-tuning": Status.NotSupported,
    },
    agentMode: {
      debug: Status.NotSupported,
      ask: {
        status: Status.PartiallySupported,
        collectionId: "opencode/agentmode/ask",
      },
    },
    subscriptions: [zai, openai, copilot],
  },
);
