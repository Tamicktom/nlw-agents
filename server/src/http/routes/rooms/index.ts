//* Libraries imports
import { Elysia } from 'elysia';
import { getRoomQuestions } from './get-room-questions';
//* Routes imports
import { listRooms } from './list';
import { storeRoom } from './store';

const roomsRoutes = new Elysia().group('/rooms', (app) => {
  return app.use(listRooms).use(storeRoom).use(getRoomQuestions);
});

export { roomsRoutes };
