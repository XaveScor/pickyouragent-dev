import { describe, test, expect, vi } from "vitest";
import {
  Status,
  statusCell,
  subscriptionsCell,
  StatusCellView,
  SubscriptionsCellView,
} from "../cells";
import {
  StatusFeature,
  SubscriptionsFeature,
  StatusSubfeature,
  StatusLine,
  SubfeatureLine,
  SubscriptionsLine,
} from "../parsedTable";

describe("ParsedTable", () => {
  describe("Schema enforcement", () => {
    test("subscriptionsCell creates subscriptions cell", () => {
      const cell = subscriptionsCell([]);
      expect(cell.$$type).toBe("subscriptions");
      expect(cell.links).toEqual([]);
    });

    test("statusCell creates status cell", () => {
      const cell = statusCell(Status.Supported);
      expect(cell.$$type).toBe("status");
      expect(cell.status).toBe(Status.Supported);
    });

    test("StatusCellView has correct component and props", () => {
      const cell = new StatusCellView(Status.Supported);
      expect(cell.getProps()).toEqual({ status: Status.Supported });
      expect(cell.getComponentPath()).toBe("../components/StatusCell.astro");
    });

    test("SubscriptionsCellView has correct component and props", () => {
      const links = [
        { label: "Pricing", url: "https://example.com/pricing" },
        { label: "Docs", url: "https://example.com/docs" },
      ];
      const cell = new SubscriptionsCellView(links, "#ff0000");
      expect(cell.getProps()).toEqual({ links, mainColor: "#ff0000" });
      expect(cell.getComponentPath()).toBe(
        "../components/SubscriptionsCell.astro",
      );
    });
  });

  describe("Feature kind mapping", () => {
    test("StatusFeature has kind-based properties", () => {
      const subfeature = new StatusSubfeature(
        "test-key",
        "Test Subfeature",
        "test-slug",
        new Map([
          ["agent1", Status.Supported],
          ["agent2", Status.NotSupported],
        ]),
        vi.fn(),
        new Map(),
      );

      const feature = new StatusFeature(
        "test-feature",
        "Test Feature",
        "test-feature",
        "#ff0000",
        "#ffaaaa",
        [subfeature],
        new Map([
          ["agent1", Status.Supported],
          ["agent2", Status.NotSupported],
        ]),
      );

      expect(feature.key).toBe("test-feature");
      expect(feature.name).toBe("Test Feature");
      expect(feature.slug).toBe("test-feature");
      expect(feature.subfeatures).toHaveLength(1);
      expect(feature.statusByAgent.size).toBe(2);
      expect(feature.aggregatedStatus).toBe(Status.PartiallySupported);
    });

    test("SubscriptionsFeature has kind-based properties", () => {
      const linksByAgent = new Map([
        ["agent1", [{ label: "Pricing", url: "https://example.com/pricing" }]],
        ["agent2", [{ label: "Docs", url: "https://example.com/docs" }]],
      ]);

      const feature = new SubscriptionsFeature(
        "subscriptions",
        "Subscriptions",
        "subscriptions",
        "#f43f5e",
        "#fb7185",
        linksByAgent,
      );

      expect(feature.key).toBe("subscriptions");
      expect(feature.name).toBe("Subscriptions");
      expect(feature.slug).toBe("subscriptions");
      expect(feature.linksByAgent.size).toBe(2);
      expect(feature.getLinksByAgent("agent1")).toHaveLength(1);
      expect(feature.getLinksByAgent("agent3")).toEqual([]);
    });
  });

  describe("Lines", () => {
    test("StatusFeature.getLines returns category line + subfeature lines", () => {
      const subfeature = new StatusSubfeature(
        "test-sub",
        "Test Subfeature",
        "test-sub",
        new Map([
          ["agent1", Status.Supported],
          ["agent2", Status.NotSupported],
        ]),
        vi.fn(),
        new Map(),
      );

      const feature = new StatusFeature(
        "test-feature",
        "Test Feature",
        "test-feature",
        "#ff0000",
        "#ffaaaa",
        [subfeature],
        new Map([
          ["agent1", Status.Supported],
          ["agent2", Status.NotSupported],
        ]),
      );

      const lines = feature.getLines();

      expect(lines).toHaveLength(2);

      const categoryLine = lines[0] as StatusLine;
      expect(categoryLine.getDescription()).toBe("Test Feature");
      expect(categoryLine.getCells()).toHaveLength(2);
      expect(categoryLine.getCells()[0]).toBeInstanceOf(StatusCellView);
      expect(categoryLine.getCells()[1]).toBeInstanceOf(StatusCellView);

      const subfeatureLine = lines[1] as SubfeatureLine;
      expect(subfeatureLine.getDescription()).toBe("Test Subfeature");
      expect(subfeatureLine.getKey()).toBe("test-sub");
      expect(subfeatureLine.getCells()).toHaveLength(2);
    });

    test("SubscriptionsFeature.getLines returns single line", () => {
      const linksByAgent = new Map([
        ["agent1", [{ label: "Pricing", url: "https://example.com/pricing" }]],
      ]);

      const feature = new SubscriptionsFeature(
        "subscriptions",
        "Subscriptions",
        "subscriptions",
        "#f43f5e",
        "#fb7185",
        linksByAgent,
      );

      const lines = feature.getLines();

      expect(lines).toHaveLength(1);

      const subscriptionsLine = lines[0] as SubscriptionsLine;
      expect(subscriptionsLine.getDescription()).toBe("Subscriptions");
      expect(subscriptionsLine.getCells()).toHaveLength(1);
      expect(subscriptionsLine.getCells()[0]).toBeInstanceOf(
        SubscriptionsCellView,
      );
    });
  });

  describe("Cell types", () => {
    test("StatusFeature lines return only StatusCellView", () => {
      const feature = new StatusFeature(
        "test",
        "Test",
        "test",
        "#ff0000",
        "#ffaaaa",
        [],
        new Map([["agent1", Status.Supported]]),
      );

      const lines = feature.getLines();
      const cells = lines[0].getCells();

      cells.forEach((cell) => {
        expect(cell).toBeInstanceOf(StatusCellView);
      });
    });

    test("SubscriptionsFeature lines return only SubscriptionsCellView", () => {
      const feature = new SubscriptionsFeature(
        "subscriptions",
        "Subscriptions",
        "subscriptions",
        "#f43f5e",
        "#fb7185",
        new Map([
          [
            "agent1",
            [{ label: "Pricing", url: "https://example.com/pricing" }],
          ],
        ]),
      );

      const lines = feature.getLines();
      const cells = lines[0].getCells();

      cells.forEach((cell) => {
        expect(cell).toBeInstanceOf(SubscriptionsCellView);
      });
    });
  });

  describe("Aggregation", () => {
    test("StatusSubfeature aggregates all Supported as Supported", () => {
      const subfeature = new StatusSubfeature(
        "test",
        "Test",
        "test",
        new Map([
          ["agent1", Status.Supported],
          ["agent2", Status.Supported],
          ["agent3", Status.Supported],
        ]),
        vi.fn(),
        new Map(),
      );

      expect(subfeature.aggregatedStatus).toBe(Status.Supported);
    });

    test("StatusSubfeature aggregates all NotVerified as NotVerified", () => {
      const subfeature = new StatusSubfeature(
        "test",
        "Test",
        "test",
        new Map([
          ["agent1", Status.NotVerified],
          ["agent2", Status.NotVerified],
        ]),
        vi.fn(),
        new Map(),
      );

      expect(subfeature.aggregatedStatus).toBe(Status.NotVerified);
    });

    test("StatusSubfeature aggregates all NotSupported as PartiallySupported", () => {
      const subfeature = new StatusSubfeature(
        "test",
        "Test",
        "test",
        new Map([
          ["agent1", Status.NotSupported],
          ["agent2", Status.NotSupported],
        ]),
        vi.fn(),
        new Map(),
      );

      expect(subfeature.aggregatedStatus).toBe(Status.PartiallySupported);
    });

    test("StatusSubfeature aggregates mixed statuses as PartiallySupported", () => {
      const subfeature = new StatusSubfeature(
        "test",
        "Test",
        "test",
        new Map([
          ["agent1", Status.Supported],
          ["agent2", Status.NotSupported],
        ]),
        vi.fn(),
        new Map(),
      );

      expect(subfeature.aggregatedStatus).toBe(Status.PartiallySupported);
    });

    test("StatusFeature aggregates all NotSupported as NotSupported", () => {
      const feature = new StatusFeature(
        "test",
        "Test",
        "test",
        "#ff0000",
        "#ffaaaa",
        [],
        new Map([
          ["agent1", Status.NotSupported],
          ["agent2", Status.NotSupported],
        ]),
      );

      expect(feature.aggregatedStatus).toBe(Status.NotSupported);
    });
  });

  describe("Content", () => {
    test("StatusSubfeature stores Content component", () => {
      const mockContent = vi.fn();

      const subfeature = new StatusSubfeature(
        "test",
        "Test",
        "test",
        new Map([["agent1", Status.Supported]]),
        mockContent,
        new Map(),
      );

      expect(subfeature.Content).toBe(mockContent);
    });

    test("StatusSubfeature.getAgentContent returns content for agent", () => {
      const agentContent = vi.fn();
      const agentContentMap = new Map([["agent1", agentContent]]);

      const subfeature = new StatusSubfeature(
        "test",
        "Test",
        "test",
        new Map([["agent1", Status.Supported]]),
        vi.fn(),
        agentContentMap,
      );

      const retrieved = subfeature.getAgentContent("agent1");
      expect(retrieved).toBe(agentContent);
    });

    test("StatusSubfeature.getAgentContent returns undefined for unknown agent", () => {
      const subfeature = new StatusSubfeature(
        "test",
        "Test",
        "test",
        new Map([["agent1", Status.Supported]]),
        vi.fn(),
        new Map(),
      );

      const retrieved = subfeature.getAgentContent("unknown-agent");
      expect(retrieved).toBeUndefined();
    });
  });
});
