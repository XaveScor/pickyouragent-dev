import { describe, expectTypeOf, test } from "vitest";
import { parseConfig } from "./parseConfig";

// Mock Parseable class for testing
class MockParser<V, R> {
  constructor(private result: R) {}
  async parseAsync(values: Array<V>): Promise<R> {
    return this.result;
  }
}

describe("parseConfig", () => {
  describe("single parser", () => {
    const schema = {
      foo: new MockParser<string, number>(42),
    };

    test("accepts correct value type", () => {
      expectTypeOf(parseConfig).toBeCallableWith(schema, [{ foo: "hello" }]);
    });

    test("rejects wrong value type", () => {
      // @ts-expect-error - number should be string
      parseConfig(schema, [{ foo: 123 }]);
    });

    test("returns array of parsed results", async () => {
      const result = await parseConfig(schema, [{ foo: "test" }]);
      expectTypeOf(result).toEqualTypeOf<Array<number>>();
    });
  });

  describe("multiple parsers", () => {
    const schema = {
      a: new MockParser<string, number>(1),
      b: new MockParser<boolean, string>("result"),
    };

    test("accepts correct value types for all keys", () => {
      expectTypeOf(parseConfig).toBeCallableWith(schema, [
        { a: "hello", b: true },
        { a: "world", b: false },
      ]);
    });

    test("rejects missing keys", () => {
      // @ts-expect-error - missing key 'b'
      parseConfig(schema, [{ a: "hello" }]);
    });

    test("returns union of result types", async () => {
      const result = await parseConfig(schema, [{ a: "x", b: true }]);
      expectTypeOf(result).toEqualTypeOf<Array<number | string>>();
    });
  });

  describe("hierarchical: Feature with Subfeatures", () => {
    // Mock subfeature parser
    class MockSubfeature {
      constructor(private name: string) {}
      async parseAsync(
        values: Array<string>,
      ): Promise<{ name: string; values: string[] }> {
        return { name: this.name, values };
      }
    }

    // Mock feature with subfeatures (like StatusFeature)
    class MockFeature<Subfeatures extends Record<string, MockSubfeature>> {
      constructor(private subfeatures: Subfeatures) {}
      async parseAsync(
        values: Array<{ [K in keyof Subfeatures]: string }>,
      ): Promise<{ parsed: true }> {
        // Could use parseConfig internally for subfeatures
        return { parsed: true };
      }
    }

    const schema = {
      planMode: new MockFeature({
        dualModel: new MockSubfeature("dual-model"),
        questions: new MockSubfeature("questions"),
      }),
      tools: new MockFeature({
        webSearch: new MockSubfeature("web-search"),
        browser: new MockSubfeature("browser"),
      }),
    };

    test("accepts nested subfeature values", () => {
      expectTypeOf(parseConfig).toBeCallableWith(schema, [
        {
          planMode: { dualModel: "yes", questions: "no" },
          tools: { webSearch: "supported", browser: "partial" },
        },
      ]);
    });

    test("rejects wrong subfeature key", () => {
      parseConfig(schema, [
        {
          planMode: {
            dualModel: "yes",
            // @ts-expect-error - 'invalid' is not a valid subfeature key
            invalid: "no",
          },
          tools: { webSearch: "supported", browser: "partial" },
        },
      ]);
    });

    test("rejects missing subfeature key", () => {
      parseConfig(schema, [
        {
          // @ts-expect-error - missing 'questions' subfeature
          planMode: { dualModel: "yes" },
          tools: { webSearch: "supported", browser: "partial" },
        },
      ]);
    });
  });
});
