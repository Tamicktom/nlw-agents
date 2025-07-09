//* Libraries imports
import z from "zod/v4";

export const paginatedRoomSchema = z.object({
	id: z.string(),
	name: z.string(),
	createdAt: z.coerce.date(),
	questionsCount: z.number(),
});

export type PaginatedRoomSchema = z.infer<typeof paginatedRoomSchema>;

export const roomSchema = z.object({
	name: z
		.string()
		.min(3, "Precisa ter pelo menos 3 letras")
		.max(64, "Máximo de 64 letras"),
	description: z.string(),
});

export type Room = z.infer<typeof roomSchema>;