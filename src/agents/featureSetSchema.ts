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
 * Path should be relative to project root (e.g., 'content/planMode/dual-model/dual-model.md').
 * Files are actually stored in content/subfeatures/ directory for the collection.
 * Throws an error if the file does not exist, failing the build.
 * 
 * Note: This function must be called at the top level with await for Astro's static analysis.
 */
export async function resolveMd(path: string): Promise<CollectionEntry<'subfeatures'>> {
  // Convert path from content/<featureName>/<subFeatureName>/<subFeatureName>.md
  // to collection entry ID: <featureName>/<subFeatureName>/<subFeatureName>
  // Files are stored at content/subfeatures/<featureName>/<subFeatureName>/<subFeatureName>.md
  const pathWithoutContent = path.replace(/^content\//, '');
  const pathWithoutExt = pathWithoutContent.replace(/\.mdx?$/, '');
  
  // Extract featureName and subFeatureName from path
  // Path format: <featureName>/<subFeatureName>/<subFeatureName>
  const parts = pathWithoutExt.split('/');
  if (parts.length < 2) {
    throw new Error(`Invalid path format for resolveMd: ${path}. Expected format: content/<featureName>/<subFeatureName>/<subFeatureName>.md`);
  }
  
  // Try to find the entry by matching the file path
  // First try direct getEntry with the path
  let entry = await getEntry('subfeatures', pathWithoutExt).catch(() => null);
  
  // If that doesn't work, try without the duplicate filename
  if (!entry && parts.length === 3 && parts[1] === parts[2]) {
    entry = await getEntry('subfeatures', `${parts[0]}/${parts[1]}`).catch(() => null);
  }
  
  // If still not found, search through all entries to find a match
  if (!entry) {
    const allEntries = await getCollection('subfeatures');
    // Try to find by matching the data fields or file path
    entry = allEntries.find(e => {
      // Match by featureName and subfeatureName from frontmatter
      const matchesData = e.data.featureName === parts[0] && 
                         (e.data.subfeatureName === parts[1] || e.data.subfeatureName === parts[2]);
      // Or match by entry ID
      const matchesId = e.id === pathWithoutExt || 
                       e.id === `${parts[0]}/${parts[1]}` ||
                       e.id.endsWith(`/${parts[1]}`) ||
                       e.id.endsWith(`/${parts[2]}`);
      return matchesData || matchesId;
    }) || null;
  }
  
  if (!entry) {
    // Get all entry IDs for debugging
    const allEntries = await getCollection('subfeatures');
    const allIds = allEntries.map(e => e.id).join(', ');
    throw new Error(`Subfeature markdown file not found: ${path}. Tried entry IDs: ${pathWithoutExt}${parts.length === 3 && parts[1] === parts[2] ? `, ${parts[0]}/${parts[1]}` : ''}. Available entry IDs: ${allIds}. Expected file at src/content/subfeatures/${pathWithoutExt}.md`);
  }
  
  return entry;
}

function subfeature(config: { name: string; description: CollectionEntry<'subfeatures'> }) {
  const subfeatureSchema = z.nativeEnum(SubFeatureStatus);
  subfeaturesRegistry.add(subfeatureSchema, { name: config.name, description: config.description });
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
const dualModelDesc = await resolveMd('content/planMode/dual-model/dual-model.md');
const questionsDesc = await resolveMd('content/planMode/questions/questions.mdx');
const planEditingDesc = await resolveMd('content/planMode/plan-editing/plan-editing.md');
const filesystemDesc = await resolveMd('content/documentation/filesystem/filesystem.md');
const treeDesc = await resolveMd('content/documentation/tree/tree.md');
const multiFileDesc = await resolveMd('content/documentation/multi-file/multi-file.md');
const llmsTxtDesc = await resolveMd('content/documentation/llms-txt/llms-txt.md');
const autoMergeDesc = await resolveMd('content/documentation/auto-merge/auto-merge.md');
const skillsDesc = await resolveMd('content/documentation/skills/skills.md');
const webToDocsDesc = await resolveMd('content/documentation/web-to-docs/web-to-docs.md');
const searchEngineDesc = await resolveMd('content/tools/search-engine/search-engine.md');
const fetchDataDesc = await resolveMd('content/tools/fetch-data/fetch-data.md');
const browserDesc = await resolveMd('content/tools/browser/browser.md');
const lintersDesc = await resolveMd('content/tools/linters/linters.md');

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
    'search-engine': subfeature({
      name: 'search-engine',
      description: searchEngineDesc,
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

