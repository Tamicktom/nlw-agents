//* Libraries imports
import { createFileRoute, Link } from '@tanstack/react-router';

//* Hooks imports
import { useGetRooms } from "@/hooks/rooms/use-get-rooms";

//* Schemas imports
import type { PaginatedRoomSchema } from "@/schemas/rooms";

export const Route = createFileRoute('/create-room')({
  component: CreateRoomPage,
})

function CreateRoomPage() {
  const rooms = useGetRooms();

  if (rooms.isLoading) return <CreateRoomLoading />;

  if (rooms.error || !rooms.data) return <CreateRoomErrorLoading />;

  return (
    <div>
      <h1>Create room</h1>

      <div className='flex flex-col gap-1'>
        {
          rooms.data.rooms.map(room => {
            const key = `room-card-${room.id}`
            return <RoomCard key={key} room={room} />
          })
        }
      </div>
    </div>
  );
}

type RoomCardProps = {
  room: PaginatedRoomSchema;
}

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
  return (
    <div>
      loading...
    </div>
  );
}

function CreateRoomErrorLoading() {
  return (
    <div>
      ops, something went wrong!
    </div>
  );
}