import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const featuresCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    categoryKey: z.string(),
  }),
});

const subfeaturesCollection = defineCollection({
  loader: glob({ pattern: '**/!(AGENTS)*.{md,mdx}', base: './src/content/subfeatures' }),
  schema: z.object({
    featureName: z.string(),
    subfeatureName: z.string(),
  }),
});

export const collections = {
  features: featuresCollection,
  subfeatures: subfeaturesCollection,
};

