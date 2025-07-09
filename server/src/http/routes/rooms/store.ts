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

    if (result.length === 0) {
      req.set.status = 500;
      throw new Error("something went wrong");
    }

    return ({
      room: result[0]
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