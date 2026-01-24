/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";
export default getViteConfig({
  test: {
    include: [
      "src/**/*.{test,spec}.{js,ts}",
      "src/**/__tests__/**/*.{test,spec}.{js,ts}",
    ],
    globals: true,
  },
});
