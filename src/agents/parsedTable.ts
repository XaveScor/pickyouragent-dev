import { z } from "zod";
import type { Agent } from "./featureSetSchema";
import { render, getCollection } from "astro:content";
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
  StatusCellView,
  SubscriptionsCellView,
  type Cell as CellsCell,
} from "./cells";

export type Cell = CellsCell;

function formatDisplayName(key: string): string {
  return key
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function isStatusCell(value: any): value is StatusCell {
  return (
    value &&
    typeof value === "object" &&
    value.$$type === "status" &&
    typeof value.status === "string" &&
    Object.values(Status).includes(value.status)
  );
}

function isSubscriptionsCell(value: any): value is SubscriptionsCell {
  return (
    value &&
    typeof value === "object" &&
    value.$$type === "subscriptions" &&
    Array.isArray(value.links)
  );
}

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
    return Status.PartiallySupported;
  } else {
    return Status.PartiallySupported;
  }
}

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
    return Status.PartiallySupported;
  }
}

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

export async function resolveAgentSubfeature(id: string): Promise<any | null> {
  const allEntries = await getCollection("agentSubfeatures");
  const entry = allEntries.find((e) => e.id === id);

  if (!entry) {
    return null;
  }

  return entry;
}

export interface Line<TCell extends Cell> {
  getDescription(): string;
  getSlug(): string;
  getKey(): string;
  getCells(): Array<TCell>;
}

export class StatusLine implements Line<StatusCellView> {
  #name: string;
  #slug: string;
  #key: string;
  #cells: StatusCellView[];

  constructor(
    name: string,
    slug: string,
    key: string,
    cells: StatusCellView[],
  ) {
    this.#name = name;
    this.#slug = slug;
    this.#key = key;
    this.#cells = cells;
  }

  getDescription() {
    return this.#name;
  }

  getSlug() {
    return this.#slug;
  }

  getKey() {
    return this.#key;
  }

  getCells() {
    return this.#cells;
  }
}

export class SubfeatureLine implements Line<StatusCellView> {
  #name: string;
  #slug: string;
  #key: string;
  #cells: StatusCellView[];

  constructor(
    name: string,
    slug: string,
    key: string,
    cells: StatusCellView[],
  ) {
    this.#name = name;
    this.#slug = slug;
    this.#key = key;
    this.#cells = cells;
  }

  getDescription() {
    return this.#name;
  }

  getSlug() {
    return this.#slug;
  }

  getKey() {
    return this.#key;
  }

  getCells() {
    return this.#cells;
  }
}

export class SubscriptionsLine implements Line<SubscriptionsCellView> {
  #name: string;
  #slug: string;
  #key: string;
  #cells: SubscriptionsCellView[];

  constructor(
    name: string,
    slug: string,
    key: string,
    cells: SubscriptionsCellView[],
  ) {
    this.#name = name;
    this.#slug = slug;
    this.#key = key;
    this.#cells = cells;
  }

  getDescription() {
    return this.#name;
  }

  getSlug() {
    return this.#slug;
  }

  getKey() {
    return this.#key;
  }

  getCells() {
    return this.#cells;
  }
}

export class StatusSubfeature {
  readonly key: string;
  readonly name: string;
  readonly slug: string;
  readonly statusByAgent: Map<string, Status>;
  readonly aggregatedStatus: Status;
  readonly Content: any;
  readonly agentContentById: Map<string, any>;

  constructor(
    key: string,
    name: string,
    slug: string,
    statusByAgent: Map<string, Status>,
    Content: any,
    agentContentById: Map<string, any> = new Map(),
  ) {
    this.key = key;
    this.name = name;
    this.slug = slug;
    this.statusByAgent = statusByAgent;
    this.Content = Content;
    this.agentContentById = agentContentById;

    const statuses = Array.from(statusByAgent.values());
    this.aggregatedStatus = aggregateSubfeatureStatuses(statuses);
  }

  getAgentContent(agentId: string): any | undefined {
    return this.agentContentById.get(agentId);
  }
}

