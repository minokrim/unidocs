import express from 'express';
import { db } from '../config/db.js';
import env from "dotenv";

const app =express();
env.config();



export const createFolder=async (folderName,folderDescription)=>{
    try {
        await db.query("INSERT INTO FOLDERS(Folder_name,Folder_description) VALUES($1,$2)",[folderName,folderDescription])
        const folderBuffer="Folder created successfully"
        return folderBuffer
    } catch (error) {
        console.error(error)
    }
}