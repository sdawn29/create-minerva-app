import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";
import { DB } from "../constants/db.constants";

export const client = new Client({
  host: DB.HOST,
  port: DB.PORT,
  user: DB.USER,
  password: DB.PASSWORD,
  database: DB.DATABASE,
});

// { schema } is used for relational queries
export const db = drizzle(client, { schema });
