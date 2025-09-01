// config/db.js
import pg from "pg";
import dotenv from 'dotenv';
import { createClient } from "@supabase/supabase-js";


dotenv.config();

const { Client } = pg;


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);


const portNum = parseInt(process.env.POSTGRES_PORT || "5432", 10);
const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {rejectUnauthorized:false},
});

let connected = false;

const connectDB = async () => {

  try {
    await db.connect();
    connected = true;
    console.log("✅ Connected to PostgreSQL");
  } catch (err) {
    console.error("❌ Error connecting to DB:", err);
    process.exit(1);
  }
};

export { db, connectDB };
