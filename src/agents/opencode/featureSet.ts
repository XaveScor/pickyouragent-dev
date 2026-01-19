import { declareSchema } from "../featureSetSchema";
import { Status, statusCell, subscriptionsCell } from "../cells";

export const opencode = declareSchema(
  {
    id: "opencode",
    name: "OpenCode",
  },
  {
    planMode: {
      "dual-model": statusCell(Status.Supported),
      questions: statusCell(Status.Supported),
      "plan-editing": statusCell(Status.NotSupported),
      "orchestrator-mode": statusCell(Status.NotSupported),
      todos: statusCell(Status.PartiallySupported),
    },
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
      "web-search-engine": statusCell(Status.NotSupported),
      "fetch-data": statusCell(Status.Supported),
      browser: statusCell(Status.NotSupported),
      linters: statusCell(Status.Supported),
    },
    commands: statusCell(Status.Supported),
    cliCalling: {
      "infinite-tasks-timeout": statusCell(Status.NotSupported),
      "processes-explorer": statusCell(Status.NotSupported),
    },
    modelManagement: {
      filtering: statusCell(Status.Supported),
      "region-tuning": statusCell(Status.NotSupported),
    },
    agentMode: {
      debug: statusCell(Status.NotSupported),
      ask: statusCell(Status.PartiallySupported),
    },
    subscriptions: subscriptionsCell([
      { label: "z.ai", url: "https://z.ai/subscribe?ic=9GRH0KS07Z" },
      { label: "openai", url: "https://chatgpt.com/pricing/" },
      {
        label: "copilot",
        url: "https://github.com/features/copilot/plans",
      },
    ]),
  },
);
