import { z } from "zod";
import type { Agent } from "./featureSetSchema";
import { render } from "astro:content";
import {
  featuresRegistry,
  subfeaturesRegistry,
  featureSetSchema,
} from "./featureSetSchema";
import {
  Status,
  type SubscriptionLink,
  type StatusCell,
  type SubscriptionsCell,
  type Cell,
  statusCell,
  subscriptionsCell,
} from "./cells";

// Helper function to format display names
function formatDisplayName(key: string): string {
  return key
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Type guard to check if a value is a StatusCell
function isStatusCell(value: any): value is StatusCell {
  return (
    value &&
    typeof value === "object" &&
    value.$$type === "status" &&
    typeof value.status === "string" &&
    Object.values(Status).includes(value.status)
  );
}

// Type guard to check if a value is a SubscriptionsCell
function isSubscriptionsCell(value: any): value is SubscriptionsCell {
  return (
    value &&
    typeof value === "object" &&
    value.$$type === "subscriptions" &&
    Array.isArray(value.links)
  );
}

// Helper function to aggregate subfeature statuses
function aggregateSubfeatureStatuses(statuses: Status[]): Status {
  if (statuses.length === 0) {
    return Status.NotSupported;
  }

  const allSupported = statuses.every((s) => s === Status.Supported);
  const allNotSupported = statuses.every((s) => s === Status.NotSupported);
  const allNotVerified = statuses.every((s) => s === Status.NotVerified);

  if (allSupported) {
    return Status.Supported;
  } else if (allNotVerified) {
    return Status.NotVerified;
  } else if (allNotSupported) {
    // If all subfeatures are NotSupported but feature itself is not explicitly NotSupported,
    // show PartiallySupported (not NotSupported)
    return Status.PartiallySupported;
  } else {
    // Mix of supported and not-supported subfeatures
    return Status.PartiallySupported;
  }
}

// Helper function to aggregate feature statuses
function aggregateFeatureStatuses(statuses: Status[]): Status {
  if (statuses.length === 0) {
    return Status.NotSupported;
  }

  const allSupported = statuses.every((s) => s === Status.Supported);
  const allNotSupported = statuses.every((s) => s === Status.NotSupported);
  const allNotVerified = statuses.every((s) => s === Status.NotVerified);

  if (allSupported) {
    return Status.Supported;
  } else if (allNotVerified) {
    return Status.NotVerified;
  } else if (allNotSupported) {
    return Status.NotSupported;
  } else {
    // Mix of statuses
    return Status.PartiallySupported;
  }
}

// Helper function to get subfeature statuses from a feature object
function getSubfeatureStatuses(
  featureValue: any,
  featureKeys: string[],
): Status[] {
  if (isStatusCell(featureValue)) {
    return [featureValue.status];
  }
  if (isSubscriptionsCell(featureValue)) {
    return [];
  }
  const featureObj = featureValue as Record<string, StatusCell>;
  return featureKeys
    .map((key) => featureObj[key]?.status)
    .filter((s): s is Status => s !== undefined);
}

// Helper function to get a single subfeature status
function getSubfeatureStatus(featureValue: any, featureKey: string): Status {
  if (isStatusCell(featureValue)) {
    return featureValue.status;
  }
  if (isSubscriptionsCell(featureValue)) {
    return Status.NotSupported;
  }
  const featureObj = featureValue as Record<string, StatusCell>;
  return featureObj[featureKey]?.status || Status.NotVerified;
}

/**
 * Represents a subfeature with pre-rendered content.
 * All Astro-specific rendering is encapsulated within this class.
 */
export class ParsedSubfeature {
  readonly key: string;
  readonly name: string;
  readonly slug: string;
  readonly statusByAgent: Map<string, Status>;
  readonly aggregatedStatus: Status;
  readonly Content: any;

  constructor(
    key: string,
    name: string,
    slug: string,
    statusByAgent: Map<string, Status>,
    Content: any,
  ) {
    this.key = key;
    this.name = name;
    this.slug = slug;
    this.statusByAgent = statusByAgent;
    this.Content = Content;

    // Aggregate status across all agents
    const statuses = Array.from(statusByAgent.values());
    this.aggregatedStatus = aggregateSubfeatureStatuses(statuses);
  }
}

/**
 * Represents a feature with its subfeatures.
 * Does not directly handle rendering - that's handled at the subfeature level.
 */
export class ParsedFeature {
  readonly key: string;
  readonly name: string;
  readonly slug: string;
  readonly mainColor: string;
  readonly secondaryColor: string;
  readonly subfeatures: ParsedSubfeature[];
  readonly aggregatedStatus: Status;
  readonly statusByAgent: Map<string, Status>;
  readonly linksByAgent: Map<string, SubscriptionLink[]>;
  readonly hasLinks: boolean;

  constructor(
    key: string,
    name: string,
    slug: string,
    mainColor: string,
    secondaryColor: string,
    subfeatures: ParsedSubfeature[],
    statusByAgent: Map<string, Status>,
    linksByAgent: Map<string, SubscriptionLink[]>,
    hasLinks: boolean,
  ) {
    this.key = key;
    this.name = name;
    this.slug = slug;
    this.mainColor = mainColor;
    this.secondaryColor = secondaryColor;
    this.subfeatures = subfeatures;
    this.statusByAgent = statusByAgent;
    this.linksByAgent = linksByAgent;
    this.hasLinks = hasLinks;

    // Aggregate status across all agents
    const statuses = Array.from(statusByAgent.values());
    this.aggregatedStatus = aggregateFeatureStatuses(statuses);
  }

  getSubfeatures(): ParsedSubfeature[] {
    return this.subfeatures;
  }

  getSubfeature(slug: string): ParsedSubfeature | undefined {
    return this.subfeatures.find(
      (sub) => sub.slug === slug || sub.key === slug,
    );
  }

  getLinksByAgent(agentId: string): SubscriptionLink[] {
    return this.linksByAgent.get(agentId) || [];
  }
}

/**
 * Parses a feature and returns cells for rendering.
 * This function simplifies the rendering by pre-computing cells for each agent.
 *
 * @param feature - The feature to parse
 * @param agents - The agents to generate cells for
 * @returns An object containing the feature's cells and subfeatures' cells
 */
export function parseLine(
  feature: ParsedFeature,
  agents: Agent[],
): {
  feature: { name: string; cells: Cell[]; key: string; slug: string };
  subfeatures: Array<{
    name: string;
    cells: Cell[];
    key: string;
    slug: string;
  }>;
} {
  // Build cells for the main feature row
  const featureCells: Cell[] = agents.map((agent) => {
    const links = feature.getLinksByAgent(agent.meta.id);
    if (links.length > 0) {
      return subscriptionsCell(links);
    }
    const status =
      feature.statusByAgent.get(agent.meta.id) || feature.aggregatedStatus;
    return statusCell(status);
  });

  // Build cells for each subfeature
  const subfeaturesCells = feature.getSubfeatures().map((subfeature) => {
    const cells: Cell[] = agents.map((agent) => {
      const status =
        subfeature.statusByAgent.get(agent.meta.id) ||
        subfeature.aggregatedStatus;
      return statusCell(status);
    });
    return {
      name: subfeature.name,
      cells,
      key: subfeature.key,
      slug: subfeature.slug,
    };
  });

  return {
    feature: {
      name: feature.name,
      cells: featureCells,
      key: feature.key,
      slug: feature.slug,
    },
    subfeatures: subfeaturesCells,
  };
}

/**
 * Represents a parsed table of features and agents.
 * All Astro content rendering is encapsulated within this class.
 * Use the static `create()` method to instantiate.
 */
export class ParsedTable {
  readonly features: ParsedFeature[];
  readonly agents: Agent[];

  /**
   * Creates a new ParsedTable instance with pre-rendered content.
   * This factory method is async because it renders all subfeature content.
   */
  static async create(agents: Agent[]): Promise<ParsedTable> {
    const table = new ParsedTable(agents);
    await table.initialize();
    return table;
  }

  private constructor(agents: Agent[]) {
    this.agents = agents;
    this.features = [];
    // Initialize features array, will be populated asynchronously
  }

  /**
   * Initialize the table by parsing features and rendering content.
   * This must be called after construction.
   */
  private async initialize(): Promise<void> {
    (this as any).features = await this.parseFeatures();
  }

  getFeatures(): ParsedFeature[] {
    return this.features;
  }

  getFeature(slug: string): ParsedFeature | undefined {
    return this.features.find((f) => f.slug === slug || f.key === slug);
  }

  getFeatureByKey(key: string): ParsedFeature | undefined {
    return this.features.find((f) => f.key === key);
  }

  private async parseFeatures(): Promise<ParsedFeature[]> {
    const features: ParsedFeature[] = [];
    const categoryOrderEnum = featureSetSchema.keyof().enum;
    const categoryOrder = Object.values(
      categoryOrderEnum,
    ) as (keyof typeof categoryOrderEnum)[];

    for (const categoryKey of categoryOrder) {
      const categorySchema = featureSetSchema.shape[categoryKey];
      const categoryMeta = featuresRegistry.get(categorySchema);

      if (!categoryMeta) {
        throw new Error(
          `Category ${categoryKey} not found in featuresRegistry`,
        );
      }

      // Extract subfeature keys from schema
      const subfeatureKeys: string[] = [];
      const categorySchemaAny = categorySchema as any;
      if (categorySchemaAny instanceof z.ZodUnion) {
        const objectOption = categorySchemaAny.options.find(
          (opt: any) => opt instanceof z.ZodObject,
        );
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
          const objectOption = categorySchemaAny.options.find(
            (opt: any) => opt instanceof z.ZodObject,
          );
          if (objectOption instanceof z.ZodObject) {
            subfeatureSchema = (
              objectOption.shape as Record<string, z.ZodType>
            )[subfeatureKey];
          }
        } else if (categorySchemaAny instanceof z.ZodObject) {
          subfeatureSchema = (
            categorySchemaAny.shape as Record<string, z.ZodType>
          )[subfeatureKey];
        }

        if (!subfeatureSchema) continue;

        const subfeatureMeta = subfeaturesRegistry.get(subfeatureSchema);
        if (!subfeatureMeta) {
          throw new Error(`Subfeature metadata not found for ${subfeatureKey}`);
        }
        if (!subfeatureMeta.description) {
          throw new Error(
            `Subfeature description not found for ${subfeatureKey}`,
          );
        }

        const subfeatureName = subfeatureMeta.name
          ? formatDisplayName(subfeatureMeta.name)
          : formatDisplayName(subfeatureKey);

        // Collect status by agent
        const statusByAgent = new Map<string, Status>();
        for (const agent of this.agents) {
          const featureValue =
            agent.features[categoryKey as keyof typeof agent.features];
          const status = getSubfeatureStatus(featureValue, subfeatureKey);
          statusByAgent.set(agent.meta.id, status);
        }

        const renderedContent = await render(subfeatureMeta.description);

        parsedSubfeatures.push(
          new ParsedSubfeature(
            subfeatureKey,
            subfeatureName,
            subfeatureKey, // Use key as slug for subfeatures
            statusByAgent,
            renderedContent.Content,
          ),
        );
      }

      // Collect feature-level status by agent
      const featureStatusByAgent = new Map<string, Status>();
      for (const agent of this.agents) {
        const featureValue =
          agent.features[categoryKey as keyof typeof agent.features];

        if (isStatusCell(featureValue)) {
          featureStatusByAgent.set(agent.meta.id, featureValue.status);
        } else {
          // Aggregate subfeature statuses for this agent
          const statuses = getSubfeatureStatuses(featureValue, subfeatureKeys);
          const aggregatedStatus = aggregateSubfeatureStatuses(statuses);
          featureStatusByAgent.set(agent.meta.id, aggregatedStatus);
        }
      }

      // Collect links by agent for this feature
      const featureLinksByAgent = new Map<string, SubscriptionLink[]>();
      let featureHasLinks = false;

      for (const agent of this.agents) {
        const featureValue =
          agent.features[categoryKey as keyof typeof agent.features];

        // Check if feature value is a subscriptions cell
        if (isSubscriptionsCell(featureValue)) {
          featureLinksByAgent.set(agent.meta.id, featureValue.links);
          if (featureValue.links.length > 0) {
            featureHasLinks = true;
          }
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
          featureStatusByAgent,
          featureLinksByAgent,
          featureHasLinks,
        ),
      );
    }

    return features;
  }
}
