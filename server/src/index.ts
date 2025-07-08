//* Libraries imports

import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';
//* Local imports
import { env } from './env';
//* Routes imports
import { roomsRoutes } from './http/routes/rooms';

const server = new Elysia();

server.use(cors());
server.use(swagger());

server.use(roomsRoutes);

server.listen(env.PORT);

// biome-ignore lint/suspicious/noConsole: <its just to tell that the server is running>
console.log(`
  🦊 Elysia is running at ${server.server?.hostname}:${env.PORT}
  Swagger UI is available at ${server.server?.hostname}:${env.PORT}/swagger
`);
