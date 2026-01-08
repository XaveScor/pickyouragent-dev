import { build } from "astro";
import { renameSync, existsSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = resolve(__dirname, "..");
const cliRunPath = resolve(root, "src/pages/cli-run.astro");
const cliRunBackup = resolve(root, "src/pages/cli-run.astro.backup");

function backupCliRunner() {
  if (existsSync(cliRunPath)) {
    renameSync(cliRunPath, cliRunBackup);
  }
}

function restoreCliRunner() {
  if (existsSync(cliRunBackup)) {
    renameSync(cliRunBackup, cliRunPath);
  }
}

try {
  backupCliRunner();

  await build({
    root,
  });

  await import("./build-sw.js");

  console.log("Build completed successfully");
} catch (error) {
  console.error("Build failed:", error.message);
  process.exit(1);
} finally {
  restoreCliRunner();
}
