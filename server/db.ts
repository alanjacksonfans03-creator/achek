
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from "@shared/schema";
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

export const connection = mysql.createPool(dbConfig);

export const db = drizzle(connection, { schema, mode: "default" });

