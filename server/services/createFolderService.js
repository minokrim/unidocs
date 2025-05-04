import express from 'express';
import pg from "pg"
import env from "dotenv";

const app =express();
env.config();

const db = new pg.Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST||'db',
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT||5432,
  });

  db.connect();

export const createFolder=async (folderName,folderDescription)=>{
    try {
        await db.query("INSERT INTO FOLDERS(Folder_name,Folder_description) VALUES($1,$2)",[folderName,folderDescription])
        const folderBuffer="Folder created successfully"
        return folderBuffer
    } catch (error) {
        console.error(error)
    }
}