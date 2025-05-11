import pg from "pg";
import env from 'dotenv';
const { Client } = pg;

env.config();

 const db = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST||'db',
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT||5432,
  });

  const connectDB = async () => {
    try {
      await db.connect();
      console.log('PostgreSQL connected ✅');
    } catch (error) {
      console.error('Failed to connect to PostgreSQL ❌', error);
      process.exit(1);
    }
  };

  export { db, connectDB };


  
