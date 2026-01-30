/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";
export default getViteConfig({
  test: {
    include: [
      "src/**/*.{test,spec,test-d}.{js,ts}",
      "src/**/__tests__/**/*.{test,spec,test-d}.{js,ts}",
    ],
    typecheck: {
      enabled: true,
      include: ["src/**/*.test-d.ts"],
    },
    globals: true,
  },
});
