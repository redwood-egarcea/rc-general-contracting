import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const services = defineCollection({
  loader: file('src/content/services.json'),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    description: z.string(),
    items: z.array(z.string()),
    groupedItems: z.array(z.string()).optional(),
  }),
});
const testimonials = defineCollection({
  loader: file('src/content/testimonials.json'),
  schema: z.object({
    order: z.number(),
    name: z.string(),
    initials: z.string(),
    quote: z.string(),
    date: z.string(),
    dateLabel: z.string(),
    rating: z.literal(5),
    ratingLabel: z.string(),
  }),
});
export const collections = { services, testimonials };
