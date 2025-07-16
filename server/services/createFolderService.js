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

export const allFolder=async(filteringLogic,orderlogic,id)=>{
    try {
        let data;
            const allowedColumns = ['created_at', 'folder_name', 'id'];
            const allowedOrders = ['ASC', 'DESC'];
        if(filteringLogic && orderlogic && allowedColumns.includes(filteringLogic) && allowedOrders.includes(orderlogic)){
          data=await db.query(`SELECT * FROM FOLDERS WHERE user_id=$1 ORDER BY ${filteringLogic} ${orderlogic}`,[id])

        }
        else{
         data=await db.query(`SELECT * FROM FOLDERS WHERE user_id=$1`,[id])
        }
        return data;
    } catch (error) {
        return{status:(500),message:("Failed to get data from DB")}
    }
}

export const deleteFolder=async(id)=>{
    console.log(id)
    try {
        const query=await db.query("DELETE FROM folders WHERE id=$1",[id])
        console.log(query)
        return { status: 201, message: "Document delete successful" };
    } catch (error) {
    return{status:(500),message:("Failed to delete data from DB"),error};
    }
}