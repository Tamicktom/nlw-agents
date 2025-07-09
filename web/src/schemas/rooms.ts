//* Libraries imports
import z from "zod/v4";

export const paginatedRoomSchema = z.object({
	id: z.string(),
	name: z.string(),
	createdAt: z.coerce.date(),
	questionsCount: z.number(),
});

export type PaginatedRoomSchema = z.infer<typeof paginatedRoomSchema>;
