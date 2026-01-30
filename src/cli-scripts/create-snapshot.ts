import { allAgents } from "../agents/allAgents";
import { compileTable } from "../agents/featureSetSchema";
import { mkdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import { execSync } from "child_process";

export default async function run(Astro: any) {
  const root = process.cwd();

  const commitHash =
    process.env.GITHUB_SHA ||
    execSync("git rev-parse HEAD", { encoding: "utf-8" }).trim();
  const shortHash = commitHash.substring(0, 7);
  const runId = process.env.GITHUB_RUN_ID || "local";
  const date = new Date().toISOString().split("T")[0];

  const table = compileTable(allAgents as any);
  const parsedFeatures = await table.getFeatures();

  const features: any = {};
  for (const feature of parsedFeatures) {
    const subfeatureKeys: string[] = [];
    if (feature.getSubfeatures) {
      for (const subfeature of feature.getSubfeatures()) {
        subfeatureKeys.push(subfeature.key);
      }
    }

    features[feature.slug] = {
      name: feature.name,
      slug: feature.slug,
      mainColor: feature.mainColor,
      secondaryColor: feature.secondaryColor,
      subfeatures: subfeatureKeys,
    };
  }

  const agents = allAgents.map((agent) => ({
    id: agent.id,
    name: agent.name,
  }));

  const snapshot = {
    metadata: {
      date,
      commitHash: shortHash,
      fullCommitHash: commitHash,
      timestamp: new Date().toISOString(),
      githubRunId: runId,
      totalAgents: agents.length,
    },
    features,
    agents,
  };

  const snapshotsDir = resolve(root, "snapshots");
  mkdirSync(snapshotsDir, { recursive: true });

  const filename = `${date}-${shortHash}.json`;
  const filepath = resolve(snapshotsDir, filename);
  writeFileSync(filepath, JSON.stringify(snapshot, null, 2), "utf-8");

  return {
    success: true,
    filepath,
    filename,
    metadata: snapshot.metadata,
  };
}
