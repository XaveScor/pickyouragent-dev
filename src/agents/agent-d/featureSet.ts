import type { Agent } from '../featureSetSchema';

export const agent = {
  id: 'agent-d',
  name: 'Agent D',
  features: {
    planning: {
      'multi-step-planning': 'not-supported' as const,
      'plan-editing': 'not-supported' as const,
      'plan-execution': 'not-supported' as const,
    },
    reasoning: {
      'explanation-in-natural-language': 'supported' as const,
      'step-by-step-view': 'supported' as const,
    },
    tests: {
      'test-generation': 'not-supported' as const,
      'integrates-with-ci': 'not-supported' as const,
      'editor-plugins-available': 'not-supported' as const,
    },
  },
} satisfies Agent;

