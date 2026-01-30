import type { Feature } from "./feature";
import type { Agent, AgentMetadata, CompileFeatureObj } from "./Agent";
import { Table } from "./table";

export function compileFeatures<T extends Record<string, Feature<any>>>(
  declaration: T,
) {
  return {
    declareAgent: (
      metadata: AgentMetadata,
      features: CompileFeatureObj<T>,
    ): Agent<T> => {
      return { ...metadata, ...features };
    },
    compileTable: (agents: Array<Agent<T>>): Table<T> => {
      return new Table(declaration, agents);
    },
  };
}
