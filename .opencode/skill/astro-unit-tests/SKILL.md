---
name: astro-unit-tests
description: Set up and run Astro unit and component tests with Vitest and the Astro container API.
license: MIT
compatibility: opencode
---

## What I do

- Configure Vitest for Astro projects using `getViteConfig()`
- Add unit tests for TypeScript/JavaScript utilities and components
- Test Astro components using the experimental container API
- Provide commands to install, configure, and run tests

## When to use me

- Adding unit tests or component tests to an Astro project
- Verifying `.astro` component rendering without E2E tools
- Migrating or introducing testing in an existing Astro repo
- Needing fast feedback during development with watch mode

## How it works

1. Install Vitest as a dev dependency
2. Create `vitest.config.ts` using Astro's `getViteConfig()` helper
3. Add test files with `.test.ts` or `.spec.ts` extensions
4. For `.astro` components, use `experimental_AstroContainer` to render and assert

## Example Usage

### Install Vitest

```bash
pnpm add -D vitest
```

### Configure Vitest

Create `vitest.config.ts` in project root:

```typescript
/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});
```

Optional: Customize Astro config for tests

```typescript
export default getViteConfig(
  {
    test: {
      /* Vitest options */
    },
  },
  {
    site: "https://example.com/",
    trailingSlash: "always",
  },
);
```

### Unit test for utility

```typescript
// src/utils/format.test.ts
import { describe, it, expect } from "vitest";
import { formatDate } from "./format";

describe("formatDate", () => {
  it("formats date correctly", () => {
    expect(formatDate(new Date("2024-01-01"))).toBe("2024-01-01");
  });
});
```

### Component test with container API

```typescript
// src/components/Card.test.ts
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Card from "./Card.astro";

test("Card with slots", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Card, {
    slots: {
      default: "Card content",
    },
  });

  expect(result).toContain("Card content");
});
```

### Add test scripts

Update `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

Run tests:

```bash
pnpm test
```

## Notes

- Container API is experimental and available in `astro@4.9.0+`
- Tests run in Node environment, not browser
- Use `pnpm test` for watch mode during development
- Use `pnpm test:run` for CI/CD pipelines

## Limitations

- Only covers unit and integration tests, not end-to-end tests
- Container API is experimental—API may change in future versions
- Does not include E2E testing tools like Playwright or Cypress

## References

- [Astro Testing Guide](https://docs.astro.build/en/guides/testing/)
- [Vitest Configuration](https://vitest.dev/config/)
- [Astro Container API](https://docs.astro.build/en/reference/container-reference/)
