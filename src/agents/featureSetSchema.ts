import { z } from 'zod';
import { getCollection, getEntry } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export enum SubFeatureStatus {
  Supported = 'supported',
  PartiallySupported = 'partially-supported',
  NotSupported = 'not-supported',
  NotVerified = 'not-verified',
}

export enum FeatureStatus {
  Supported = 'supported',
  PartiallySupported = 'partially-supported',
  NotSupported = 'not-supported',
  NotVerified = 'not-verified',
}

type FeatureMeta = {
  name: string;
  mainColor: string;
  secondaryColor: string;
  slug?: string;
}

type SubfeatureMeta = {
  name: string;
  description: CollectionEntry<'subfeatures'>;
}

export const featuresRegistry = z.registry<FeatureMeta>();
export const subfeaturesRegistry = z.registry<SubfeatureMeta>();

/**
 * Resolves a markdown file path to a ContentEntryModule.
 * Path should be relative to the content directory (e.g., 'subfeatures/planMode/dual-model/dual-model.md').
 * The filename (last part) should match the subfeatureName in frontmatter.
 * Throws an error if file does not exist, failing the build.
 *
 * Note: This function must be called at the top level with await for Astro's static analysis.
 */
export async function resolveMd(path: string): Promise<CollectionEntry<'subfeatures'>> {
  // Extract featureName and subFeatureName from path
  // Path format: subfeatures/<featureName>/<subFeatureName>/<filename>.md
  const parts = path.split('/');
  if (parts.length < 3) {
    throw new Error(`Invalid path format for resolveMd: ${path}. Expected format: subfeatures/<featureName>/<subFeatureName>/<filename>.md`);
  }
  
  // Get all entries and find by matching frontmatter data
  const allEntries = await getCollection('subfeatures');
  const entry = allEntries.find(e => {
    // Match by featureName and subfeatureName from frontmatter
    return e.data.featureName === parts[1] &&
           e.data.subfeatureName === parts[2].replace(/\.mdx?$/, '');
  });
  
  if (!entry) {
    const allData = allEntries.map(e => `  ${e.id}: featureName=${e.data.featureName}, subfeatureName=${e.data.subfeatureName}`).join('\n');
    throw new Error(`Subfeature markdown file not found: ${path}. Looking for featureName=${parts[1]}, subfeatureName=${parts[2].replace(/\.mdx?$/, '')}.\n\nAvailable entries:\n${allData}`);
  }
  
  return entry;
}

function subfeature(config: { name: string; description: CollectionEntry<'subfeatures'> }) {
  const subfeatureSchema = z.nativeEnum(SubFeatureStatus);
  // Type assertion to work around Astro version compatibility issue with render() method signature
  subfeaturesRegistry.add(subfeatureSchema, { name: config.name, description: config.description as any });
  return subfeatureSchema;
}

function feature<T extends Record<string, z.ZodType>>(meta: FeatureMeta, subfeatures: T) {
  const subfeaturesSchema = z.object(subfeatures);
  const featureSchema = z.union([
    z.nativeEnum(FeatureStatus),
    subfeaturesSchema,
  ]);
  featuresRegistry.add(featureSchema, meta);
  return featureSchema;
}

// Resolve all subfeature descriptions at module level
const dualModelDesc = await resolveMd('subfeatures/planMode/dual-model');
const questionsDesc = await resolveMd('subfeatures/planMode/questions');
const planEditingDesc = await resolveMd('subfeatures/planMode/plan-editing');
const filesystemDesc = await resolveMd('subfeatures/documentation/filesystem');
const treeDesc = await resolveMd('subfeatures/documentation/tree');
const multiFileDesc = await resolveMd('subfeatures/documentation/multi-file');
const llmsTxtDesc = await resolveMd('subfeatures/documentation/llms-txt');
const autoMergeDesc = await resolveMd('subfeatures/documentation/auto-merge');
const skillsDesc = await resolveMd('subfeatures/documentation/skills');
const webToDocsDesc = await resolveMd('subfeatures/documentation/web-to-docs');
const webSearchEngineDesc = await resolveMd('subfeatures/tools/web-search-engine');
const fetchDataDesc = await resolveMd('subfeatures/tools/fetch-data');
const browserDesc = await resolveMd('subfeatures/tools/browser');
const lintersDesc = await resolveMd('subfeatures/tools/linters');
const cliCallingInfiniteTasksTimeoutDesc = await resolveMd('subfeatures/cliCalling/infinite-tasks-timeout');
const cliCallingProcessesExplorerDesc = await resolveMd('subfeatures/cliCalling/processes-explorer');
const modelManagementFilteringDesc = await resolveMd('subfeatures/modelManagement/filtering/filtering.md');

export const featureSetSchema = z.object({
  planMode: feature({
    name: 'Plan Mode',
    mainColor: '#3b82f6',
    secondaryColor: '#60a5fa',
    slug: 'planmode',
  }, {
    'dual-model': subfeature({
      name: 'dual-model',
      description: dualModelDesc,
    }),
    'questions': subfeature({
      name: 'questions',
      description: questionsDesc,
    }),
    'plan-editing': subfeature({
      name: 'plan-editing',
      description: planEditingDesc,
    }),
  }),
  documentation: feature({
    name: 'Documentation',
    mainColor: '#8b5cf6',
    secondaryColor: '#a78bfa',
    slug: 'documentation',
  }, {
    'filesystem': subfeature({
      name: 'filesystem-documentation',
      description: filesystemDesc,
    }),
    'tree': subfeature({
      name: 'hierarchical-tree',
      description: treeDesc,
    }),
    'multi-file': subfeature({
      name: 'multi-file',
      description: multiFileDesc,
    }),
    'llms-txt': subfeature({
      name: 'llms-txt',
      description: llmsTxtDesc,
    }),
    'auto-merge': subfeature({
      name: 'auto-merge',
      description: autoMergeDesc,
    }),
    'skills': subfeature({
      name: 'Partial/Skills.md',
      description: skillsDesc,
    }),
    'web-to-docs': subfeature({
      name: 'web-to-docs',
      description: webToDocsDesc,
    }),
  }),
  tools: feature({
    name: 'Tools',
    mainColor: '#06b6d4',
    secondaryColor: '#22d3ee',
    slug: 'tools',
  }, {
    'web-search-engine': subfeature({
      name: 'web-search-engine',
      description: webSearchEngineDesc,
    }),
    'fetch-data': subfeature({
      name: 'fetch-data',
      description: fetchDataDesc,
    }),
    'browser': subfeature({
      name: 'browser',
      description: browserDesc,
    }),
    'linters': subfeature({
      name: 'linters',
      description: lintersDesc,
    }),
  }),
  commands: feature({
    name: 'Commands',
    mainColor: '#10b981',
    secondaryColor: '#34d399',
    slug: 'commands',
  }, {}),
  cliCalling: feature({
    name: 'CLI Calling',
    mainColor: '#f97316',
    secondaryColor: '#fb923c',
    slug: 'cli-calling',
  }, {
    'infinite-tasks-timeout': subfeature({
      name: 'infinite-tasks-timeout',
      description: cliCallingInfiniteTasksTimeoutDesc,
    }),
    'processes-explorer': subfeature({
      name: 'processes-explorer',
      description: cliCallingProcessesExplorerDesc,
    }),
  }),
  modelManagement: feature({
    name: 'Model management',
    mainColor: '#ec4899',
    secondaryColor: '#f472b6',
    slug: 'model-management',
  }, {
    'filtering': subfeature({
      name: 'filtering',
      description: modelManagementFilteringDesc,
    }),
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
