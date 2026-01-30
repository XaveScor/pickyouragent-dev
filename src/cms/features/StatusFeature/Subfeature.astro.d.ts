import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import type { Status } from "./status";

interface Props {
  mainColor: string;
  secondaryColor: string;
  featureLink: string;
  slug: string;
  name: string;
  statuses: Array<Status>;
}

declare const SubfeatureComponent: AstroComponentFactory;
export default SubfeatureComponent;
