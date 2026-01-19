import { declareSchema } from "../featureSetSchema";
import { Status, statusCell, subscriptionsCell } from "../cells";

export const kiloCode = declareSchema(
  {
    id: "kilo-code",
    name: "Kilo Code",
  },
  {
    planMode: {
      "dual-model": statusCell(Status.Supported),
      questions: statusCell(Status.Supported),
      "plan-editing": statusCell(Status.NotSupported),
      "orchestrator-mode": statusCell(Status.Supported),
      todos: statusCell(Status.PartiallySupported),
    },
    documentation: {
      filesystem: statusCell(Status.Supported),
      tree: statusCell(Status.Supported),
      "multi-file": statusCell(Status.NotSupported),
      "llms-txt": statusCell(Status.NotSupported),
      "auto-merge": statusCell(Status.NotSupported),
      skills: statusCell(Status.Supported),
      "web-to-docs": statusCell(Status.NotSupported),
    },
    tools: {
      "web-search-engine": statusCell(Status.NotSupported),
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
      "region-tuning": statusCell(Status.Supported),
    },
    agentMode: {
      debug: statusCell(Status.Supported),
      ask: statusCell(Status.Supported),
    },
    subscriptions: subscriptionsCell([
      { label: "z.ai", url: "https://z.ai/subscribe?ic=9GRH0KS07Z" },
    ]),
  },
);
