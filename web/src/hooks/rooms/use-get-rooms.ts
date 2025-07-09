//* Libraries imports
import { useQuery } from "@tanstack/react-query";
import z from "zod/v4";

import { queryKeys } from "@/integrations/tanstack-query/root-provider";
//* Local imports
import { apiURL } from "@/utils/api";

//* Schemas imports
import { pagination } from "@/schemas/pagination";
import { paginatedRoomSchema } from "@/schemas/rooms";

const apiResponseSchema = z.object({
	rooms: paginatedRoomSchema.array(),
	pagination: pagination,
});

async function getRooms() {
	const url = apiURL("/rooms");

	const response = await fetch(url);

	const data = apiResponseSchema.parse(await response.json());

	return data;
}

export function useGetRooms() {
	return useQuery({
		queryKey: [queryKeys.rooms.list],
		queryFn: getRooms,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
}
