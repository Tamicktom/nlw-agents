//* Libraries imports
import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";

//* Components imports
import { Badge } from "@/components/ui/badge";

//* Schemas imports
import type { PaginatedRoomSchema } from "@/schemas/rooms";

//* utils imports
import { dayjs } from "@/lib/dayjs";

type RoomCardProps = {
	room: PaginatedRoomSchema;
};

export function RoomCard(props: RoomCardProps) {
	return (
		<Link
			className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50"
			to="/room/$roomId"
			params={{
				roomId: props.room.id,
			}}
		>
			<div className="flex flex-col flex-1 gap-1">
				<h3>{props.room.name}</h3>

				<div className="flex items-center gap-2">
					<Badge variant="secondary" className="text-xs">
						{dayjs(props.room.createdAt).toNow()}
					</Badge>
					<Badge variant="secondary" className="text-xs">
						{props.room.questionsCount} pergunta(s)
					</Badge>
				</div>
			</div>

			<span className="flex items-center gap-1 text-sm">
				Entrar <ArrowRightIcon className="size-3" />
			</span>
		</Link>
	);
}
