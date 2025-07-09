//* Libraries imports
import { createFileRoute } from '@tanstack/react-router';

//* Hooks imports
import { useGetRooms } from "@/hooks/rooms/use-get-rooms";

export const Route = createFileRoute('/create-room')({
  component: CreateRoomPage,
})

function CreateRoomPage() {
  const rooms = useGetRooms();

  if (rooms.isLoading) return <CreateRoomLoading />;

  if (rooms.error || !rooms.data) return <CreateRoomErrorLoading />

  return (
    <div>
      <h1>Create room</h1>
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