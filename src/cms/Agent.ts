import type { ExtractFeatureValue, Feature } from "./feature";

export type CompileFeatureObj<T extends Record<string, Feature<any>>> = {
  [K in keyof T]: ExtractFeatureValue<T[K]>;
};

export type AgentMetadata = {
  id: string;
  name: string;
};

export type Agent<T extends Record<string, Feature<any>>> =
  AgentMetadata & CompileFeatureObj<T>;
