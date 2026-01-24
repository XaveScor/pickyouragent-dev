import { z } from "zod";
import StatusCell from "../components/StatusCell.astro";
import SubscriptionsCell from "../components/SubscriptionsCell.astro";

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
  renderCellInTable(): {
    Component: any;
    props: Record<string, unknown>;
  };
}

export class StatusCellView implements Cell {
  #status: Status;

  constructor(status: Status) {
    this.#status = status;
  }

  renderCellInTable() {
    return {
      Component: StatusCell,
      props: { status: this.#status },
    };
  }
}

export class SubscriptionsCellView implements Cell {
  #links: SubscriptionLink[];
  #mainColor: string;

  constructor(links: SubscriptionLink[], mainColor = "#f43f5e") {
    this.#links = links;
    this.#mainColor = mainColor;
  }

  renderCellInTable() {
    return {
      Component: SubscriptionsCell,
      props: { links: this.#links, mainColor: this.#mainColor },
    };
  }
}
