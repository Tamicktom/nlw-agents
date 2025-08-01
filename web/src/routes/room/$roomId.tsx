//* Libraries imports
import { Link, createFileRoute, useParams } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";

//* Components imports
import { Button } from "@/components/ui/button";
import { QuestionForm } from "./_question-form";
import { QuestionsRoomList } from "./_question-room-list";

export const Route = createFileRoute("/room/$roomId")({
	component: RouteComponent,
	params: {
		parse: (ok) => {
			return ok;
		},
	},
});

function RouteComponent() {
	const params = useParams({ from: "/room/$roomId" });

	return (
		<div className="flex flex-col items-center justify-start p-4 min-h-svh bg-zinc-900">
			<div className="max-w-4xl w-full">
				<div className="flex flex-row items-center justify-between w-full">
					<Link to="/create-room">
						<Button id="go-back" type="button" variant="outline">
							<ArrowLeftIcon />
							Voltar ao inicio
						</Button>
					</Link>

					<Link
						to="/record-room-audio/$roomId"
						params={{ roomId: params.roomId }}
					>
						<Button id="record-audio" type="button" variant="secondary">
							Gravar Áudio
						</Button>
					</Link>
				</div>

				<div className="w-full flex flex-col py-4">
					<h1 className="text-2xl font-bold">Sala de perguntas</h1>
					<span>Faça a sua pergunta e receba respostas com IA</span>
				</div>

				<div className="w-full flex flex-col gap-4">
					<QuestionForm roomId={params.roomId} />
					<QuestionsRoomList roomId={params.roomId} />
				</div>
			</div>
		</div>
	);
}
