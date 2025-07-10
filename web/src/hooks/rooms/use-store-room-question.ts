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

const apiResponseSchema = z.object({
	question: z.object({
		id: z.string(),
	}),
});

type StoreRoomQuestionProps = {
	question: string;
};

async function storeRoomQuestion(
	roomId: string,
	question: StoreRoomQuestionProps,
) {
	const url = apiURL(`/rooms/${roomId}/questions`);

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(question),
	});

	const data = apiResponseSchema.parse(await response.json());

	return data;
}

export function useStoreRoomQuestion(roomId: string) {
	return useMutation({
		mutationFn: async (question: StoreRoomQuestionProps) =>
			await storeRoomQuestion(roomId, question),
		onSuccess: async () => {
			await refetchQuerie(queryKeys.rooms.questions.list);
		},
	});
}
