//* Libraries imports
import { formOptions, useForm } from "@tanstack/react-form";

//* Components imports
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

//* Hooks imports
import { useStoreRooms } from "@/hooks/rooms/use-store-room";

//* Schemas imports
import { type Room, roomSchema } from "@/schemas/rooms";

const defaultRoom: Room = {
	name: "",
	description: "",
};

const formOpts = formOptions({
	defaultValues: defaultRoom,
});

export function CreateRoomForm() {
	const storeRoom = useStoreRooms();

	const form = useForm({
		...formOpts,
		onSubmit: async (submit) => {
			storeRoom.mutate(
				{ room: submit.value },
				{
					onSuccess: () => {
						form.reset();
					},
				},
			);
		},
		validators: {
			onBlur: roomSchema,
		},
	});

	return (
		<Card.Root>
			<Card.Header>
				<Card.Title>Criar nova sala</Card.Title>
				<Card.Description>
					Coloque as informações e crie uma nova sala
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					className="flex flex-col gap-8"
				>
					<div className="flex flex-col w-full gap-4">
						<form.Field name="name">
							{(field) => {
								return (
									<div className="flex flex-col w-full gap-2">
										<Label htmlFor="create-room-name">Nome da sala</Label>
										<div>
											<Input
												id="create-room-name"
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
									</div>
								);
							}}
						</form.Field>

						<form.Field name="description">
							{(field) => {
								return (
									<div className="flex flex-col w-full gap-2">
										<Label htmlFor="create-room-description">
											Descrição da sala
										</Label>
										<div>
											<Textarea
												id="create-room-description"
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
									</div>
								);
							}}
						</form.Field>
					</div>

					<Button
						id="create-room"
						type="submit"
						className="w-full"
						disabled={form.state.isSubmitting}
					>
						{form.state.isSubmitting ? "Criando..." : "Criar"}
					</Button>
				</form>
			</Card.Content>
		</Card.Root>
	);
}
