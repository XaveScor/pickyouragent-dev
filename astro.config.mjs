import { defineConfig } from 'astro/config';
import rehypeSlug from 'rehype-slug';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [mdx()],
  markdown: {
    rehypePlugins: [rehypeSlug],
  },
  build: {
    inlineStylesheets: 'never'
  }
});

