//* Libraries imports
import { formOptions, useForm } from "@tanstack/react-form";

//* Componens imports
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

//* Hooks imports
import { useStoreRoomQuestion } from "@/hooks/rooms/use-store-room-question";

//* Schemas imports
import { type StoreQuestion, storeQuestion } from "@/schemas/questions";

const defaultValues: StoreQuestion = {
	question: "",
};

const formOpts = formOptions({
	defaultValues,
});

type QuestionFormProps = {
	roomId: string;
};

export function QuestionForm(props: QuestionFormProps) {
	const storeRoomQuestion = useStoreRoomQuestion(props.roomId);

	const form = useForm({
		...formOpts,
		validators: {
			onBlur: storeQuestion,
		},
		onSubmit: async (submit) => {
			storeRoomQuestion.mutate(submit.value);
		},
	});

	return (
		<Card.Root>
			<Card.Header>
				<Card.Title>Fazer uma pergunta</Card.Title>
				<Card.Description>
					Digite a sua pergunta abaixo para receber uma resposta gerado por IA
				</Card.Description>
			</Card.Header>

			<Card.Content>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<form.Field name="question">
						{(field) => {
							return (
								<div className="flex flex-col w-full gap-2">
									<Label htmlFor="question-text">Sua Pergunta</Label>
									<Textarea
										id="question-test"
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
									/>
									<div className="text-sm text-destructive-foreground">
										{field.state.meta.errors.map((error, index) => {
											const key = `error-${index}`;
											return <span key={key}>{error?.message}</span>;
										})}
									</div>
								</div>
							);
						}}
					</form.Field>

					<div className="w-full flex flex-row justify-end items-center">
						<Button
							id="create-question"
							type="submit"
							disabled={form.state.isSubmitting}
						>
							{form.state.isSubmitting ? "Criando..." : "Criar pergunta"}
						</Button>
					</div>
				</form>
			</Card.Content>
		</Card.Root>
	);
}
