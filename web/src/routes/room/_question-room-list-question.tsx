//* Libraries imports
import { BotIcon, LoaderCircleIcon, UserRoundIcon } from "lucide-react";

//* Components imports
import Card from "@/components/ui/card";

//* Schemas imports
import type { PaginatedQuestion } from "@/schemas/questions";

type QuestionRoomListQuestionProps = {
	question: PaginatedQuestion;
};

export function QuestionRoomListQuestion(props: QuestionRoomListQuestionProps) {
	const theresAnAnswer = checkIfTheresAnAnswer(props.question.answer);

	console.log(theresAnAnswer, props.question.answer);

	return (
		<Card.Root>
			<Card.Content>
				<div className="w-full flex flex-col gap-4">
					<div className="flex flex-col gap-2 border-b pb-4">
						<span className="flex flex-row gap-2 items-center text-muted-foreground">
							<UserRoundIcon className="size-5" />
							Pergunta do usuário
						</span>
						<div>{props.question.question}</div>
					</div>

					<div className="flex flex-col gap-2">
						<span className="flex flex-row gap-2 items-center text-muted-foreground">
							<BotIcon className="size-5" />
							Resposta da IA
						</span>
						<div>
							{theresAnAnswer ? (
								props.question.answer
							) : (
								<span className="flex flex-row items-center gap-2 text-muted-foreground">
									<LoaderCircleIcon className="animate-spin size-4" />
									Esperando resposta...
								</span>
							)}
						</div>
					</div>
				</div>
			</Card.Content>
		</Card.Root>
	);
}

function checkIfTheresAnAnswer(answer: string | null): boolean {
	let thereIs = true;

	if (answer === null) thereIs = false;
	if (answer === "") thereIs = false;
	if (answer?.trim() === "") thereIs = false;

	return thereIs;
}
