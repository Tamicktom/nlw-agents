//* Libraries imports
import { useMutation } from "@tanstack/react-query";
import z from "zod/v4";

//* Local imports
import {
	getContext,
	queryKeys,
} from "@/integrations/tanstack-query/root-provider";
import { apiURL } from "@/utils/api";

//* Schemas imports
import type { UseGetRoomQuestionsApiResponse } from "./use-get-room-questions";

const apiResponseSchema = z.object({
	question: z.object({
		id: z.string(),
		answer: z.string().nullable(),
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

const temporaryId = "temporary";

export function useStoreRoomQuestion(roomId: string) {
	return useMutation({
		mutationFn: async (question: StoreRoomQuestionProps) =>
			await storeRoomQuestion(roomId, question),

		onMutate(variables) {
			const context = getContext();
			const questions =
				context.queryClient.getQueryData<UseGetRoomQuestionsApiResponse>([
					queryKeys.rooms.questions.list,
					roomId,
				]);

			if (!questions) return;

			context.queryClient.setQueryData<UseGetRoomQuestionsApiResponse>(
				[queryKeys.rooms.questions.list, roomId],
				() => {
					const newQuestion: UseGetRoomQuestionsApiResponse[number] = {
						id: temporaryId,
						question: variables.question,
						answer: null,
						isAnswering: true,
					};
					return [newQuestion, ...questions];
				},
			);
		},

		onSuccess: async (variables) => {
			// await refetchQuerie(queryKeys.rooms.questions.list);

			const context = getContext();
			const questions =
				context.queryClient.getQueryData<UseGetRoomQuestionsApiResponse>([
					queryKeys.rooms.questions.list,
					roomId,
				]);

			if (!questions) return;

			context.queryClient.setQueryData<UseGetRoomQuestionsApiResponse>(
				[queryKeys.rooms.questions.list, roomId],
				() => {
					const oldQuestion = questions.find((q) => q.id === temporaryId);

					if (!oldQuestion) return questions;

					const newQuestions = questions.map((q) => {
						if (q.id === temporaryId) {
							return {
								...q,
								id: variables.question.id,
								answer: variables.question.answer,
								isAnswering: false,
							};
						}
						return q;
					});

					return newQuestions;
				},
			);
		},
	});
}
