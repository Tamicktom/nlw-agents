//* Components imports
import Card from "@/components/ui/card";

//* Schemas imports
import type { PaginatedQuestion } from "@/schemas/questions";

type QuestionRoomListQuestionProps = {
  question: PaginatedQuestion;
}

export function QuestionRoomListQuestion(props: QuestionRoomListQuestionProps){
  return(
    <Card.Root>
      <Card.Content>
        {props.question.question}
      </Card.Content>
    </Card.Root>
  );
}