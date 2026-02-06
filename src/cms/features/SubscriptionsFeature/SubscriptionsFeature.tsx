import type {
  Feature,
  ParsedFeature,
  AgentValue,
  TableLineRenderData,
  DescriptionPageRenderData,
} from "../../feature";
import SubscriptionsFeatureComponent from "./SubscriptionsFeature.astro";
import DescriptionPageComponent from "./DescriptionPage.astro";
import type { SubscriptionLink } from "./subscriptions";

type SubscriptionsFeatureArgs = {
  name: string;
  mainColor: string;
  secondaryColor: string;
  slug: string;
  weight: number;
};

type AgentSubscriptionData = {
  agentId: string;
  agentName: string;
  links: SubscriptionLink[];
};

class ParsedSubscriptionsFeature implements ParsedFeature {
  constructor(
    private readonly meta: SubscriptionsFeatureArgs,
    private readonly linksByAgentId: Map<string, SubscriptionLink[]>,
    private readonly agentData: Array<AgentSubscriptionData>,
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

  getScoreForAgent(_agentId: string): number {
    // Subscriptions always returns 0 (weight is 0, not a scoring feature)
    return 0;
  }

  getDescriptionPage(sortedAgentIds: string[]): DescriptionPageRenderData {
    const sortedAgentData = sortedAgentIds.map(
      (id) => this.agentData.find((a) => a.agentId === id)!,
    );
    return {
      Component: DescriptionPageComponent,
      props: {
        name: this.meta.name,
        mainColor: this.meta.mainColor,
        agents: sortedAgentData,
      },
    };
  }

  async getTableLineAsync(
    sortedAgentIds: string[],
  ): Promise<TableLineRenderData> {
    return {
      Component: SubscriptionsFeatureComponent,
      props: {
        name: this.meta.name,
        slug: this.meta.slug,
        mainColor: this.meta.mainColor,
        secondaryColor: this.meta.secondaryColor,
        linksByAgent: sortedAgentIds.map(
          (id) => this.linksByAgentId.get(id) ?? [],
        ),
        agentIds: sortedAgentIds,
      },
    };
  }
}

export class SubscriptionsFeature implements Feature<SubscriptionLink[]> {
  constructor(private readonly args: SubscriptionsFeatureArgs) {}

  async parseAsync(agentValues: Array<AgentValue<SubscriptionLink[]>>) {
    const linksByAgentId = new Map<string, SubscriptionLink[]>();
    for (const { value, agentId } of agentValues) {
      linksByAgentId.set(agentId, value);
    }

    const agentData = agentValues.map(({ value, agentId, agentName }) => ({
      agentId,
      agentName,
      links: value,
    }));

    return new ParsedSubscriptionsFeature(this.args, linksByAgentId, agentData);
  }
}
