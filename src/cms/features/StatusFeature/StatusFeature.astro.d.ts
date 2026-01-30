import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import type { Status } from "./status";

interface Props {
  name: string;
  mainColor: string;
  secondaryColor: string;
  slug: string;
  statuses: Array<Status>;
}

declare const StatusFeatureComponent: AstroComponentFactory;
export default StatusFeatureComponent;
