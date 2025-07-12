//* Libraries imports

import Bun from 'bun';
import { Elysia, t } from 'elysia';

//* Local imports
// import { db } from "../../../db/connection";
// import { schema } from "../../../db/schema";

const storeRoomAudioRecording = new Elysia();

storeRoomAudioRecording.post(
  '/:roomId/audio-recording',
  async (req) => {
    const fileName = Bun.randomUUIDv7();

    const fullFileName = `${fileName}.webm`;
    const path = `./public/audios/${req.params.roomId}/${fullFileName}`;

    await Bun.write(path, req.body.file);

    // save file locally
    return {
      message: 'ok',
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
      }),
    }),
  }
);

export { storeRoomAudioRecording };
