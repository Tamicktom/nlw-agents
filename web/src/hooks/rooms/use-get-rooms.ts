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

type GetRoomsProps = {
	page?: number;
	limit?: number;
	search?: string;
};

async function getRooms(props: GetRoomsProps) {
	const params = {
		page: props.page || 1,
		limit: props.limit || 10,
		search: props.search || "",
	};

	const url = apiURL("/rooms", params);

	const response = await fetch(url);

	const data = apiResponseSchema.parse(await response.json());

	return data;
}

export function useGetRooms(props: GetRoomsProps = {}) {
	return useQuery({
		queryKey: [queryKeys.rooms.list],
		queryFn: async () => await getRooms(props),
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
}
