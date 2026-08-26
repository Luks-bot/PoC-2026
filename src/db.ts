import { env } from "node:process";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { schema } from "./schema.js";

const databaseUrl = env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not configured");
}

export const client = mysql.createPool(databaseUrl);
export const db = drizzle(client, { mode: "default", schema });
