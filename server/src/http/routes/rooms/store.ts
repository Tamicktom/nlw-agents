//* Libraries imports
import { Elysia, t } from "elysia";

//* Local imports
import { db } from "../../../db/connection";
import { rooms } from "../../../db/schema/rooms";


const storeRoom = new Elysia();

storeRoom.post("/",
  async (req) => {
    const result = await db
      .insert(rooms)
      .values({
        name: req.body.name,
        description: req.body.description
      })
      .returning({
        id: rooms.id,
        name: rooms.name,
        description: rooms.description
      });

    const insertedRoom = result[0];

    if (!insertedRoom) {
      req.set.status = 500;
      throw new Error("something went wrong");
    }

    return ({
      room: insertedRoom
    })
  },
  {
    body: t.Object({
      name: t.String({ minLength: 3, maxLength: 64 }),
      description: t.String({ minLength: 0, maxLength: 512 })
    })
  }
);

export { storeRoom };