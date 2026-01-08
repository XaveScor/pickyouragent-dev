import { allAgents } from "../agents/allAgents";

export default async function run(Astro: any) {
  return {
    agents: allAgents.map((agent) => ({
      id: agent.meta.id,
      name: agent.meta.name,
      features: agent.features,
    })),
    metadata: {
      script: "list-agents",
      timestamp: new Date().toISOString(),
      totalAgents: allAgents.length,
    },
  };
}
