//* Libraries imports
import { createFileRoute, useParams } from "@tanstack/react-router";

//* Components imports
import Card from "@/components/ui/card";
import { QuestionForm } from "./_question-form";

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
		<div>
			<h1>Sala de perguntas</h1>
			<span>Faça a sua pergunta e receba respostas com IA</span>

			<Card.Root>
				<Card.Header>
					<Card.Title>Fazer uma pergunta</Card.Title>
					<Card.Description>
						Digite a sua pergunta abaixo para receber uma resposta gerado por IA
					</Card.Description>
				</Card.Header>

				<Card.Content>
					<QuestionForm />
				</Card.Content>
			</Card.Root>

      <div>
        <h2>Perguntas & Respostas</h2>
        <div>
          
        </div>
      </div>
		</div>
	);
}
