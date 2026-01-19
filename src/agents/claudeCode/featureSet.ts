import { declareSchema } from "../featureSetSchema";
import { Status, statusCell, subscriptionsCell } from "../cells";

export const claudeCode = declareSchema(
  {
    id: "claude-code",
    name: "Claude Code",
  },
  {
    planMode: {
      "dual-model": statusCell(Status.Supported),
      questions: statusCell(Status.NotVerified),
      "plan-editing": statusCell(Status.NotVerified),
      "orchestrator-mode": statusCell(Status.NotVerified),
      todos: statusCell(Status.Supported),
    },
    documentation: {
      filesystem: statusCell(Status.Supported),
      tree: statusCell(Status.Supported),
      "multi-file": statusCell(Status.NotSupported),
      "llms-txt": statusCell(Status.NotSupported),
      "auto-merge": statusCell(Status.NotSupported),
      skills: statusCell(Status.NotVerified),
      "web-to-docs": statusCell(Status.NotSupported),
    },
    tools: {
      "web-search-engine": statusCell(Status.Supported),
      "fetch-data": statusCell(Status.Supported),
      browser: statusCell(Status.NotVerified),
      linters: statusCell(Status.NotVerified),
    },
    commands: statusCell(Status.Supported),
    cliCalling: {
      "infinite-tasks-timeout": statusCell(Status.NotVerified),
      "processes-explorer": statusCell(Status.NotVerified),
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
      { label: "z.ai", url: "https://z.ai/subscribe?ic=9GRH0KS07Z" },
      { label: "max plan", url: "https://claude.com/pricing/max" },
    ]),
  },
);
