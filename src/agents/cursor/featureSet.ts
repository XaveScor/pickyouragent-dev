import { declareSchema } from "../featureSetSchema";
import { Status, statusCell, subscriptionsCell } from "../cells";

export const cursor = declareSchema(
  {
    id: "cursor",
    name: "Cursor",
  },
  {
    planMode: {
      "dual-model": statusCell(Status.Supported),
      questions: statusCell(Status.Supported),
      "plan-editing": statusCell(Status.Supported),
      "orchestrator-mode": statusCell(Status.NotSupported),
      todos: statusCell(Status.Supported),
    },
    documentation: {
      filesystem: statusCell(Status.Supported),
      tree: statusCell(Status.Supported),
      "multi-file": statusCell(Status.Supported),
      "llms-txt": statusCell(Status.Supported),
      "auto-merge": statusCell(Status.NotSupported),
      skills: statusCell(Status.Supported),
      "web-to-docs": statusCell(Status.Supported),
    },
    tools: {
      "web-search-engine": statusCell(Status.Supported),
      // https://forum.cursor.com/t/agent-cant-web-search-properly/132658/17
      "fetch-data": statusCell(Status.NotSupported),
      browser: statusCell(Status.PartiallySupported),
      linters: statusCell(Status.PartiallySupported),
    },
    commands: statusCell(Status.Supported),
    cliCalling: {
      "infinite-tasks-timeout": statusCell(Status.NotSupported),
      "processes-explorer": statusCell(Status.NotSupported),
    },
    modelManagement: {
      filtering: statusCell(Status.Supported),
      "region-tuning": statusCell(Status.PartiallySupported),
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
