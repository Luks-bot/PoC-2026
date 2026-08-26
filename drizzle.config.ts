import { env, loadEnvFile } from "node:process";
import { defineConfig } from "drizzle-kit";

loadEnvFile(".env");

const databaseUrl = env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not configured");
}

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    url: databaseUrl,
  },
  strict: true,
  verbose: true,
});
