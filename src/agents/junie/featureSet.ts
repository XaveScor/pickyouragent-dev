import { declareAgent } from "../featureSetSchema";
import { Status } from "../../cms";

export const junie = declareAgent(
  {
    id: "junie",
    name: "Junie",
  },
  {
    planMode: Status.NotSupported,
    documentation: {
      filesystem: Status.Supported,
      tree: Status.NotSupported,
      "multi-file": Status.NotSupported,
      "llms-txt": Status.NotSupported,
      "auto-merge": Status.NotSupported,
      skills: Status.NotSupported,
      "web-to-docs": Status.NotSupported,
    },
    tools: Status.NotSupported,
    commands: Status.NotSupported,
    cliCalling: {
      "infinite-tasks-timeout": Status.NotSupported,
      "processes-explorer": Status.NotSupported,
    },
    modelManagement: Status.NotSupported,
    agentMode: {
      debug: Status.NotSupported,
      ask: Status.Supported,
    },
    subscriptions: [],
  },
);
