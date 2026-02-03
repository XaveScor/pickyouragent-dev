import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import type { AgentValue, ParsedSubfeature } from "../../feature";
import { Status, STATUS_POINTS } from "./status";

type SubfeatureValueObject = {
  status: Status;
  collectionId?: string;
};

export type SubfeatureValue = Status | SubfeatureValueObject;

export function extractStatus(value: SubfeatureValue): Status {
  return typeof value === "string" ? value : value.status;
}

export function extractCollectionId(
  value: SubfeatureValue,
): string | undefined {
  return typeof value === "string" ? undefined : value.collectionId;
}

type SubfeatureParams = SubfeatureValue;

export type ParsedStatusSubfeature = ParsedSubfeature & {
  statusByAgent: Map<string, Status>;
  aggregatedStatus: Status;
  Content: AstroComponentFactory | null;
  getAgentContent(agentId: string): AstroComponentFactory | undefined;
};

export type SubfeaturesObject<
  Subfeatures extends Record<string, StatusSubfeature>,
> = {
  [k in keyof Subfeatures]: SubfeatureValue;
};

export function parseFeatureStatus<
  Subfeatures extends Record<string, StatusSubfeature>,
>(subfeatures: SubfeaturesObject<Subfeatures>): Status {
  const values = Object.values(subfeatures);
  const statuses = values.map(extractStatus);

  if (statuses.every((status) => status === Status.Supported)) {
    return Status.Supported;
  }

  if (statuses.every((status) => status === Status.NotSupported)) {
    // Feature exists but no subfeatures work yet - still partially supported
    return Status.PartiallySupported;
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
  displayName: string;
  slug: string;
  subfeatureCollectionId: string;
  weight: number;
};

export class StatusSubfeature {
  constructor(private readonly arg: SubfeatureArg) {}

  get displayName(): string {
    return this.arg.displayName;
  }

  get slug(): string {
    return this.arg.slug;
  }

  get subfeatureCollectionId(): string {
    return this.arg.subfeatureCollectionId;
  }

  get weight(): number {
    return this.arg.weight;
  }

  async parseAsync(
    values: Array<AgentValue<SubfeatureValue>>,
    Content: AstroComponentFactory | null,
    agentContentById: Map<string, AstroComponentFactory>,
  ): Promise<ParsedStatusSubfeature> {
    const statusByAgent = new Map<string, Status>();
    for (const { value, agentId } of values) {
      statusByAgent.set(agentId, extractStatus(value));
    }

    const statuses = Array.from(statusByAgent.values());
    const aggregatedStatus = aggregateSubfeatureStatuses(statuses);

    const weight = this.arg.weight;

    return {
      key: this.arg.slug,
      displayName: this.arg.displayName,
      slug: this.arg.slug,
      weight,
      statusByAgent,
      aggregatedStatus,
      Content,
      getAgentContent(agentId: string): AstroComponentFactory | undefined {
        return agentContentById.get(agentId);
      },
      getScoreForAgent(agentId: string): number {
        const status = statusByAgent.get(agentId) ?? Status.NotSupported;
        return weight * STATUS_POINTS.subfeature[status];
      },
    };
  }
}
