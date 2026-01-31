import { describe, expectTypeOf, test } from "vitest";
import { compileFeatures } from "../../compileFeatures";
import { StatusFeature } from "./StatusFeature";
import { Status } from "./status";
import { StatusSubfeature } from "./StatusSubfeature";

describe("statusFeature", () => {
  describe("status", () => {
    const result = compileFeatures({
      a: new StatusFeature({
        name: "testName",
        slug: "testSlug",
        mainColor: "#000",
        secondaryColor: "#cc0000",
      }),
    });

    test.each([
      [Status.Supported],
      [Status.PartiallySupported],
      [Status.NotVerified],
      [Status.NotSupported],
    ])("Status -> %s", (status) => {
      expectTypeOf<typeof result.declareAgent>().toBeCallableWith(
        { id: "test", name: "Test" },
        {
          a: status,
        },
      );
    });

    test.todo("no subfeatures", () => {
      expectTypeOf<typeof result.declareAgent>().toBeCallableWith(
        { id: "test", name: "Test" },
        {
          a: {
            hello: Status.Supported, // should fail here
          },
        },
      );
    });
  });

  describe("subFeature", () => {
    const result = compileFeatures({
      a: new StatusFeature({
        name: "testName",
        slug: "testSlug",
        mainColor: "#000",
        secondaryColor: "#cc0000",
        subfeatures: {
          testSubfeature: new StatusSubfeature({
            displayName: "Subfeature Name",
            slug: "subfeatureName",
            subfeatureCollectionId: "subfeatureName",
          }),
        },
      }),
    });

    test("has subfeature with plain status", () => {
      expectTypeOf<typeof result.declareAgent>().toBeCallableWith(
        { id: "test", name: "Test" },
        {
          a: {
            testSubfeature: Status.Supported,
          },
        },
      );
    });

    test("has subfeature with object containing status and collectionId", () => {
      expectTypeOf<typeof result.declareAgent>().toBeCallableWith(
        { id: "test", name: "Test" },
        {
          a: {
            testSubfeature: {
              status: Status.Supported,
              collectionId: "agent-name/feature/subfeature",
            },
          },
        },
      );
    });

    test("has subfeature with object containing only status", () => {
      expectTypeOf<typeof result.declareAgent>().toBeCallableWith(
        { id: "test", name: "Test" },
        {
          a: {
            testSubfeature: {
              status: Status.Supported,
            },
          },
        },
      );
    });

    test("has no not declared subfeature", () => {
      result.declareAgent(
        { id: "test", name: "Test" },
        {
          a: {
            // @ts-expect-error should fail here
            invalidSubfeature: Status.Supported,
          },
        },
      );
    });
  });
});
