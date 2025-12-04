import type { Agent } from '../featureSetSchema';

export const agent = {
  id: 'agent-c',
  name: 'Agent C',
  features: {
    planning: {
      'multi-step-planning': 'not-supported' as const,
      'plan-editing': 'supported' as const,
      'plan-execution': 'supported' as const,
    },
    reasoning: {
      'explanation-in-natural-language': 'not-supported' as const,
      'step-by-step-view': 'supported' as const,
    },
    tests: {
      'test-generation': 'supported' as const,
      'integrates-with-ci': 'not-supported' as const,
      'editor-plugins-available': 'supported' as const,
    },
  },
} satisfies Agent;

