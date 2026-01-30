import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import type { SubscriptionLink } from "./subscriptions";

interface Props {
  name: string;
  mainColor: string;
  secondaryColor: string;
  slug: string;
  linksByAgent: Array<SubscriptionLink[]>;
}

declare const SubscriptionsFeatureComponent: AstroComponentFactory;
export default SubscriptionsFeatureComponent;
