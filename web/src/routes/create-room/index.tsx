//* Libraries imports
import { createFileRoute } from "@tanstack/react-router";

//* Hooks imports
import { useGetRooms } from "@/hooks/rooms/use-get-rooms";

//* Components imports
import Card from "@/components/ui/card";
import { RoomCard } from "./_room-card";

export const Route = createFileRoute("/create-room/")({
	component: CreateRoomPage,
});

function CreateRoomPage() {
	const rooms = useGetRooms();

	if (rooms.isLoading) return <CreateRoomLoading />;

	if (rooms.error || !rooms.data) return <CreateRoomErrorLoading />;

	return (
		<div className="flex flex-col items-center justify-start p-4 min-h-svh bg-zinc-900">
			<div className="max-w-4xl">
				<div className="grid items-start grid-cols-2 gap-8">
					<Card.Root>
						<Card.Header>
							<Card.Title>Salas recentes</Card.Title>
							<Card.Description>
								Acesso rápido para as salas criadas recentemente
							</Card.Description>
						</Card.Header>

						<Card.Content className="flex flex-col gap-3">
							{rooms.data.rooms.map((room) => {
								const key = room.id;
								return <RoomCard key={key} room={room} />;
							})}
						</Card.Content>
					</Card.Root>
				</div>
			</div>
		</div>
	);
}

function CreateRoomLoading() {
	return <div>loading...</div>;
}

function CreateRoomErrorLoading() {
	return <div>ops, something went wrong!</div>;
}
