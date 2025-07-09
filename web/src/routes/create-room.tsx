//* Libraries imports
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";

//* Hooks imports
import { useGetRooms } from "@/hooks/rooms/use-get-rooms";

//* Components imports
import { Badge } from "@/components/ui/badge";
import Card from "@/components/ui/card";

//* Schemas imports
import type { PaginatedRoomSchema } from "@/schemas/rooms";

//* utils imports
import { dayjs } from "@/lib/dayjs";

export const Route = createFileRoute("/create-room")({
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
								return (
									<Link
										key={key}
										className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50"
										to="/room/$roomId"
										params={{
											roomId: room.id,
										}}
									>
										<div className="flex flex-col flex-1 gap-1">
											<h3>{room.name}</h3>

											<div className="flex items-center gap-2">
												<Badge variant="secondary" className="text-xs">
													{dayjs(room.createdAt).toNow()}
												</Badge>
												<Badge variant="secondary" className="text-xs">
													{room.questionsCount} pergunta(s)
												</Badge>
											</div>
										</div>

										<span className="flex items-center gap-1 text-sm">
											Entrar <ArrowRightIcon className="size-3" />
										</span>
									</Link>
								);
							})}
						</Card.Content>
					</Card.Root>
				</div>
			</div>
		</div>
	);
}

type RoomCardProps = {
	room: PaginatedRoomSchema;
};

function RoomCard(props: RoomCardProps) {
	return (
		<div>
			<span>{props.room.name}</span>
			<Link to={"/room/$roomId"} params={{ roomId: props.room.id }}>
				See
			</Link>
		</div>
	);
}

function CreateRoomLoading() {
	return <div>loading...</div>;
}

function CreateRoomErrorLoading() {
	return <div>ops, something went wrong!</div>;
}
