/**
 * Total score for an agent
 */
export interface AgentScore {
  agentId: string;
  agentName: string;
  totalScore: number;
}

/**
 * Rank agents by their total score (highest first)
 */
export function rankAgents(agents: AgentScore[]): AgentScore[] {
  return [...agents].sort((a, b) => b.totalScore - a.totalScore);
}
