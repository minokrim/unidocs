// config/db.js
import pg from "pg";
import dotenv from 'dotenv';
import waitPort from "wait-port";

dotenv.config();

const { Client } = pg;

const portNum = parseInt(process.env.POSTGRES_PORT || "5432", 10);
const db = new Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST || 'db',
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: portNum,
});

let connected = false;

const connectDB = async () => {
  if (connected) return;

  const open = await waitPort({
    host: process.env.POSTGRES_HOST || 'db',
    port: portNum,
    timeout: 10000,
    output: 'silent',
  });

  if (!open) {
    console.error("❌ DB port not open after timeout");
    process.exit(1);
  }

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
