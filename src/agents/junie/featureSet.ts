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
      filesystem: {
        status: Status.Supported,
        collectionId: "junie/documentation/filesystem",
      },
      tree: Status.NotSupported,
      "multi-file": Status.NotSupported,
      "llms-txt": Status.NotSupported,

      skills: Status.NotSupported,
      "web-to-docs": Status.NotSupported,
    },
    tools: Status.NotSupported,
    commands: Status.NotSupported,
    cliCalling: Status.NotSupported,
    modelManagement: Status.NotSupported,
    specializedModes: {
      debug: {
        status: Status.NotSupported,
        collectionId: "junie/specializedmodes/debug",
      },
      ask: {
        status: Status.Supported,
        collectionId: "junie/specializedmodes/ask",
      },
    },
    subscriptions: [],
  },
);
