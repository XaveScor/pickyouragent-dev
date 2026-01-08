import { dev } from "astro";

const scriptName = process.argv[2];
if (!scriptName) {
  console.error("Usage: pnpm astro:run <scriptName>");
  process.exit(1);
}

const devServer = await dev({
  root: process.cwd(),
  logLevel: "silent",
  server: { port: 4333 },
});

const port = devServer.address.port;

try {
  const res = await fetch(
    `http://localhost:${port}/cli-run?script=${encodeURIComponent(scriptName)}`,
  );

  if (!res.ok) {
    const errorData = await res.json();
    console.error(`Error (${res.status}):`, errorData.error || res.statusText);
    if (errorData.available) {
      console.error("\nAvailable scripts:");
      errorData.available.forEach((s) => console.error(`  - ${s}`));
    }
    process.exit(1);
  }

  const text = await res.text();
  console.log(text);
} catch (error) {
  console.error("Failed to run script:", error.message);
  process.exit(1);
} finally {
  await devServer.stop();
}
