import { expectTypeOf, test, describe } from "vitest";
import type {
  Feature,
  ParsedFeature,
  AgentValue,
  TableLineRenderData,
  DescriptionPageRenderData,
} from "./feature";
import { compileFeatures } from "./compileFeatures";

class SimpleFeature<T> implements Feature<T> {
  async parseAsync(values: Array<AgentValue<T>>): Promise<ParsedFeature> {
    return {
      slug: "test",
      name: "Test",
      mainColor: "#000",
      secondaryColor: "#fff",
      weight: 0,
      async getTableLineAsync(
        _sortedAgentIds: string[],
      ): Promise<TableLineRenderData> {
        throw new Error();
      },
      getDescriptionPage(_sortedAgentIds: string[]): DescriptionPageRenderData {
        throw new Error();
      },
      getScoreForAgent(_agentId: string): number {
        return 0;
      },
    };
  }
}

describe("compileFeatures", () => {
  test("simple compile", () => {
    const result = compileFeatures({
      a: new SimpleFeature<{ test: string }>(),
    });

    expectTypeOf(result.declareAgent).toBeCallableWith(
      { id: "test", name: "Test" },
      {
        a: {
          test: "hello",
        },
      },
    );
  });

  test("combine different features", () => {
    const result = compileFeatures({
      a: new SimpleFeature<{ test: string }>(),
      b: new SimpleFeature<{ foo: boolean }>(),
    });

    expectTypeOf(result.declareAgent).toBeCallableWith(
      { id: "test", name: "Test" },
      {
        a: {
          test: "test",
        },
        b: {
          foo: false,
        },
      },
    );
  });

  test.todo("no missing keys", () => {
    const result = compileFeatures({
      a: new SimpleFeature<{ test: string }>(),
    });

    expectTypeOf(result.declareAgent).toBeCallableWith(
      { id: "test", name: "Test" },
      {
        a: {
          test: "test",
        },
        b: {
          foo: false,
        },
      },
    );
  });
});
