//* Libraries imports
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

//* Schemas imports
import { rooms } from "./rooms";

export const questions = pgTable("questions", {
  id: uuid().primaryKey().defaultRandom(),

  roomId: uuid().references(() => rooms.id).notNull(),

  question: text().notNull(),
  answer: text(),

  createdAt: timestamp().defaultNow().notNull()
});