import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import type { AgentValue, ParsedSubfeature } from "../../feature";
import { Status } from "./status";

type SubfeatureParams = Status;

export type ParsedStatusSubfeature = ParsedSubfeature & {
  statusByAgent: Map<string, Status>;
  aggregatedStatus: Status;
  Content: AstroComponentFactory | null;
  getAgentContent(agentId: string): AstroComponentFactory | undefined;
};

export type SubfeaturesObject<
  Subfeatures extends Record<string, StatusSubfeature>,
> = {
  [k in keyof Subfeatures]: SubfeatureParams;
};

export function parseFeatureStatus<
  Subfeatures extends Record<string, StatusSubfeature>,
>(subfeatures: SubfeaturesObject<Subfeatures>): Status {
  const values = Object.values(subfeatures);
  if (values.every((value) => value === Status.Supported)) {
    return Status.Supported;
  }

  if (values.every((value) => value === Status.NotSupported)) {
    return Status.NotSupported;
  }

  return Status.PartiallySupported;
}

export function aggregateSubfeatureStatuses(statuses: Status[]): Status {
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

type SubfeatureArg = {
  name: string;
  slug: string;
  subfeatureCollectionId: string;
};

export class StatusSubfeature {
  constructor(private readonly arg: SubfeatureArg) {}

  get name(): string {
    return this.arg.name;
  }

  get slug(): string {
    return this.arg.slug;
  }

  get subfeatureCollectionId(): string {
    return this.arg.subfeatureCollectionId;
  }

  async parseAsync(
    values: Array<AgentValue<SubfeatureParams>>,
    Content: AstroComponentFactory | null,
    agentContentById: Map<string, AstroComponentFactory>,
  ): Promise<ParsedStatusSubfeature> {
    const statusByAgent = new Map<string, Status>();
    for (const { value, agentId } of values) {
      statusByAgent.set(agentId, value);
    }

    const statuses = Array.from(statusByAgent.values());
    const aggregatedStatus = aggregateSubfeatureStatuses(statuses);

    return {
      key: this.arg.slug,
      name: this.arg.name,
      slug: this.arg.slug,
      statusByAgent,
      aggregatedStatus,
      Content,
      getAgentContent(agentId: string): AstroComponentFactory | undefined {
        return agentContentById.get(agentId);
      },
    };
  }
}
