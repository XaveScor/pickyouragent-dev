import type { Agent } from "./Agent";
import type { Feature, AgentValue, ParsedFeature } from "./feature";

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
        const valuesWithAgents: Array<AgentValue<T[typeof key]>> = this.agents.map((agent) => ({
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
}
