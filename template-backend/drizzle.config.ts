import "dotenv/config"; // make sure to install dotenv package
import { defineConfig } from "drizzle-kit";
import { DB } from "./src/constants/db.constants";

export default defineConfig({
  dialect: "postgresql",
  out: "./src/drizzle/migrations",
  schema: "./src/drizzle/schema.ts",
  dbCredentials: {
    host: DB.HOST,
    port: DB.PORT,
    user: DB.USER,
    password: DB.PASSWORD,
    database: DB.DATABASE,
  },
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: true,
});
