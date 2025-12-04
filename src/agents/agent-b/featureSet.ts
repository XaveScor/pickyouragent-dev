import type { Agent } from '../featureSetSchema';

export const agent = {
  id: 'agent-b',
  name: 'Agent B',
  features: {
    planning: {
      'multi-step-planning': 'not-supported' as const,
      'plan-editing': 'not-supported' as const,
      'plan-execution': 'supported' as const,
    },
    reasoning: {
      'explanation-in-natural-language': 'partially-supported' as const,
      'step-by-step-view': 'not-supported' as const,
    },
    tests: {
      'test-generation': 'supported' as const,
      'integrates-with-ci': 'supported' as const,
      'editor-plugins-available': 'not-supported' as const,
    },
  },
} satisfies Agent;

