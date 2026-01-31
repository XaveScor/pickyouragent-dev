import { declareAgent } from "../featureSetSchema";
import { Status } from "../../cms";
import {
  zai,
  claudeMax,
} from "../../cms/features/SubscriptionsFeature/subscriptions";

export const claudeCode = declareAgent(
  {
    id: "claude-code",
    name: "Claude Code",
  },
  {
    planMode: {
      "dual-model": {
        status: Status.NotSupported,
        collectionId: "claude-code/planmode/dual-model",
      },
      questions: Status.NotVerified,
      "plan-editing": Status.NotVerified,
      "orchestrator-mode": Status.NotVerified,
      todos: {
        status: Status.Supported,
        collectionId: "claude-code/planmode/todos",
      },
    },
    documentation: {
      filesystem: {
        status: Status.Supported,
        collectionId: "claude-code/documentation/filesystem",
      },
      tree: Status.Supported,
      "multi-file": Status.NotSupported,
      "llms-txt": Status.NotSupported,
      "auto-merge": Status.NotSupported,
      skills: Status.NotVerified,
      "web-to-docs": Status.NotSupported,
    },
    tools: {
      "web-search-engine": Status.Supported,
      "fetch-data": {
        status: Status.Supported,
        collectionId: "claude-code/tools/fetch-data",
      },
      browser: Status.NotVerified,
      linters: Status.NotVerified,
    },
    commands: Status.Supported,
    cliCalling: {
      "infinite-tasks-timeout": Status.NotVerified,
      "processes-explorer": Status.NotVerified,
    },
    modelManagement: {
      filtering: Status.NotSupported,
      "region-tuning": Status.NotSupported,
    },
    agentMode: {
      debug: {
        status: Status.NotSupported,
        collectionId: "claude-code/agentmode/debug",
      },
      ask: {
        status: Status.PartiallySupported,
        collectionId: "claude-code/agentmode/ask",
      },
    },
    subscriptions: [zai, claudeMax],
  },
);
