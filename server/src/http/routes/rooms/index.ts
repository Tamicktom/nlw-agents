//* Libraries imports
import { Elysia } from 'elysia';

//* Routes imports
import { listRooms } from "./list";
import { storeRoom } from "./store";

const roomsRoutes = new Elysia().group("/rooms", app => {
  return app.use(listRooms).use(storeRoom)
})

export { roomsRoutes };
