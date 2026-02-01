import { describe, test, expect } from "vitest";
import { rankAgents, type AgentScore } from "./scoring";

describe("rankAgents", () => {
  test("sorts agents by totalScore descending", () => {
    const agents: AgentScore[] = [
      { agentId: "a", agentName: "Agent A", totalScore: 50 },
      { agentId: "b", agentName: "Agent B", totalScore: 100 },
      { agentId: "c", agentName: "Agent C", totalScore: 75 },
    ];

    const result = rankAgents(agents);

    expect(result).toEqual([
      { agentId: "b", agentName: "Agent B", totalScore: 100 },
      { agentId: "c", agentName: "Agent C", totalScore: 75 },
      { agentId: "a", agentName: "Agent A", totalScore: 50 },
    ]);
  });

  test("does not modify the original array", () => {
    const agents: AgentScore[] = [
      { agentId: "a", agentName: "Agent A", totalScore: 50 },
      { agentId: "b", agentName: "Agent B", totalScore: 100 },
    ];

    const originalOrder = [...agents];
    rankAgents(agents);

    expect(agents).toEqual(originalOrder);
  });

  test("handles empty array", () => {
    const result = rankAgents([]);
    expect(result).toEqual([]);
  });

  test("handles single agent", () => {
    const agents: AgentScore[] = [
      { agentId: "a", agentName: "Agent A", totalScore: 50 },
    ];

    const result = rankAgents(agents);

    expect(result).toEqual([
      { agentId: "a", agentName: "Agent A", totalScore: 50 },
    ]);
  });

  test("handles agents with equal scores", () => {
    const agents: AgentScore[] = [
      { agentId: "a", agentName: "Agent A", totalScore: 75 },
      { agentId: "b", agentName: "Agent B", totalScore: 75 },
      { agentId: "c", agentName: "Agent C", totalScore: 50 },
    ];

    const result = rankAgents(agents);

    // Both agents with score 75 should be before agent with score 50
    expect(result[0].totalScore).toBe(75);
    expect(result[1].totalScore).toBe(75);
    expect(result[2].totalScore).toBe(50);
    expect(result[2].agentId).toBe("c");
  });
});
