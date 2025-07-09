//* Libraries imports
import { createFileRoute } from "@tanstack/react-router";

//* Components imports
import { CreateRoomForm } from "./_create-room-form";
import { RoomsList } from "./_rooms-list";

export const Route = createFileRoute("/create-room/")({
	component: CreateRoomPage,
});

function CreateRoomPage() {
	return (
		<div className="flex flex-col items-center justify-start p-4 min-h-svh bg-zinc-900">
			<div className="max-w-4xl">
				<div className="grid items-start grid-cols-2 gap-8">
					<CreateRoomForm />
					<RoomsList />
				</div>
			</div>
		</div>
	);
}
