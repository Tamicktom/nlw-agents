//* Libraries imports
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div>
      Hello world

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
