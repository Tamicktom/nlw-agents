//* Libraries imports
import { Elysia, t } from "elysia";

//* Local imports
import { db } from "../../../db/connection";
import { schema } from "../../../db/schema";

const storeRoomQuestion = new Elysia();

storeRoomQuestion.post(
  "/:roomId/questions",
  async (req) => {
    const result = await db
      .insert(schema.questions)
      .values({
        roomId: req.params.roomId,
        question: req.body.question
      })
      .returning({
        id: schema.questions.id
      });

    const storedQuestion = result[0];

    if (!storedQuestion) {
      req.set.status = 500;
      throw new Error("Something went wrong");
    }

    return ({
      question: storedQuestion
    })
  },
  {
    params: t.Object({
      roomId: t.String({ format: "uuid" })
    }),
    body: t.Object({
      question: t.String({ minLength: 3, maxLength: 512 })
    })
  }
)

export { storeRoomQuestion };