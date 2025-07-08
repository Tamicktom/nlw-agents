//* Libraries imports
import { Elysia } from "elysia";

//* Local imports
import { db } from "../../../db/connection";

const roomsRoutes = new Elysia({ prefix: "/rooms" });

roomsRoutes.get("/", async () => {
  return await db.query.rooms.findMany({ limit: 50 });
});

export { roomsRoutes };