import pg from "pg";
import env from 'dotenv';
import waitPort from "wait-port"
const { Client } = pg;

env.config();

const portNum = parseInt(process.env.POSTGRES_PORT, 10) || 5432;
console.log('DB port used:', portNum);
let isConnected = false;

 const db = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST||'db',
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  });

  // const connectDB = async () => {
  //   if (isConnected) return; 
  //   try {
  //     await db.connect();
  //     isConnected = true;
  //     console.log('PostgreSQL connected ✅');
  //   } catch (error) {
  //     console.error('Failed to connect to PostgreSQL ❌', error);
  //     process.exit(1);
  //   }
  // };

const connectDB = async () => {
  console.log('POSTGRES_PORT raw:', process.env.POSTGRES_PORT);
console.log('POSTGRES_PORT parsed:', parseInt(process.env.POSTGRES_PORT, 10));
  const open = await waitPort({
    host: process.env.POSTGRES_HOST || 'db',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    timeout: 10000, // 10 seconds
    output: 'silent',
  });

  if (open) {
    console.log('PostgreSQL is ready ✅');
    await connectDB();
  } else {
    console.error('❌ PostgreSQL connection timeout');
    process.exit(1);
  }
};

// waitForDB();


  export { db, connectDB };


  
