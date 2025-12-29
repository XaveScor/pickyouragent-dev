import { z } from 'zod';
import type { Agent } from './featureSetSchema';
import type { CollectionEntry } from 'astro:content';
import { 
  FeatureStatus, 
  SubFeatureStatus, 
  featuresRegistry, 
  subfeaturesRegistry, 
  featureSetSchema 
} from './featureSetSchema';

// Helper function to format display names
function formatDisplayName(key: string): string {
  return key
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Type guard to check if a value is a FeatureStatus enum
function isFeatureStatus(value: any): value is FeatureStatus {
  return typeof value === 'string' && Object.values(FeatureStatus).includes(value as FeatureStatus);
}

// Helper function to aggregate subfeature statuses
function aggregateSubfeatureStatuses(statuses: SubFeatureStatus[]): FeatureStatus {
  if (statuses.length === 0) {
    return FeatureStatus.NotSupported;
  }
  
  const allSupported = statuses.every(s => s === SubFeatureStatus.Supported);
  const allNotSupported = statuses.every(s => s === SubFeatureStatus.NotSupported);
  const allNotVerified = statuses.every(s => s === SubFeatureStatus.NotVerified);
  
  if (allSupported) {
    return FeatureStatus.Supported;
  } else if (allNotVerified) {
    return FeatureStatus.NotVerified;
  } else if (allNotSupported) {
    // If all subfeatures are NotSupported but feature itself is not explicitly NotSupported,
    // show PartiallySupported (not NotSupported)
    return FeatureStatus.PartiallySupported;
  } else {
    // Mix of supported and not-supported subfeatures
    return FeatureStatus.PartiallySupported;
  }
}

// Helper function to aggregate feature statuses
function aggregateFeatureStatuses(statuses: FeatureStatus[]): FeatureStatus {
  if (statuses.length === 0) {
    return FeatureStatus.NotSupported;
  }
  
  const allSupported = statuses.every(s => s === FeatureStatus.Supported);
  const allNotSupported = statuses.every(s => s === FeatureStatus.NotSupported);
  const allNotVerified = statuses.every(s => s === FeatureStatus.NotVerified);
  
  if (allSupported) {
    return FeatureStatus.Supported;
  } else if (allNotVerified) {
    return FeatureStatus.NotVerified;
  } else if (allNotSupported) {
    return FeatureStatus.NotSupported;
  } else {
    // Mix of statuses
    return FeatureStatus.PartiallySupported;
  }
}

// Helper function to get subfeature statuses from a feature object
function getSubfeatureStatuses(featureValue: any, featureKeys: string[]): SubFeatureStatus[] {
  if (isFeatureStatus(featureValue)) {
    return [];
  }
  const featureObj = featureValue as Record<string, SubFeatureStatus>;
  return featureKeys.map((key) => featureObj[key]).filter((s): s is SubFeatureStatus => s !== undefined);
}

// Helper function to get a single subfeature status
function getSubfeatureStatus(featureValue: any, featureKey: string): SubFeatureStatus {
  if (isFeatureStatus(featureValue)) {
    return SubFeatureStatus.NotSupported;
  }
  const featureObj = featureValue as Record<string, SubFeatureStatus>;
  return featureObj[featureKey] || SubFeatureStatus.NotVerified;
}

export class ParsedSubfeature {
  readonly key: string;
  readonly name: string;
  readonly slug: string;
  readonly statusByAgent: Map<string, SubFeatureStatus>;
  readonly aggregatedStatus: FeatureStatus;
  readonly description: CollectionEntry<'subfeatures'>;

  constructor(
    key: string,
    name: string,
    slug: string,
    statusByAgent: Map<string, SubFeatureStatus>,
    description: CollectionEntry<'subfeatures'>
  ) {
    this.key = key;
    this.name = name;
    this.slug = slug;
    this.statusByAgent = statusByAgent;
    this.description = description;
    
    // Aggregate status across all agents
    const statuses = Array.from(statusByAgent.values());
    this.aggregatedStatus = aggregateSubfeatureStatuses(statuses);
  }
}

export class ParsedFeature {
  readonly key: string;
  readonly name: string;
  readonly slug: string;
  readonly mainColor: string;
  readonly secondaryColor: string;
  readonly subfeatures: ParsedSubfeature[];
  readonly aggregatedStatus: FeatureStatus;
  readonly statusByAgent: Map<string, FeatureStatus>;

  constructor(
    key: string,
    name: string,
    slug: string,
    mainColor: string,
    secondaryColor: string,
    subfeatures: ParsedSubfeature[],
    statusByAgent: Map<string, FeatureStatus>
  ) {
    this.key = key;
    this.name = name;
    this.slug = slug;
    this.mainColor = mainColor;
    this.secondaryColor = secondaryColor;
    this.subfeatures = subfeatures;
    this.statusByAgent = statusByAgent;
    
    // Aggregate status across all agents
    const statuses = Array.from(statusByAgent.values());
    this.aggregatedStatus = aggregateFeatureStatuses(statuses);
  }

  getSubfeatures(): ParsedSubfeature[] {
    return this.subfeatures;
  }

  getSubfeature(slug: string): ParsedSubfeature | undefined {
    return this.subfeatures.find(sub => sub.slug === slug || sub.key === slug);
  }
}

export class ParsedTable {
  readonly features: ParsedFeature[];
  readonly agents: Agent[];

  constructor(agents: Agent[]) {
    this.agents = agents;
    this.features = this.parseFeatures();
  }

  getFeatures(): ParsedFeature[] {
    return this.features;
  }

  getFeature(slug: string): ParsedFeature | undefined {
    return this.features.find(f => f.slug === slug || f.key === slug);
  }

  getFeatureByKey(key: string): ParsedFeature | undefined {
    return this.features.find(f => f.key === key);
  }

  private parseFeatures(): ParsedFeature[] {
    const features: ParsedFeature[] = [];
    const categoryOrderEnum = featureSetSchema.keyof().enum;
    const categoryOrder = Object.values(categoryOrderEnum) as (keyof typeof categoryOrderEnum)[];

    for (const categoryKey of categoryOrder) {
      const categorySchema = featureSetSchema.shape[categoryKey];
      const categoryMeta = featuresRegistry.get(categorySchema);
      
      if (!categoryMeta) {
        throw new Error(`Category ${categoryKey} not found in featuresRegistry`);
      }

      // Extract subfeature keys from schema
      const subfeatureKeys: string[] = [];
      const categorySchemaAny = categorySchema as any;
      if (categorySchemaAny instanceof z.ZodUnion) {
        const objectOption = categorySchemaAny.options.find((opt: any) => opt instanceof z.ZodObject);
        if (objectOption instanceof z.ZodObject) {
          subfeatureKeys.push(...Object.keys(objectOption.shape));
        }
      } else if (categorySchemaAny instanceof z.ZodObject) {
        subfeatureKeys.push(...Object.keys(categorySchemaAny.shape));
      }

      // Parse subfeatures
      const parsedSubfeatures: ParsedSubfeature[] = [];
      for (const subfeatureKey of subfeatureKeys) {
        // Get subfeature schema and metadata
        let subfeatureSchema: z.ZodType | undefined;
        if (categorySchemaAny instanceof z.ZodUnion) {
          const objectOption = categorySchemaAny.options.find((opt: any) => opt instanceof z.ZodObject);
          if (objectOption instanceof z.ZodObject) {
            subfeatureSchema = (objectOption.shape as Record<string, z.ZodType>)[subfeatureKey];
          }
        } else if (categorySchemaAny instanceof z.ZodObject) {
          subfeatureSchema = (categorySchemaAny.shape as Record<string, z.ZodType>)[subfeatureKey];
        }

        if (!subfeatureSchema) continue;

        const subfeatureMeta = subfeaturesRegistry.get(subfeatureSchema);
        if (!subfeatureMeta) {
          throw new Error(`Subfeature metadata not found for ${subfeatureKey}`);
        }
        if (!subfeatureMeta.description) {
          throw new Error(`Subfeature description not found for ${subfeatureKey}`);
        }
        
        const subfeatureName = subfeatureMeta.name 
          ? formatDisplayName(subfeatureMeta.name) 
          : formatDisplayName(subfeatureKey);

        // Collect status by agent
        const statusByAgent = new Map<string, SubFeatureStatus>();
        for (const agent of this.agents) {
          const featureValue = agent.features[categoryKey as keyof typeof agent.features];
          const status = getSubfeatureStatus(featureValue, subfeatureKey);
          statusByAgent.set(agent.meta.id, status);
        }

        parsedSubfeatures.push(
          new ParsedSubfeature(
            subfeatureKey,
            subfeatureName,
            subfeatureKey, // Use key as slug for subfeatures
            statusByAgent,
            subfeatureMeta.description as CollectionEntry<'subfeatures'>
          )
        );
      }

      // Collect feature-level status by agent
      const featureStatusByAgent = new Map<string, FeatureStatus>();
      for (const agent of this.agents) {
        const featureValue = agent.features[categoryKey as keyof typeof agent.features];
        
        if (isFeatureStatus(featureValue)) {
          featureStatusByAgent.set(agent.meta.id, featureValue);
        } else {
          // Aggregate subfeature statuses for this agent
          const statuses = getSubfeatureStatuses(featureValue, subfeatureKeys);
          const aggregatedStatus = aggregateSubfeatureStatuses(statuses);
          featureStatusByAgent.set(agent.meta.id, aggregatedStatus);
        }
      }

      const featureName = categoryMeta.name 
        ? formatDisplayName(categoryMeta.name) 
        : formatDisplayName(categoryKey);

      features.push(
        new ParsedFeature(
          categoryKey,
          featureName,
          categoryMeta.slug || categoryKey,
          categoryMeta.mainColor,
          categoryMeta.secondaryColor,
          parsedSubfeatures,
          featureStatusByAgent
        )
      );
    }

    return features;
  }
}