export abstract class Feature {
  readonly key: string;
  readonly name: string;
  readonly slug: string;
  readonly mainColor: string;
  readonly secondaryColor: string;

  constructor(
    key: string,
    name: string,
    slug: string,
    mainColor: string,
    secondaryColor: string,
  ) {
    this.key = key;
    this.name = name;
    this.slug = slug;
    this.mainColor = mainColor;
    this.secondaryColor = secondaryColor;
  }

  abstract getLines(): Line<Cell>[];
}

export class StatusFeature extends Feature {
  readonly subfeatures: StatusSubfeature[];
  readonly statusByAgent: Map<string, Status>;
  readonly aggregatedStatus: Status;

  constructor(
    key: string,
    name: string,
    slug: string,
    mainColor: string,
    secondaryColor: string,
    subfeatures: StatusSubfeature[],
    statusByAgent: Map<string, Status>,
  ) {
    super(key, name, slug, mainColor, secondaryColor);
    this.subfeatures = subfeatures;
    this.statusByAgent = statusByAgent;

    const statuses = Array.from(statusByAgent.values());
    this.aggregatedStatus = aggregateFeatureStatuses(statuses);
  }

  getSubfeatures(): StatusSubfeature[] {
    return this.subfeatures;
  }

  getSubfeature(slug: string): StatusSubfeature | undefined {
    return this.subfeatures.find(
      (sub) => sub.slug === slug || sub.key === slug,
    );
  }

  getLines(): Line<StatusCellView>[] {
    const statusCells: StatusCellView[] = Array.from(
      this.statusByAgent.values(),
    ).map((status) => new StatusCellView(status));

    const statusLine = new StatusLine(
      this.name,
      this.slug,
      this.key,
      statusCells,
    );

    const subfeatureLines = this.subfeatures.map((subfeature) => {
      const cells = Array.from(subfeature.statusByAgent.values()).map(
        (status) => new StatusCellView(status),
      );
      return new SubfeatureLine(
        subfeature.name,
        subfeature.slug,
        subfeature.key,
        cells,
      );
    });

    return [statusLine, ...subfeatureLines];
  }
}

export class SubscriptionsFeature extends Feature {
  readonly linksByAgent: Map<string, SubscriptionLink[]>;

  constructor(
    key: string,
    name: string,
    slug: string,
    mainColor: string,
    secondaryColor: string,
    linksByAgent: Map<string, SubscriptionLink[]>,
  ) {
    super(key, name, slug, mainColor, secondaryColor);
    this.linksByAgent = linksByAgent;
  }

  getLinksByAgent(agentId: string): SubscriptionLink[] {
    return this.linksByAgent.get(agentId) || [];
  }

  getLines(): Line<SubscriptionsCellView>[] {
    const cells = Array.from(this.linksByAgent.values()).map(
      (links) => new SubscriptionsCellView(links, this.mainColor),
    );
    return [new SubscriptionsLine(this.name, this.slug, this.key, cells)];
  }
}

export type AnyFeature = StatusFeature | SubscriptionsFeature;

export class ParsedTable {
  readonly features: AnyFeature[];
  readonly agents: Agent[];

  static async create(agents: Agent[]): Promise<ParsedTable> {
    const table = new ParsedTable(agents);
    await table.initialize();
    return table;
  }

  private constructor(agents: Agent[]) {
    this.agents = agents;
    this.features = [];
  }

  private async initialize(): Promise<void> {
    (this as any).features = await this.parseFeatures();
  }

  getFeatures(): AnyFeature[] {
    return this.features;
  }

  getFeature(slug: string): AnyFeature | undefined {
    return this.features.find((f) => f.slug === slug || f.key === slug);
  }

  getFeatureByKey(key: string): AnyFeature | undefined {
    return this.features.find((f) => f.key === key);
  }

