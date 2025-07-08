//* Libraries imports
import { defineConfig } from "drizzle-kit";

//* Local imports
// import { env } from "./src/env";

const url = process.env.DATABASE_URL || "postgres://docker:docker@localhost:5432/agents";

export default defineConfig({
  dialect: "postgresql",
  casing: "snake_case",
  schema: "./src/db/schema/**.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url,
  }
});