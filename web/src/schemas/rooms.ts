//* Libraries imports
import z from "zod";

export const paginatedRoomSchema = z.object({
  id: z.string(),
  name: z.string()
});

export type PaginatedRoomSchema = z.infer<typeof paginatedRoomSchema>;