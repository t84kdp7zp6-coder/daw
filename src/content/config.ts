import { defineCollection, z } from "astro:content";

// One entry per country, per language: e.g. countries/ru/japan.md,
// countries/en/japan.md. The `slug` must match across languages so
// getLocalizedPath can jump between them.
const countries = defineCollection({
  type: "content",
  schema: z.object({
    slug: z.string(),                // "japan" — stable across all languages
    name: z.string(),                // localized display name
    lang: z.string(),
    heroImage: z.string(),
    summary: z.string(),             // 1-2 sentences for meta description
    language: z.string(),            // spoken language(s), localized
    currency: z.string(),
    timezone: z.string(),
    bestTimeToVisit: z.string(),
    updatedAt: z.date(),
  }),
});

// One entry per city, per language: cities/ru/tokyo.md, cities/en/tokyo.md
const cities = defineCollection({
  type: "content",
  schema: z.object({
    slug: z.string(),                // "tokyo"
    countrySlug: z.string(),         // "japan" — links back to parent country
    name: z.string(),
    lang: z.string(),
    heroImage: z.string(),
    summary: z.string(),
    bestTimeToVisit: z.string(),
    updatedAt: z.date(),
  }),
});

const news = defineCollection({
  type: "content",
  schema: z.object({
    slug: z.string(),
    lang: z.string(),
    title: z.string(),
    summary: z.string(),
    heroImage: z.string(),
    category: z.string(),
    readTimeMinutes: z.number(),
    publishedAt: z.date(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { countries, cities, news };
