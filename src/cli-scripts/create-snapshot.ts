import { allAgents } from "../agents/allAgents";
import { featuresRegistry, featureSetSchema } from "../agents/featureSetSchema";
import { mkdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import { execSync } from "child_process";
import { z } from "zod";

export default async function run(Astro: any) {
  const root = process.cwd();

  const commitHash =
    process.env.GITHUB_SHA ||
    execSync("git rev-parse HEAD", { encoding: "utf-8" }).trim();
  const shortHash = commitHash.substring(0, 7);
  const runId = process.env.GITHUB_RUN_ID || "local";
  const date = new Date().toISOString().split("T")[0];

  const features: any = {};

  const categoryOrderEnum = featureSetSchema.keyof().enum;
  const categoryOrder = Object.values(
    categoryOrderEnum,
  ) as (keyof typeof categoryOrderEnum)[];

  for (const categoryKey of categoryOrder) {
    const categorySchema = featureSetSchema.shape[categoryKey];
    const categoryMeta = featuresRegistry.get(categorySchema);

    if (!categoryMeta) {
      continue;
    }

    const subfeatureKeys: string[] = [];
    const categorySchemaAny = categorySchema as any;

    if (categorySchemaAny instanceof z.ZodUnion) {
      const objectOption = categorySchemaAny.options.find(
        (opt: any) => opt instanceof z.ZodObject,
      );
      if (objectOption instanceof z.ZodObject) {
        subfeatureKeys.push(...Object.keys(objectOption.shape));
      }
    } else if (categorySchemaAny instanceof z.ZodObject) {
      subfeatureKeys.push(...Object.keys(categorySchemaAny.shape));
    }

    features[categoryKey] = {
      name: categoryMeta.name,
      slug: categoryMeta.slug || categoryKey,
      mainColor: categoryMeta.mainColor,
      secondaryColor: categoryMeta.secondaryColor,
      subfeatures: subfeatureKeys,
    };
  }

  const agents = allAgents.map((agent) => ({
    id: agent.meta.id,
    name: agent.meta.name,
    features: agent.features,
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