  private async parseFeatures(): Promise<AnyFeature[]> {
    const features: AnyFeature[] = [];
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

      const categorySchemaAny = categorySchema as any;
      const subfeatureKeys: string[] = [];

      if (categoryMeta.kind !== "subscriptions") {
        if (categorySchemaAny instanceof z.ZodUnion) {
          const objectOption = categorySchemaAny.options.find(
            (opt: any) => opt instanceof z.ZodObject,
          );
          if (objectOption instanceof z.ZodObject) {
            const keys = Object.keys(objectOption.shape);
            subfeatureKeys.push(
              ...keys.filter(
                (k) => !["$$type", "status", "detailsId", "links"].includes(k),
              ),
            );
          }
        } else if (categorySchemaAny instanceof z.ZodObject) {
          const keys = Object.keys(categorySchemaAny.shape);
          subfeatureKeys.push(
            ...keys.filter(
              (k) => !["$$type", "status", "detailsId", "links"].includes(k),
            ),
          );
        }
      }

      const parsedSubfeatures: StatusSubfeature[] = [];
      for (const subfeatureKey of subfeatureKeys) {
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

        const statusByAgent = new Map<string, Status>();
        const detailsIdByAgent = new Map<string, string | undefined>();
        for (const agent of this.agents) {
          const featureValue =
            agent.features[categoryKey as keyof typeof agent.features];
          const status = getSubfeatureStatus(featureValue, subfeatureKey);
          statusByAgent.set(agent.meta.id, status);

          if (isStatusCell(featureValue)) {
            detailsIdByAgent.set(agent.meta.id, undefined);
          } else if (!isSubscriptionsCell(featureValue)) {
            const featureObj = featureValue as Record<string, StatusCell>;
            detailsIdByAgent.set(
              agent.meta.id,
              featureObj[subfeatureKey]?.detailsId,
            );
          } else {
            detailsIdByAgent.set(agent.meta.id, undefined);
          }
        }

        const renderedContent = await render(subfeatureMeta.description);

        const agentContentById = new Map<string, any>();
        for (const agent of this.agents) {
          const detailsId = detailsIdByAgent.get(agent.meta.id);
          if (detailsId) {
            const agentEntry = await resolveAgentSubfeature(detailsId);
            if (agentEntry) {
              const agentRenderedContent = await render(agentEntry);
              agentContentById.set(agent.meta.id, agentRenderedContent.Content);
            }
          }
        }

        parsedSubfeatures.push(
          new StatusSubfeature(
            subfeatureKey,
            subfeatureName,
            subfeatureKey,
            statusByAgent,
            renderedContent.Content,
            agentContentById,
          ),
        );
      }

      const featureStatusByAgent = new Map<string, Status>();
      for (const agent of this.agents) {
        const featureValue =
          agent.features[categoryKey as keyof typeof agent.features];

        if (isStatusCell(featureValue)) {
          featureStatusByAgent.set(agent.meta.id, featureValue.status);
        } else {
          const statuses = getSubfeatureStatuses(featureValue, subfeatureKeys);
          const aggregatedStatus = aggregateSubfeatureStatuses(statuses);
          featureStatusByAgent.set(agent.meta.id, aggregatedStatus);
        }
      }

      const featureLinksByAgent = new Map<string, SubscriptionLink[]>();

      for (const agent of this.agents) {
        const featureValue =
          agent.features[categoryKey as keyof typeof agent.features];

        if (isSubscriptionsCell(featureValue)) {
          featureLinksByAgent.set(agent.meta.id, featureValue.links);
        }
      }

      const featureName = categoryMeta.name
        ? formatDisplayName(categoryMeta.name)
        : formatDisplayName(categoryKey);

      if (categoryMeta.kind === "subscriptions") {
        features.push(
          new SubscriptionsFeature(
            categoryKey,
            featureName,
            categoryMeta.slug || categoryKey,
            categoryMeta.mainColor,
            categoryMeta.secondaryColor,
            featureLinksByAgent,
          ),
        );
      } else {
        features.push(
          new StatusFeature(
            categoryKey,
            featureName,
            categoryMeta.slug || categoryKey,
            categoryMeta.mainColor,
            categoryMeta.secondaryColor,
            parsedSubfeatures,
            featureStatusByAgent,
          ),
        );
      }
    }

    return features;
  }
}

type ParsedFeature = StatusFeature | SubscriptionsFeature;
type ParsedSubfeature = StatusSubfeature;
