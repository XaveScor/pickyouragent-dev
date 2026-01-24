import { z } from "zod";

export const Status = {
  Supported: "supported",
  PartiallySupported: "partially-supported",
  NotSupported: "not-supported",
  NotVerified: "not-verified",
} as const;

export type Status = (typeof Status)[keyof typeof Status];

export type SubscriptionLink = {
  label: string;
  url: string;
};

export type StatusCell = {
  $$type: "status";
  status: Status;
  detailsId?: string;
};

export type SubscriptionsCell = {
  $$type: "subscriptions";
  links: SubscriptionLink[];
};

export function statusCell(status: Status, detailsId?: string): StatusCell {
  return { $$type: "status", status, detailsId };
}

export function subscriptionsCell(
  links: SubscriptionLink[],
): SubscriptionsCell {
  return { $$type: "subscriptions", links };
}

const subscriptionLinkSchema = z.object({
  label: z.string(),
  url: z.string().url(),
});

export const statusCellSchema = z.object({
  $$type: z.literal("status"),
  status: z.enum([
    Status.Supported,
    Status.PartiallySupported,
    Status.NotSupported,
    Status.NotVerified,
  ]),
  detailsId: z.string().optional(),
});

export const subscriptionsCellSchema = z.object({
  $$type: z.literal("subscriptions"),
  links: z.array(subscriptionLinkSchema),
});

export interface Cell {
  getComponentPath(): string;
  getProps(): Record<string, unknown>;
}

export class StatusCellView implements Cell {
  #status: Status;

  constructor(status: Status) {
    this.#status = status;
  }

  getComponentPath() {
    return "../components/StatusCell.astro";
  }

  getProps() {
    return { status: this.#status };
  }
}

export class SubscriptionsCellView implements Cell {
  #links: SubscriptionLink[];
  #mainColor: string;

  constructor(links: SubscriptionLink[], mainColor = "#f43f5e") {
    this.#links = links;
    this.#mainColor = mainColor;
  }

  getComponentPath() {
    return "../components/SubscriptionsCell.astro";
  }

  getProps() {
    return { links: this.#links, mainColor: this.#mainColor };
  }
}
