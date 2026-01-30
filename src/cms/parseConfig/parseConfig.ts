/**
 * Interface for objects that can parse an array of values asynchronously.
 */
export interface Parseable<Value, Result> {
  parseAsync(values: Array<Value>): Promise<Result>;
}

/**
 * Extracts the value type from a Parseable.
 */
export type ExtractParseableValue<T> = T extends Parseable<infer V, any>
  ? V
  : never;

/**
 * Extracts the result type from a Parseable.
 */
export type ExtractParseableResult<T> = T extends Parseable<any, infer R>
  ? R
  : never;

/**
 * Generic function that parses configuration values using a schema of Parseable objects.
 *
 * @param schema - An object where each key maps to a Parseable instance
 * @param values - An array of objects, where each object has the same keys as the schema
 * @returns A promise that resolves to an array of parsed results
 */
export async function parseConfig<
  T extends Record<string, Parseable<any, any>>,
>(
  schema: T,
  values: Array<{ [K in keyof T]: ExtractParseableValue<T[K]> }>,
): Promise<Array<ExtractParseableResult<T[keyof T]>>> {
  const keys = Object.keys(schema) as Array<keyof T>;
  return Promise.all(
    keys.map(async (key) => {
      const parser = schema[key];
      return await parser.parseAsync(values.map((v) => v[key]));
    }),
  );
}
