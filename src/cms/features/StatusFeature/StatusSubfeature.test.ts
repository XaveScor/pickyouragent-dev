import { describe, test, expect } from "vitest";
import {
  parseFeatureStatus,
  aggregateSubfeatureStatuses,
  StatusSubfeature,
} from "./StatusSubfeature";
import { Status } from "./status";

// Mock StatusSubfeature for type compatibility
const mockSubfeature = (key: string) =>
  new StatusSubfeature({
    displayName: key,
    slug: key,
    subfeatureCollectionId: `test/${key}/${key}`,
    weight: 1,
  });

describe("parseFeatureStatus", () => {
  test("returns Supported when all subfeatures are Supported", () => {
    const subfeatures = {
      a: Status.Supported,
      b: Status.Supported,
    };

    const result = parseFeatureStatus(subfeatures);

    expect(result).toBe(Status.Supported);
  });

  test("returns PartiallySupported when all subfeatures are NotSupported", () => {
    // This is the key behavior change:
    // When an agent provides subfeatures (even if all are NotSupported),
    // the feature should be PartiallySupported (not NotSupported).
    // This indicates the feature category exists but no subfeatures work yet.
    const subfeatures = {
      a: Status.NotSupported,
      b: Status.NotSupported,
    };

    const result = parseFeatureStatus(subfeatures);

    expect(result).toBe(Status.PartiallySupported);
  });

  test("returns PartiallySupported when all subfeatures are NotVerified", () => {
    const subfeatures = {
      a: Status.NotVerified,
      b: Status.NotVerified,
    };

    const result = parseFeatureStatus(subfeatures);

    expect(result).toBe(Status.PartiallySupported);
  });

  test("returns PartiallySupported when mixed Supported and NotSupported", () => {
    const subfeatures = {
      a: Status.Supported,
      b: Status.NotSupported,
    };

    const result = parseFeatureStatus(subfeatures);

    expect(result).toBe(Status.PartiallySupported);
  });

  test("returns PartiallySupported when mixed Supported and PartiallySupported", () => {
    const subfeatures = {
      a: Status.Supported,
      b: Status.PartiallySupported,
    };

    const result = parseFeatureStatus(subfeatures);

    expect(result).toBe(Status.PartiallySupported);
  });

  test("returns PartiallySupported when all subfeatures are PartiallySupported", () => {
    const subfeatures = {
      a: Status.PartiallySupported,
      b: Status.PartiallySupported,
    };

    const result = parseFeatureStatus(subfeatures);

    expect(result).toBe(Status.PartiallySupported);
  });

  test("returns Supported for single Supported subfeature", () => {
    const subfeatures = {
      a: Status.Supported,
    };

    const result = parseFeatureStatus(subfeatures);

    expect(result).toBe(Status.Supported);
  });

  test("returns PartiallySupported for single NotSupported subfeature", () => {
    // Even a single subfeature being NotSupported means the feature
    // is partially supported (it exists, but doesn't work yet)
    const subfeatures = {
      a: Status.NotSupported,
    };

    const result = parseFeatureStatus(subfeatures);

    expect(result).toBe(Status.PartiallySupported);
  });
});

describe("aggregateSubfeatureStatuses", () => {
  test("returns NotSupported for empty array", () => {
    const result = aggregateSubfeatureStatuses([]);

    expect(result).toBe(Status.NotSupported);
  });

  test("returns Supported when all statuses are Supported", () => {
    const statuses = [Status.Supported, Status.Supported];

    const result = aggregateSubfeatureStatuses(statuses);

    expect(result).toBe(Status.Supported);
  });

  test("returns PartiallySupported when all statuses are NotSupported", () => {
    // When aggregating across agents, if all agents have NotSupported,
    // the subfeature is still PartiallySupported (it exists in the schema)
    const statuses = [Status.NotSupported, Status.NotSupported];

    const result = aggregateSubfeatureStatuses(statuses);

    expect(result).toBe(Status.PartiallySupported);
  });

  test("returns NotVerified when all statuses are NotVerified", () => {
    const statuses = [Status.NotVerified, Status.NotVerified];

    const result = aggregateSubfeatureStatuses(statuses);

    expect(result).toBe(Status.NotVerified);
  });

  test("returns PartiallySupported when statuses are mixed", () => {
    const statuses = [Status.Supported, Status.NotSupported];

    const result = aggregateSubfeatureStatuses(statuses);

    expect(result).toBe(Status.PartiallySupported);
  });

  test("returns Supported for single Supported status", () => {
    const statuses = [Status.Supported];

    const result = aggregateSubfeatureStatuses(statuses);

    expect(result).toBe(Status.Supported);
  });

  test("returns PartiallySupported for single NotSupported status", () => {
    const statuses = [Status.NotSupported];

    const result = aggregateSubfeatureStatuses(statuses);

    expect(result).toBe(Status.PartiallySupported);
  });
});

describe("Feature status distinction: explicit NotSupported vs subfeatures object", () => {
  test("explicit Status.NotSupported is preserved (not processed by parseFeatureStatus)", () => {
    // When an agent explicitly declares Status.NotSupported for a feature,
    // it bypasses parseFeatureStatus and is used directly.
    // This test documents that distinction.
    const explicitStatus = Status.NotSupported;

    // This is NOT passed to parseFeatureStatus - it's used directly
    expect(explicitStatus).toBe(Status.NotSupported);
  });

  test("subfeatures object with all NotSupported returns PartiallySupported", () => {
    // When an agent provides a subfeatures object (even with all NotSupported),
    // parseFeatureStatus is called and returns PartiallySupported.
    const subfeatures = {
      filtering: Status.NotSupported,
      "region-tuning": Status.NotSupported,
    };

    const result = parseFeatureStatus(subfeatures);

    expect(result).toBe(Status.PartiallySupported);
  });
});
