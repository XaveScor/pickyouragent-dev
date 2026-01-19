import { declareSchema } from "../featureSetSchema";
import { Status, statusCell } from "../cells";

export const junie = declareSchema(
  {
    id: "junie",
    name: "Junie",
  },
  {
    planMode: statusCell(Status.NotSupported),
    documentation: {
      filesystem: statusCell(Status.Supported),
      tree: statusCell(Status.NotSupported),
      "multi-file": statusCell(Status.NotSupported),
      "llms-txt": statusCell(Status.NotSupported),
      "auto-merge": statusCell(Status.NotSupported),
      skills: statusCell(Status.NotSupported),
      "web-to-docs": statusCell(Status.NotSupported),
    },
    tools: statusCell(Status.NotSupported),
    commands: statusCell(Status.NotSupported),
    cliCalling: {
      "infinite-tasks-timeout": statusCell(Status.NotSupported),
      "processes-explorer": statusCell(Status.NotSupported),
    },
    modelManagement: statusCell(Status.NotSupported),
    agentMode: {
      debug: statusCell(Status.NotSupported),
      ask: statusCell(Status.Supported),
    },
    subscriptions: statusCell(Status.NotSupported),
  },
);
