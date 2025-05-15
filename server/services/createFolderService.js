import { db } from '../config/db.js';
import env from "dotenv";

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

export const allFolder=async()=>{
    try {
        const data=await db.query("SELECT * FROM FOLDERS")
        return(data)
    } catch (error) {
        return{status:(500),message:("Failed to get data from DB")}
    }
}