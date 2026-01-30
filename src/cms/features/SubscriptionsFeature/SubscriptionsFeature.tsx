import type { Feature, ParsedFeature, AgentValue, TableLineRenderData } from "../../feature";
import SubscriptionsFeatureComponent from "./SubscriptionsFeature.astro";
import type { SubscriptionLink } from "./subscriptions";

type SubscriptionsFeatureArgs = {
  name: string;
  mainColor: string;
  secondaryColor: string;
  slug: string;
};

class ParsedSubscriptionsFeature implements ParsedFeature {
  constructor(
    private readonly meta: SubscriptionsFeatureArgs,
    private readonly linksByAgent: Array<SubscriptionLink[]>,
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

  async getTableLineAsync(): Promise<TableLineRenderData> {
    return {
      Component: SubscriptionsFeatureComponent,
      props: {
        name: this.meta.name,
        slug: this.meta.slug,
        mainColor: this.meta.mainColor,
        secondaryColor: this.meta.secondaryColor,
        linksByAgent: this.linksByAgent,
      },
    };
  }
}

export class SubscriptionsFeature implements Feature<SubscriptionLink[]> {
  constructor(private readonly args: SubscriptionsFeatureArgs) {}

  async parseAsync(agentValues: Array<AgentValue<SubscriptionLink[]>>) {
    const linksByAgent = agentValues.map(({ value }) => value);
    return new ParsedSubscriptionsFeature(this.args, linksByAgent);
  }
}
