import Redis from 'ioredis';
import dotenv from "dotenv"
dotenv.config();
console.log("Redis URL:", process.env.REDIS_URL);
const redis = new Redis(process.env.REDIS_URL);
export default redis;
