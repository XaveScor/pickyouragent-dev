import { getEntry, render } from "astro:content";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

export const lazyAstroFactory = async (
  collectionName: string,
  id: string,
): Promise<AstroComponentFactory> => {
  if (!collectionName || !id) {
    throw new Error(
      `Both collectionName and id are required. Received: collectionName="${collectionName}", id="${id}"`,
    );
  }

  const entry = await getEntry(collectionName as any, id);

  if (!entry) {
    throw new Error(`Entry not found: ${collectionName}/${id}`);
  }

  const { Content } = await render(entry);
  return Content;
};
