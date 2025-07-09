//* Libraries imports
import { formOptions, useForm } from "@tanstack/react-form";

//* Components imports
import { Button } from "@/components/ui/button";
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
			storeRoom.mutate({ room: submit.value });
		},
		validators: {
			onBlur: roomSchema,
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
			<form.Field name="name">
				{(field) => {
					return (
						<>
							<Label htmlFor="create-room-name">Nome da sala</Label>
							<Input
								id="create-room-name"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
							<div>
								{field.state.meta.errors.map((error, index) => {
									const key = `error-${index}`;
									return <span key={key}>{error?.message}</span>;
								})}
							</div>
						</>
					);
				}}
			</form.Field>

			<form.Field name="description">
				{(field) => {
					return (
						<>
							<Label htmlFor="create-room-description">Descrição da sala</Label>
							<Textarea
								id="create-room-description"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
							<div>
								{field.state.meta.errors.map((error, index) => {
									const key = `error-${index}`;
									return <span key={key}>{error?.message}</span>;
								})}
							</div>
						</>
					);
				}}
			</form.Field>

			<Button id="create-room" type="submit" disabled={form.state.isSubmitting}>
				{form.state.isSubmitting ? "Criando..." : "Criar"}
			</Button>
		</form>
	);
}
