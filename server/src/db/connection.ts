//* Libraries imports
import { SQL } from 'bun';
import { drizzle } from 'drizzle-orm/bun-sql';

//* local imports
import { env } from '../env';
import { schema } from './schema';

export const sql = new SQL(env.DATABASE_URL);

export const db = drizzle({
  schema,
  casing: "snake_case",
  client: sql,
});
