import type { Agent } from "./featureSetSchema";
import { codex } from "./codex/featureSet";
import { claudeCode } from "./claudeCode/featureSet";

export const allAgents: Agent[] = [
    codex,
    claudeCode,
]