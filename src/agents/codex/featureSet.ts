import { declareSchema } from "../featureSetSchema";
import { Status, statusCell, subscriptionsCell } from "../cells";

export const codex = declareSchema(
  {
    id: "codex",
    name: "Codex",
  },
  {
    planMode: statusCell(Status.NotSupported),
    documentation: {
      filesystem: statusCell(Status.Supported),
      tree: statusCell(Status.NotSupported),
      "multi-file": statusCell(Status.NotSupported),
      "llms-txt": statusCell(Status.NotSupported),
      "auto-merge": statusCell(Status.NotSupported),
      skills: statusCell(Status.Supported),
      "web-to-docs": statusCell(Status.NotSupported),
    },
    tools: {
      "web-search-engine": statusCell(Status.Supported),
      "fetch-data": statusCell(Status.NotSupported),
      browser: statusCell(Status.NotSupported),
      linters: statusCell(Status.NotSupported),
    },
    commands: statusCell(Status.Supported),
    cliCalling: {
      "infinite-tasks-timeout": statusCell(Status.NotSupported),
      "processes-explorer": statusCell(Status.NotSupported),
    },
    modelManagement: {
      filtering: statusCell(Status.NotSupported),
      "region-tuning": statusCell(Status.NotSupported),
    },
    agentMode: {
      debug: statusCell(Status.NotSupported),
      ask: statusCell(Status.PartiallySupported),
    },
    subscriptions: subscriptionsCell([
      { label: "openai", url: "https://chatgpt.com/pricing/" },
    ]),
  },
);
