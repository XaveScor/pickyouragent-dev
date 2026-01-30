import type { AstroComponentFactory } from "astro/runtime/server/index.js";

export interface AgentValue<V> {
  value: V;
  agentId: string;
  agentName: string;
}

export interface TableLineRenderData {
  Component: AstroComponentFactory;
  props: Record<string, any>;
  subfeatures?: Array<{
    Component: AstroComponentFactory;
    props: Record<string, any>;
  }>;
}

export interface DescriptionPageRenderData {
  Component: AstroComponentFactory;
  props: Record<string, any>;
}

export interface ParsedFeature {
  slug: string;
  name: string;
  mainColor: string;
  secondaryColor: string;
  getTableLineAsync(): Promise<TableLineRenderData>;
  getDescriptionPage(): DescriptionPageRenderData;
  getSubfeatures?(): Array<ParsedSubfeature>;
}

export interface ParsedSubfeature {
  key: string;
  displayName: string;
  slug: string;
  statusByAgent: Map<string, unknown>;
  aggregatedStatus: unknown;
  Content: AstroComponentFactory | null;
  getAgentContent(agentId: string): AstroComponentFactory | undefined;
}

export interface Feature<Value> {
  parseAsync(values: Array<AgentValue<Value>>): Promise<ParsedFeature>;
}
export type ExtractFeatureValue<TFeature extends Feature<any>> =
  TFeature extends Feature<infer Value> ? Value : never;
