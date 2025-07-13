//* Libraries imports

import Bun from 'bun';
import { Elysia, t } from 'elysia';

//* Local imports
import { db } from '../../../db/connection';
import { schema } from '../../../db/schema';

//* Services imports
import { generateEmbeddings, transcribeAudio } from '../../../services/gemini';

const storeRoomAudioRecording = new Elysia();

storeRoomAudioRecording.post(
  '/:roomId/audio-recording',
  async (req) => {
    const fileName = Bun.randomUUIDv7();

    const fullFileName = `${fileName}.webm`;
    const path = `./public/audios/${req.params.roomId}/${fullFileName}`;

    // save file locally
    await Bun.write(path, req.body.file);

    // Get base64
    const buffer = await req.body.file.arrayBuffer();
    const audioAsBase64 = Buffer.from(buffer).toString('base64');

    const transcription = await transcribeAudio(audioAsBase64, 'audio/webm');
    const embeddings = await generateEmbeddings(transcription);

    const insertResult = await db
      .insert(schema.audioChunks)
      .values({
        roomId: req.params.roomId,
        transcription,
        embeddings
      })
      .returning();

    if (!insertResult[0]) {
      throw new Error("Something went wrong");
    }

    const newEmbedding = insertResult[0];

    return {
      newEmbedding
    };
  },
  {
    params: t.Object({
      roomId: t.String({ format: 'uuid' }),
    }),
    body: t.Object({
      file: t.File({
        minSize: 1, // 1 byte
        maxSize: 1024 * 1024 * 20, // 20 megabytes
        // type: ["audio/*"]
      }),
    }),
  }
);

export { storeRoomAudioRecording };
