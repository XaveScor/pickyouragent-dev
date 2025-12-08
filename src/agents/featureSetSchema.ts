import { z } from 'zod';

export enum FeatureStatus {
  Supported = 'supported',
  PartiallySupported = 'partially-supported',
  NotSupported = 'not-supported',
}
type FeatureMeta = {
  name: string;
}
export const featuresRegistry = z.registry<FeatureMeta>()
function subfeature(name: string) {
  const subfeatureSchema = z.enum(FeatureStatus);
  featuresRegistry.add(subfeatureSchema, {name});
  return subfeatureSchema;
}
function feature<T extends Record<string, z.ZodType>>(meta: FeatureMeta, subfeatures: T) {
  const featureSchema = z.object(subfeatures);
  featuresRegistry.add(featureSchema, meta);
  return featureSchema;
}

export const featureSetSchema = z.object({
  planMode: feature({name: 'Plan Mode'}, {
    'dual-model': subfeature('dual-model'),
  }),
  documentation: feature({name: 'Documentation'}, {
    'filesystem': subfeature('filesystem-documentation'),
    'tree': subfeature('hierarchical-tree'),
    'multi-file': subfeature('multi-file'),
    'llms-txt': subfeature('llms-txt'),
    'auto-merge': subfeature('auto-merge'),
    'partial': subfeature('partial'),
  }),
  tests: feature({name: 'tests'}, {
    'test-generation': subfeature('test-generation'),
    'integrates-with-ci': subfeature('integrates-with-ci'),
    'editor-plugins-available': subfeature('editor-plugins-available'),
  }),
});

type AgentMeta = {
  id: string;
  name: string;
}
export const agentRegistry = z.registry<AgentMeta>()
export function declareSchema<T extends z.infer<typeof featureSetSchema>>(meta: AgentMeta, features: T) {
  return {
    meta,
    features: featureSetSchema.parse(features),
  }
}

export type Agent = ReturnType<typeof declareSchema>;

