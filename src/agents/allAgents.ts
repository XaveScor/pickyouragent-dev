import type { Agent } from "./featureSetSchema";
import { codex } from "./codex/featureSet";
import { claudeCode } from "./claudeCode/featureSet";
import { cursor } from "./cursor/featureSet";
import { kiloCode } from "./kiloCode/featureSet";

export const allAgents: Agent[] = [cursor, claudeCode, codex, kiloCode];
