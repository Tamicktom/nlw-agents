//* Libraries imports
import { count, ilike, or } from 'drizzle-orm';
import { Elysia, t } from 'elysia';

//* Local imports
import { db } from '../../../db/connection';
import { schema } from '../../../db/schema';

const roomsRoutes = new Elysia({ prefix: '/rooms' });

roomsRoutes.get(
  '/',
  async (req) => {
    req.query.page = req.query.page || 1;
    req.query.limit = req.query.limit || 10;
    req.query.search = req.query.search || '';

    const roomsToWait = db
      .select()
      .from(schema.rooms)
      .where(
        or(
          ilike(schema.rooms.name, `%${req.query.search}%`),
          ilike(schema.rooms.description, `%${req.query.search}%`)
        )
      )
      .orderBy(schema.rooms.createdAt)
      .limit(req.query.limit)
      .offset((req.query.page - 1) * req.query.limit);

    const totalRoomsToWait = db.select({ value: count() }).from(schema.rooms);

    const [rooms, totalRooms] = await Promise.all([
      roomsToWait,
      totalRoomsToWait,
    ]);

    const pagination = {
      page: req.query.page,
      limit: req.query.limit,
      totalItems: totalRooms[0].value,
      totalPages: Math.ceil(totalRooms[0].value / req.query.limit),
    };

    return {
      rooms,
      pagination,
    };
  },
  {
    query: t.Object({
      page: t.Optional(t.Number({ minimum: 1, default: 1 })),
      limit: t.Optional(t.Number({ minimum: 1, maximum: 100, default: 10 })),
      search: t.Optional(t.String()),
    }),
  }
);

export { roomsRoutes };
