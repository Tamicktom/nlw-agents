//* Libraries imports
import { createFileRoute, useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/room/$roomId')({
  component: RouteComponent,
  params: {
    parse: (ok) => { return ok }
  }
})

function RouteComponent() {
  const params = useParams({ from: "/room/$roomId" });

  return (
    <div>
      Hello from {params.roomId}
    </div>
  )
}
