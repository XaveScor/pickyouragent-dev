import type {
  Feature,
  ParsedFeature,
  AgentValue,
  TableLineRenderData,
  DescriptionPageRenderData,
} from "../../feature";
import StatusFeatureComponent from "./StatusFeature.astro";
import SubfeatureComponent from "./Subfeature.astro";
import DescriptionPageComponent from "./DescriptionPage.astro";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { Status, STATUS_POINTS } from "./status";
import {
  parseFeatureStatus,
  aggregateSubfeatureStatuses,
  StatusSubfeature,
  extractStatus,
  extractCollectionId,
  type ParsedStatusSubfeature,
  type SubfeaturesObject,
  type SubfeatureValue,
} from "./StatusSubfeature";
import { lazyAstroFactory } from "../../../lazyAstroComponent/lazyAstroComponent";

type StatusFeatureValue<Subfeatures extends Record<string, StatusSubfeature>> =
  | Status
  | SubfeaturesObject<Subfeatures>;

type StatusFeatureArgs<Subfeatures extends Record<string, StatusSubfeature>> = {
  name: string;
  mainColor: string;
  secondaryColor: string;
  slug: string;
  weight: number;
  subfeatures?: Subfeatures;
};

class ParsedStatusFeature<
  Subfeatures extends Record<string, StatusSubfeature>,
> implements ParsedFeature {
  constructor(
    private readonly meta: StatusFeatureArgs<Subfeatures>,
    private readonly statusByAgentId: Map<string, Status>,
    private readonly parsedSubfeatures: Array<ParsedStatusSubfeature>,
    private readonly agents: Array<{ id: string; name: string }>,
  ) {}

  get slug(): string {
    return this.meta.slug;
  }

  get name(): string {
    return this.meta.name;
  }

  get mainColor(): string {
    return this.meta.mainColor;
  }

  get secondaryColor(): string {
    return this.meta.secondaryColor;
  }

  get weight(): number {
    return this.meta.weight;
  }

  getSubfeatures(): Array<ParsedStatusSubfeature> {
    return this.parsedSubfeatures;
  }

  getScoreForAgent(agentId: string): number {
    const featureStatus =
      this.statusByAgentId.get(agentId) ?? Status.NotSupported;

    // Base score from feature weight
    const baseScore = this.meta.weight * STATUS_POINTS.feature[featureStatus];

    // Subfeature scores
    const subfeatureScore = this.parsedSubfeatures.reduce(
      (sum, sf) => sum + sf.getScoreForAgent(agentId),
      0,
    );

    return baseScore + subfeatureScore;
  }

  getDescriptionPage(sortedAgentIds: string[]): DescriptionPageRenderData {
    const sortedAgents = sortedAgentIds.map(
      (id) => this.agents.find((a) => a.id === id)!,
    );
    return {
      Component: DescriptionPageComponent,
      props: {
        name: this.meta.name,
        mainColor: this.meta.mainColor,
        subfeatures: this.parsedSubfeatures,
        agents: sortedAgents,
      },
    };
  }

  async getTableLineAsync(
    sortedAgentIds: string[],
  ): Promise<TableLineRenderData> {
    const featureLink = `/features/${this.meta.slug}`;

    return {
      Component: StatusFeatureComponent,
      props: {
        name: this.meta.name,
        slug: this.meta.slug,
        mainColor: this.meta.mainColor,
        secondaryColor: this.meta.secondaryColor,
        statuses: sortedAgentIds.map(
          (id) => this.statusByAgentId.get(id) ?? Status.NotSupported,
        ),
        weight: this.meta.weight,
        agentIds: sortedAgentIds,
      },
      subfeatures: this.parsedSubfeatures.map((subfeature) => ({
        Component: SubfeatureComponent,
        props: {
          mainColor: this.meta.mainColor,
          secondaryColor: this.meta.secondaryColor,
          featureLink,
          featureSlug: this.meta.slug,
          slug: subfeature.slug,
          name: subfeature.displayName,
          statuses: sortedAgentIds.map(
            (id) => subfeature.statusByAgent.get(id) ?? Status.NotSupported,
          ),
          weight: subfeature.weight,
          agentIds: sortedAgentIds,
        },
      })),
    };
  }
}

function parseStatuses<Subfeatures extends Record<string, StatusSubfeature>>(
  values: Array<AgentValue<StatusFeatureValue<Subfeatures>>>,
): Map<string, Status> {
  const result = new Map<string, Status>();
  for (const { value, agentId } of values) {
    const status =
      typeof value === "string" ? value : parseFeatureStatus(value);
    result.set(agentId, status);
  }
  return result;
}

export class StatusFeature<
  Subfeatures extends Record<string, StatusSubfeature>,
> implements Feature<StatusFeatureValue<Subfeatures>> {
  constructor(private readonly args: StatusFeatureArgs<Subfeatures>) {}

  async parseAsync(
    agentValues: Array<AgentValue<StatusFeatureValue<Subfeatures>>>,
  ) {
    const statusByAgentId = parseStatuses(agentValues);

    const subfeatureEntries = Object.entries(
      this.args.subfeatures ?? {},
    ) as Array<[string, StatusSubfeature]>;

    const parsedSubfeatures: ParsedStatusSubfeature[] = [];

    for (const [key, subfeatureDef] of subfeatureEntries) {
      // Build per-agent values for this subfeature
      const subfeatureValues: Array<AgentValue<SubfeatureValue>> = [];
      for (const { value, agentId, agentName } of agentValues) {
        let subfeatureValue: SubfeatureValue;
        if (typeof value === "string") {
          // Agent provided a Status string instead of subfeature object
          // Use the same status for all subfeatures to maintain column alignment
          subfeatureValue = value;
        } else {
          const subfeatureObj = value as SubfeaturesObject<Subfeatures>;
          subfeatureValue = subfeatureObj[key as keyof Subfeatures];
        }
        subfeatureValues.push({
          value: subfeatureValue,
          agentId,
          agentName,
        });
      }

      // Load main content for this subfeature
      let Content: AstroComponentFactory | null = null;
      try {
        Content = await lazyAstroFactory(
          "subfeatures",
          subfeatureDef.subfeatureCollectionId,
        );
      } catch (e) {
        // Content not found, leave as null
      }

      // Load per-agent content based on collectionId from agent's subfeature declaration
      const agentContentById = new Map<string, AstroComponentFactory>();
      for (const { value, agentId } of subfeatureValues) {
        const collectionId = extractCollectionId(value);
        if (collectionId) {
          try {
            const agentContent = await lazyAstroFactory(
              "agentSubfeatures",
              collectionId,
            );
            agentContentById.set(agentId, agentContent);
          } catch (e) {
            // Content not found for this agent, skip
          }
        }
      }

      const parsed = await subfeatureDef.parseAsync(
        subfeatureValues,
        Content,
        agentContentById,
      );
      parsedSubfeatures.push(parsed);
    }

    const agents = agentValues.map(({ agentId, agentName }) => ({
      id: agentId,
      name: agentName,
    }));

    return new ParsedStatusFeature(
      this.args,
      statusByAgentId,
      parsedSubfeatures,
      agents,
    );
  }
}
