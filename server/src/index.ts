//* Libraries imports
import { Elysia } from "elysia";

//* Local imports
import { env } from "./env";

const app = new Elysia();

app.listen(env.PORT);

// biome-ignore lint/suspicious/noConsole: <its just to tell that the server is running>
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${env.PORT}`
);
