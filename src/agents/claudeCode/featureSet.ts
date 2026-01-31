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
      questions: {
        status: Status.PartiallySupported,
        collectionId: "claude-code/planmode/questions",
      },
      "plan-editing": {
        status: Status.Supported,
        collectionId: "claude-code/planmode/plan-editing",
      },
      "orchestrator-mode": Status.NotSupported,
      todos: {
        status: Status.PartiallySupported,
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

      skills: {
        status: Status.Supported,
        collectionId: "claude-code/documentation/skills",
      },
      "web-to-docs": Status.NotSupported,
    },
    tools: {
      "web-search-engine": Status.Supported,
      "fetch-data": {
        status: Status.Supported,
        collectionId: "claude-code/tools/fetch-data",
      },
      browser: {
        status: Status.NotSupported,
        collectionId: "claude-code/tools/browser",
      },
      linters: {
        status: Status.NotSupported,
        collectionId: "claude-code/tools/linters",
      },
    },
    commands: Status.Supported,
    cliCalling: {
      "infinite-tasks-timeout": {
        status: Status.Supported,
        collectionId: "claude-code/cli-calling/infinite-tasks-timeout",
      },
      "processes-explorer": {
        status: Status.PartiallySupported,
        collectionId: "claude-code/cli-calling/processes-explorer",
      },
    },
    modelManagement: {
      filtering: Status.NotSupported,
      "region-tuning": Status.NotSupported,
    },
    specializedModes: {
      debug: {
        status: Status.NotSupported,
        collectionId: "claude-code/specializedmodes/debug",
      },
      ask: Status.NotSupported,
    },
    subscriptions: [zai, claudeMax],
  },
);
