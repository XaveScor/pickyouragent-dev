import type { Agent } from '../featureSetSchema';

export const agent = {
  id: 'agent-a',
  name: 'Agent A',
  features: {
    planning: {
      'multi-step-planning': 'supported' as const,
      'plan-editing': 'supported' as const,
      'plan-execution': 'supported' as const,
    },
    reasoning: {
      'explanation-in-natural-language': 'supported' as const,
      'step-by-step-view': 'supported' as const,
    },
    tests: {
      'test-generation': 'not-supported' as const,
      'integrates-with-ci': 'supported' as const,
      'editor-plugins-available': 'supported' as const,
    },
  },
} satisfies Agent;

