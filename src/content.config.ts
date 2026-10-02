import { defineCollection } from 'astro:content';
import { createRequire } from 'node:module';
import { z } from 'astro/zod';

// Astro 7/Vite 8 on Windows misclassifies the glob loader's CommonJS dependency.
// Native Node loading keeps the official loader and its schema API intact.
const { glob } = createRequire(import.meta.url)('astro/loaders') as typeof import('astro/loaders');

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    order: z.number().int().nonnegative(),
    title: z.string().min(1),
    summary: z.string().min(1),
    category: z.string().min(1),
    status: z.enum([
      'Концептуальный проект',
      'Концептуальный магазин',
      'Демоверсия сервиса',
    ]),
    demoUrl: z.string().url(),
    role: z.string().min(1).optional(),
    stack: z.array(z.string().min(1)).optional(),
    year: z.number().int().optional(),
  }),
});

export const collections = { projects };
