import { z } from 'zod';




export const BookSchema = z.object({
  title: z.string(),
  author: z.string(),
    genre: z.enum([
    'FICTION',
    'NON_FICTION',
    'SCIENCE',
    'HISTORY',
    'BIOGRAPHY',
    'FANTASY',
  ], {
    errorMap: () => ({ message: "Please select a genre" })
  }),
  isbn: z.string(),
  description: z.string(),
  copies: z.coerce.number().min(1, "At least 1 copy required").max(100, "Maximum 100 copies allowed"),
  available: z.boolean(),
});

export type bookData = z.infer<typeof BookSchema>

