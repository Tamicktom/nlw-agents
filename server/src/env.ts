//* Libraries imports
import { Value } from "@sinclair/typebox/value";
import { t } from "elysia";

const EnvSchema = t.Object({
  PORT: t.String({ default: "3333" }),
  DATABASE_URL: t.String({
    default: "postgres://docker:docker@localhost:5432/agents",
  }),
  GEMINI_API_KEY: t.String(),
});

export const env = Value.Decode(EnvSchema, process.env);