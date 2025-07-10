//* Hooks imports
import { useGetRooms } from "@/hooks/rooms/use-get-rooms";

//* Components imports
import Card from "@/components/ui/card";
import { RoomCard } from "./_room-card";

export function RoomsList() {
	const rooms = useGetRooms({
		page: 1,
		limit: 20,
	});

	if (rooms.isLoading) return <CreateRoomLoading />;

	if (rooms.error || !rooms.data) return <CreateRoomErrorLoading />;

	return (
		<Card.Root>
			<Card.Header>
				<Card.Title>Salas recentes</Card.Title>
				<Card.Description>
					Acesso rápido para as salas criadas recentemente
				</Card.Description>
			</Card.Header>

			<Card.Content className="flex flex-col gap-3">
				{rooms.data.rooms?.map((room) => {
					const key = room.id;
					return <RoomCard key={key} room={room} />;
				})}
			</Card.Content>
		</Card.Root>
	);
}

function CreateRoomLoading() {
	return <div>loading...</div>;
}

function CreateRoomErrorLoading() {
	return <div>ops, something went wrong!</div>;
}
