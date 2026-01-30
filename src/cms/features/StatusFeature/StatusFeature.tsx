import type { Feature, ParsedFeature, AgentValue, TableLineRenderData } from "../../feature";
import StatusFeatureComponent from "./StatusFeature.astro";
import SubfeatureComponent from "./Subfeature.astro";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { Status } from "./status";
import {
  parseFeatureStatus,
  aggregateSubfeatureStatuses,
  StatusSubfeature,
  type ParsedStatusSubfeature,
  type SubfeaturesObject,
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
  subfeatures?: Subfeatures;
};

class ParsedStatusFeature<
  Subfeatures extends Record<string, StatusSubfeature>,
> implements ParsedFeature {
  constructor(
    private readonly meta: StatusFeatureArgs<Subfeatures>,
    private readonly featureStatuses: Array<Status>,
    private readonly parsedSubfeatures: Array<ParsedStatusSubfeature>,
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

  getSubfeatures(): Array<ParsedStatusSubfeature> {
    return this.parsedSubfeatures;
  }

  async getTableLineAsync(): Promise<TableLineRenderData> {
    const featureLink = `/features/${this.meta.slug}`;

    return {
      Component: StatusFeatureComponent,
      props: {
        name: this.meta.name,
        slug: this.meta.slug,
        mainColor: this.meta.mainColor,
        secondaryColor: this.meta.secondaryColor,
        statuses: this.featureStatuses,
      },
      subfeatures: this.parsedSubfeatures.map((subfeature) => ({
        Component: SubfeatureComponent,
        props: {
          mainColor: this.meta.mainColor,
          secondaryColor: this.meta.secondaryColor,
          featureLink,
          slug: subfeature.slug,
          name: subfeature.displayName,
          statuses: Array.from(subfeature.statusByAgent.values()),
        },
      })),
    };
  }
}

function parseStatuses<Subfeatures extends Record<string, StatusSubfeature>>(
  values: Array<AgentValue<StatusFeatureValue<Subfeatures>>>,
): Array<Status> {
  return values.map(({ value }) => {
    if (typeof value === "string") {
      return value;
    }

    return parseFeatureStatus(value);
  });
}

export class StatusFeature<
  Subfeatures extends Record<string, StatusSubfeature>,
> implements Feature<StatusFeatureValue<Subfeatures>> {
  constructor(private readonly args: StatusFeatureArgs<Subfeatures>) {}

  async parseAsync(agentValues: Array<AgentValue<StatusFeatureValue<Subfeatures>>>) {
    const featureStatuses = parseStatuses(agentValues);

    const subfeatureEntries = Object.entries(this.args.subfeatures ?? {}) as Array<
      [string, StatusSubfeature]
    >;

    const parsedSubfeatures: ParsedStatusSubfeature[] = [];

    for (const [key, subfeatureDef] of subfeatureEntries) {
      // Build per-agent values for this subfeature
      const subfeatureValues: Array<AgentValue<Status>> = [];
      for (const { value, agentId, agentName } of agentValues) {
        let subfeatureStatus: Status;
        if (typeof value === "string") {
          // Agent provided a Status string instead of subfeature object
          // Use the same status for all subfeatures to maintain column alignment
          subfeatureStatus = value;
        } else {
          const subfeatureObj = value as SubfeaturesObject<Subfeatures>;
          subfeatureStatus = subfeatureObj[key as keyof Subfeatures] as Status;
        }
        subfeatureValues.push({
          value: subfeatureStatus,
          agentId,
          agentName,
        });
      }

      // Load main content for this subfeature
      let Content: AstroComponentFactory | null = null;
      try {
        Content = await lazyAstroFactory("subfeatures", subfeatureDef.subfeatureCollectionId);
      } catch (e) {
        // Content not found, leave as null
      }

      // Load per-agent content (not implemented yet, would need detailsId in agent data)
      const agentContentById = new Map<string, AstroComponentFactory>();

      const parsed = await subfeatureDef.parseAsync(subfeatureValues, Content, agentContentById);
      parsedSubfeatures.push(parsed);
    }

    return new ParsedStatusFeature(this.args, featureStatuses, parsedSubfeatures);
  }
}
