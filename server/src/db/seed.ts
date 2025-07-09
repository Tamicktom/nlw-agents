//* Libraries imports
import { reset, seed } from "drizzle-seed";

//* Local imports
import { db } from "./connection";
import { schema } from "./schema";

await reset(db, schema);

await seed(db, schema).refine(f => {
  return {
    rooms: {
      count: 10,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
      },
    },
    questions: {
      count: 50,
      columns: {
        question: f.loremIpsum(),
        answer: f.loremIpsum(),
      }
    }
  };
})

//close connection
await db.$client.close();

// biome-ignore lint/suspicious/noConsole: <its just to tell that the database has been seeded>
console.log("Database seeded successfully.");