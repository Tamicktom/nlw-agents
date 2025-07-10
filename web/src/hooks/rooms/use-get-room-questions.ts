//* Libraries imports
import { useQuery } from "@tanstack/react-query";
import z from "zod/v4";

import { queryKeys } from "@/integrations/tanstack-query/root-provider";
//* Local imports
import { apiURL } from "@/utils/api";

//* Schemas imports
import { pagination } from "@/schemas/pagination";
import { paginatedQuestion } from "@/schemas/questions";

const apiResponseSchema = paginatedQuestion.array();

type GetRoomsQuestionsProps = {
	page?: number;
	limit?: number;
	search?: string;
};

async function getRoomsQuestions(
	roomId: string,
	props: GetRoomsQuestionsProps,
) {
	const params = {
		page: props.page || 1,
		limit: props.limit || 10,
		search: props.search || "",
	};

	const url = apiURL(`/rooms/${roomId}/questions`, params);

	const response = await fetch(url);

	const data = apiResponseSchema.parse(await response.json());

	return data;
}

export function useGetRoomsQuestions(
	roomId: string,
	props: GetRoomsQuestionsProps = {},
) {
	return useQuery({
		queryKey: [queryKeys.rooms.questions.list, roomId],
		queryFn: async () => await getRoomsQuestions(roomId, props),
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
}
