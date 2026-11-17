import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string().max(110),
    description: z.string().max(170),
    category: z.enum(['ai', 'smartphones', 'gadgets', 'apps', 'guides', 'security']),
    type: z.enum(['news', 'tutorial', 'comparison', 'specs', 'review', 'app-guide', 'buying-guide', 'explainer']),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(true),
    sources: z.array(z.object({ title: z.string(), url: z.string().url() })).default([]),
  }),
});

export const collections = { articles };
