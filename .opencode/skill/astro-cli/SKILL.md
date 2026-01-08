---
name: astro-cli
description: Astro CLI calling, running scripts with full Astro context, querying content collections, and executing TypeScript scripts from command line
license: MIT
compatibility: opencode
---

## What I do

- Provide CLI command to run Astro scripts with full Astro context
- Execute scripts that can import Astro modules and use Astro globals
- Return results as JSON for programmatic access
- Start/stop Astro dev server automatically

## When to use me

- Need to query Astro content collections from CLI
- Want to serialize agent data for external tools
- Need to run data transformations with Astro API access
- Automate tasks that require Astro rendering context

## How it works

1. Place scripts in `src/cli-scripts/*.ts`
2. Scripts must export default function accepting `Astro` parameter
3. Run via `pnpm astro:run <script-name>`
4. Runner starts Astro dev server, executes script, returns JSON output

## Example Usage

**Run list-agents script:**

```bash
pnpm astro:run list-agents
```

**Create custom script:**

```typescript
// src/cli-scripts/my-script.ts
export default async function run(Astro: any) {
  return {
    message: "Hello from Astro CLI!",
    url: Astro.url.pathname,
  };
}
```

**Access Astro modules:**

```typescript
// src/cli-scripts/content-query.ts
import { getCollection } from "astro:content";

export default async function run(Astro: any) {
  const features = await getCollection("features");
  return {
    totalFeatures: features.length,
    featureNames: features.map((f) => f.data.title),
  };
}
```

## Architecture

- **Runner Page:** `src/pages/cli-run.astro` - Hidden route that loads and executes scripts
- **Node Runner:** `scripts/astro-run.mjs` - Uses Astro programmatic `dev()` API
- **Script Directory:** `src/cli-scripts/` - Whitelist of executable scripts
- **Port:** 4333 (auto-fallback if occupied)

## Features

- ✅ Whitelist-based script loading for security
- ✅ Raw JSON responses (not wrapped in HTML)
- ✅ Proper error handling with HTTP status codes
- ✅ Graceful dev server shutdown
- ✅ Production-safe (runner excluded from static builds)

## Available Scripts

- `list-agents` - Export all agent feature data as JSON

## Notes

- Scripts have full access to Astro context (Astro.url, Astro.request, etc.)
- Can import `astro:*` modules like `astro:content`, `astro:assets`
- Runner page uses `prerender = false` (server-only)
- Build process temporarily excludes runner to avoid static build errors

## Limitations

- Requires running `pnpm astro:run` (no direct node execution)
- Scripts run in dev mode, not production build
- Only `.ts` files in `src/cli-scripts/` are discoverable

## Troubleshooting

### Script not found error

**Problem:** `Error (404): Unknown script: my-script`

**Solutions:**

1. Verify script file exists in `src/cli-scripts/my-script.ts`
2. Check filename is lowercase with no special characters
3. Confirm file has `.ts` extension
4. Script name must match filename without extension

### Import errors

**Problem:** Script fails with import errors

**Solutions:**

1. Ensure imports use relative paths from `src/cli-scripts/`
2. Verify Astro modules are available (`astro:content`, etc.)
3. Check TypeScript types are correct

### JSON parsing errors

**Problem:** Runner returns HTML instead of JSON

**Solutions:**

1. Ensure runner page is not returning early with HTML
2. Check script returns JSON-serializable object
3. Verify no circular references in returned data

### Build failures

**Problem:** `pnpm build` fails with adapter errors

**Solutions:**

1. The custom build script (`scripts/build-cli.mjs`) automatically handles this
2. Runner page is temporarily renamed during builds
3. If using `pnpm build:original`, manually rename `cli-run.astro` first

### Port already in use

**Problem:** Cannot start dev server on port 4333

**Solutions:**

1. The runner automatically tries next available port
2. Check what process is using port 4333
3. Kill conflicting process: `lsof -ti:4333 | xargs kill -9`
