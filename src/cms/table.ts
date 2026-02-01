import type { Agent } from "./Agent";
import type {
  Feature,
  AgentValue,
  ParsedFeature,
  TableLineRenderData,
} from "./feature";
import { rankAgents, type AgentScore } from "./scoring";

export interface TableRenderData {
  sortedAgents: Array<{ id: string; name: string }>;
  features: Array<TableLineRenderData>;
  maxScore: number;
  scoreByAgentId: Map<string, number>;
}

export class Table<T extends Record<string, Feature<any>>> {
  constructor(
    private readonly declaration: T,
    private readonly agents: Array<Agent<T>>,
  ) {}

  getAgents(): Array<Agent<T>> {
    return this.agents;
  }

  async getFeatures(): Promise<Array<ParsedFeature>> {
    const keys = Object.keys(this.declaration) as Array<keyof T>;
    return Promise.all(
      keys.map(async (key) => {
        const feature = this.declaration[key];
        const valuesWithAgents: Array<AgentValue<T[typeof key]>> =
          this.agents.map((agent) => ({
            value: agent[key],
            agentId: agent.id,
            agentName: agent.name,
          }));
        return await feature.parseAsync(valuesWithAgents);
      }),
    );
  }

  async getFeature(slug: string): Promise<ParsedFeature | undefined> {
    const features = await this.getFeatures();
    return features.find((f) => f.slug === slug);
  }

  /**
   * Calculate scores for all agents using feature's getScoreForAgent method
   */
  async getAgentScores(): Promise<AgentScore[]> {
    const features = await this.getFeatures();

    return this.agents.map((agent) => ({
      agentId: agent.id,
      agentName: agent.name,
      totalScore: features.reduce(
        (sum, feature) => sum + feature.getScoreForAgent(agent.id),
        0,
      ),
    }));
  }

  /**
   * Get maximum possible score (sum of all feature weights + subfeature weights)
   */
  async getMaxScore(): Promise<number> {
    const features = await this.getFeatures();

    return features.reduce((sum, feature) => {
      const subfeatures = feature.getSubfeatures?.() ?? [];
      const subfeatureWeights = subfeatures.reduce((s, sf) => s + sf.weight, 0);
      return sum + feature.weight + subfeatureWeights;
    }, 0);
  }

  /**
   * Get agents ranked by their total score (highest first)
   */
  async getRankedAgents(): Promise<AgentScore[]> {
    const scores = await this.getAgentScores();
    return rankAgents(scores);
  }

  /**
   * Get sorted agent IDs (by score descending)
   */
  async getSortedAgentIds(): Promise<string[]> {
    const ranked = await this.getRankedAgents();
    return ranked.map((s) => s.agentId);
  }

  /**
   * Get all data needed to render the comparison table, with agents sorted by score
   */
  async getTableRenderData(): Promise<TableRenderData> {
    const features = await this.getFeatures();

    // Calculate scores
    const scores = this.agents.map((agent) => ({
      agentId: agent.id,
      agentName: agent.name,
      totalScore: features.reduce(
        (sum, feature) => sum + feature.getScoreForAgent(agent.id),
        0,
      ),
    }));

    // Sort by score descending
    const rankedScores = rankAgents(scores);
    const sortedAgentIds = rankedScores.map((s) => s.agentId);

    // Build sorted agents list
    const sortedAgents = sortedAgentIds.map((id) => {
      const agent = this.agents.find((a) => a.id === id)!;
      return { id: agent.id, name: agent.name };
    });

    // Get feature render data with sorted agent order
    const featureRenderData = await Promise.all(
      features.map((feature) => feature.getTableLineAsync(sortedAgentIds)),
    );

    // Calculate max score
    const maxScore = features.reduce((sum, feature) => {
      const subfeatures = feature.getSubfeatures?.() ?? [];
      const subfeatureWeights = subfeatures.reduce((s, sf) => s + sf.weight, 0);
      return sum + feature.weight + subfeatureWeights;
    }, 0);

    // Build score map
    const scoreByAgentId = new Map(
      rankedScores.map((s) => [s.agentId, s.totalScore]),
    );

    return {
      sortedAgents,
      features: featureRenderData,
      maxScore,
      scoreByAgentId,
    };
  }
}
