//* Libraries imports
import { Elysia } from 'elysia';

//* Routes imports
import { getRoomQuestions } from './get-room-questions';
import { listRooms } from './list';
import { storeRoom } from './store';
import { storeRoomQuestion } from "./store-room-question";

const roomsRoutes = new Elysia().group('/rooms', (app) => {
  return app.use(listRooms).use(storeRoom).use(getRoomQuestions).use(storeRoomQuestion)
});

export { roomsRoutes };
