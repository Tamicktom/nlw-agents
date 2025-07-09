//* Libraries imports
import z from "zod";

export const pagination = z.object({
  page: z.number(),
  limit: z.number(),
  totalItems: z.number(),
  totalPages: z.number()
});

export type Pagination = z.infer<typeof pagination>;