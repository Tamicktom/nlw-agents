//* Libraries imports
import { formOptions, useForm } from "@tanstack/react-form";

//* Componens imports
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

//* Hooks imports

//* Schemas imports
import { type StoreQuestion, storeQuestion } from "@/schemas/questions";

const defaultValues: StoreQuestion = {
	question: "",
};

const formOpts = formOptions({
	defaultValues,
});

export function QuestionForm() {
	const form = useForm({
		...formOpts,
		validators: {
			onBlur: storeQuestion,
		},
		onSubmit: async (submit) => {
			console.log(submit);
		},
	});

	return (
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

			<Button
				id="create-question"
				type="submit"
				className="w-full"
				disabled={form.state.isSubmitting}
			>
				{form.state.isSubmitting ? "Criando..." : "Criar pergunta"}
			</Button>
		</form>
	);
}
