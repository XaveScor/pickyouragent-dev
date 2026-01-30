import { declareAgent } from "../featureSetSchema";
import { Status } from "../../cms";

export const cursor = declareAgent(
  {
    id: "cursor",
    name: "Cursor",
  },
  {
    planMode: {
      "dual-model": Status.Supported,
      questions: Status.Supported,
      "plan-editing": Status.Supported,
      "orchestrator-mode": Status.NotSupported,
      todos: Status.Supported,
    },
    documentation: {
      filesystem: Status.Supported,
      tree: Status.Supported,
      "multi-file": Status.Supported,
      "llms-txt": Status.Supported,
      "auto-merge": Status.NotSupported,
      skills: Status.Supported,
      "web-to-docs": Status.Supported,
    },
    tools: {
      "web-search-engine": Status.Supported,
      // https://forum.cursor.com/t/agent-cant-web-search-properly/132658/17
      "fetch-data": Status.NotSupported,
      browser: Status.PartiallySupported,
      linters: Status.PartiallySupported,
    },
    commands: Status.Supported,
    cliCalling: {
      "infinite-tasks-timeout": Status.NotSupported,
      "processes-explorer": Status.NotSupported,
    },
    modelManagement: {
      filtering: Status.Supported,
      "region-tuning": Status.PartiallySupported,
    },
    agentMode: {
      debug: Status.Supported,
      ask: Status.Supported,
    },
    subscriptions: [
      { label: "z.ai", url: "https://z.ai/subscribe?ic=9GRH0KS07Z" },
    ],
  },
);
