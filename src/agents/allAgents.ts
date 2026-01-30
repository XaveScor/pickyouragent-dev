import type { Agent } from "../cms";
import { codex } from "./codex/featureSet";
import { claudeCode } from "./claudeCode/featureSet";
import { cursor } from "./cursor/featureSet";
import { kiloCode } from "./kiloCode/featureSet";
import { junie } from "./junie/featureSet";
import { opencode } from "./opencode/featureSet";

export const allAgents: Agent<any>[] = [
  cursor,
  claudeCode,
  codex,
  kiloCode,
  junie,
  opencode,
];
