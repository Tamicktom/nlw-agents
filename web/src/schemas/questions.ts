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
