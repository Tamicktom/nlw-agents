//* Libraries imports
import { useMutation } from "@tanstack/react-query";
import z from "zod/v4";

import {
	queryKeys,
	refetchQuerie,
} from "@/integrations/tanstack-query/root-provider";
//* Local imports
import { apiURL } from "@/utils/api";

//* Schemas imports
import type { Room } from "@/schemas/rooms";

const apiResponseSchema = z.object({
	room: z.object({
		id: z.string(),
		name: z.string(),
		description: z.string(),
	}),
});

type StoreRoomProps = {
	room: Room;
};

async function storeRoom(props: StoreRoomProps) {
	const url = apiURL("/rooms");

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(props.room),
	});

	const data = apiResponseSchema.parse(await response.json());

	return data;
}

export function useStoreRooms() {
	return useMutation({
		mutationFn: storeRoom,
		onSuccess: async () => {
			await refetchQuerie(queryKeys.rooms.list);
		},
	});
}
