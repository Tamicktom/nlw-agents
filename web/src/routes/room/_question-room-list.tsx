//* Libraries imports

//* Components imports
import { QuestionRoomListQuestion } from "./_question-room-list-question";

//* Hooks imports
import { useGetRoomsQuestions } from "@/hooks/rooms/use-get-room-questions";

type QuestionsRoomListProps = {
	roomId: string;
};

export function QuestionsRoomList(props: QuestionsRoomListProps) {
	const roomQuestions = useGetRoomsQuestions(props.roomId);

	if (roomQuestions.isLoading) return <QuestionsRoomListSkeleton />;

	if (roomQuestions.isError || !roomQuestions.data)
		return <QuestionsRoomListError />;

	return (
		<div className="flex flex-col w-full gap-2">
			{roomQuestions.data?.map((question) => {
				const key = `room-question-${question.id}`;
				return <QuestionRoomListQuestion key={key} question={question} />;
			})}
		</div>
	);
}

function QuestionsRoomListSkeleton() {
	return <div>...carregando...</div>;
}

function QuestionsRoomListError() {
	return <div>...ERROR...</div>;
}
