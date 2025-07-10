//* Libraries imports
import { eq } from "drizzle-orm";
import { Elysia, t } from "elysia";

//* local imports
import { db } from "../../../db/connection";
import { schema } from "../../../db/schema";

const getRoomQuestions = new Elysia();

getRoomQuestions.get(
  "/:roomId/questions",
  async (req) => {
    const result = await db
      .select({
        id: schema.questions.id,
        question: schema.questions.question,
        answer: schema.questions.answer,
        createdAt: schema.questions.createdAt,
      })
      .from(schema.questions)
      .where(
        eq(schema.questions.roomId, req.params.roomId)
      );

    return result;
  },
  {
    params: t.Object({
      roomId: t.String()
    })
  }
);

export { getRoomQuestions };