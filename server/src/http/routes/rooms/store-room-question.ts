//* Libraries imports
import { and, eq, sql } from 'drizzle-orm';
import { Elysia, t } from 'elysia';

//* Local imports
import { db } from '../../../db/connection';
import { schema } from '../../../db/schema';
import { generateAnswer, generateEmbeddings } from '../../../services/gemini';

const storeRoomQuestion = new Elysia();

const similarity = 0.7;

storeRoomQuestion.post(
  '/:roomId/questions',
  async (req) => {
    const embeddings = await generateEmbeddings(req.body.question);
    const embeddingsAsString = `[${embeddings.join(',')}]`;

    // const similarityScore = sql<number>`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector)`;

    const chunks = await db
      .select({
        id: schema.audioChunks.id,
        transcription: schema.audioChunks.transcription,
        similarity: sql<number>`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector)`,
      })
      .from(schema.audioChunks)
      .where(
        and(
          eq(schema.audioChunks.roomId, req.params.roomId),
          sql<boolean>`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector) > ${similarity}`
        )
      )
      .orderBy(
        sql<number>`${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector`
      )
      .limit(3);

    let answer: string | null = null;

    if (chunks.length > 0) {
      const transcriptions = chunks.map((chunk) => chunk.transcription);

      answer = await generateAnswer(req.body.question, transcriptions);
    }

    const result = await db
      .insert(schema.questions)
      .values({
        roomId: req.params.roomId,
        question: req.body.question,
        answer,
      })
      .returning({
        id: schema.questions.id,
      });

    const storedQuestion = result[0];

    if (!storedQuestion) {
      req.set.status = 500;
      throw new Error('Something went wrong');
    }

    return {
      question: storedQuestion,
      answer,
    };
  },
  {
    params: t.Object({
      roomId: t.String({ format: 'uuid' }),
    }),
    body: t.Object({
      question: t.String({ minLength: 3, maxLength: 512 }),
    }),
  }
);

export { storeRoomQuestion };
