//* Libraries imports
import { useQuery } from "@tanstack/react-query";
import z from "zod/v4";

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
		queryKey: ["get-rooms"],
		queryFn: getRooms,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
}
