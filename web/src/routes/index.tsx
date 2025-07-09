//* Libraries imports
import { createFileRoute, Link } from '@tanstack/react-router';

//* Hooks imports
import { useGetRooms } from "@/hooks/rooms/use-get-rooms";

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const rooms = useGetRooms();

  return (
    <div>
      Hello world

      <pre>
        {
          JSON.stringify(rooms.data, null, 2)
        }
      </pre>

      <div className='flex flex-col gap-2'>
        <Link to="/room">
          Room
        </Link>

        <Link to="/create-room">
          Create Room
        </Link>
      </div>
    </div>
  )
}
