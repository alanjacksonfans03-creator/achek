
import { Config } from "drizzle-kit";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

// Use default values if environment variables are not set
const dbConfig = {
  host: dbHost || 'localhost',
  port: parseInt(dbPort || '3306'),
  database: dbName || 'achek_db',
  user: dbUser || 'root',
  password: dbPass || 'password'
};

export default {
  out: "./migrations",
  schema: "./shared/schema.ts",
  driver: "mysql2",
  dbCredentials: dbConfig,
} satisfies Config;
