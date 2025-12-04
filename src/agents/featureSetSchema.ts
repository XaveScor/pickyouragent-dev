export type FeatureStatus = 'supported' | 'partially-supported' | 'not-supported';

export type FeatureSet = {
  planning: {
    'multi-step-planning': FeatureStatus;
    'plan-editing': FeatureStatus;
    'plan-execution': FeatureStatus;
  };
  reasoning: {
    'explanation-in-natural-language': FeatureStatus;
    'step-by-step-view': FeatureStatus;
  };
  tests: {
    'test-generation': FeatureStatus;
    'integrates-with-ci': FeatureStatus;
    'editor-plugins-available': FeatureStatus;
  };
};

export type Agent = {
  id: string;
  name: string;
  features: FeatureSet;
};

