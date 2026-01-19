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
};

export type SubscriptionsCell = {
  $$type: "subscriptions";
  links: SubscriptionLink[];
};

export type Cell = StatusCell | SubscriptionsCell;

export function statusCell(status: Status): StatusCell {
  return { $$type: "status", status };
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
});

export const subscriptionsCellSchema = z.object({
  $$type: z.literal("subscriptions"),
  links: z.array(subscriptionLinkSchema),
});

export const cellSchema = z.union([statusCellSchema, subscriptionsCellSchema]);
