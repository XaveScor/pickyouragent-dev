import { describe, test, expect } from "vitest";
import { getEntry, render } from "astro:content";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { lazyAstroFactory } from "./lazyAstroComponent";

describe("lazyAstroFactory", () => {
  describe("when entry exists", () => {
    test("returns component equivalent to direct render", async () => {
      const entry = await getEntry("test", "lazy-astro-factory");
      if (!entry) {
        throw new Error("Test fixture entry not found");
      }
      const { Content: directContent } = await render(entry);
      const lazyContent = await lazyAstroFactory("test", "lazy-astro-factory");

      const container = await AstroContainer.create();
      const directHtml = await container.renderToString(directContent);
      const lazyHtml = await container.renderToString(lazyContent);

      expect(directHtml).toBe(lazyHtml);
    });

    test("renders expected fixture content", async () => {
      const lazyContent = await lazyAstroFactory("test", "lazy-astro-factory");
      const container = await AstroContainer.create();
      const html = await container.renderToString(lazyContent);

      expect(html).toContain("Lazy Astro Factory Fixture");
    });
  });

  describe("when entry does not exist", () => {
    test("throws helpful error", async () => {
      await expect(() =>
        lazyAstroFactory("test", "missing-entry"),
      ).rejects.toThrow("Entry not found: test/missing-entry");
    });
  });

  describe("when collectionName or id is empty", () => {
    test("throws helpful error for empty collectionName", async () => {
      await expect(() => lazyAstroFactory("", "some-id")).rejects.toThrow(
        "Both collectionName and id are required",
      );
    });

    test("throws helpful error for empty id", async () => {
      await expect(() => lazyAstroFactory("test", "")).rejects.toThrow(
        "Both collectionName and id are required",
      );
    });
  });
});
