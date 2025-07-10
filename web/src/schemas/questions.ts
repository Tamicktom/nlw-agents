//* Libraries imports
import z from "zod/v4";

export const storeQuestion = z.object({
	question: z
		.string()
		.trim()
		.min(3, "Pelo menos 3 letras")
		.max(512, "Máximo de 512 carateres"),
});

export type StoreQuestion = z.infer<typeof storeQuestion>;

export const paginatedQuestion = z.object({
	id: z.string(),
	question: z.string(),
	answer: z.string().nullable(),
});

export type PaginatedQuestion = z.infer<typeof paginatedQuestion>;
