//* Libraries imports
import { t } from "elysia";
import { Value } from "@sinclair/typebox/value";

const EnvSchema = t.Object({
  PORT: t.String({ default: "3333" }),
});

export const env = Value.Decode(EnvSchema, process.env);