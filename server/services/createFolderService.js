import { db } from '../config/db.js';
import env from "dotenv";
import redis from '../config/redis.js';

env.config();



export const createFolder=async (folderName,folderDescription,userId)=>{
    try {
        await db.query("INSERT INTO FOLDERS(Folder_name,Folder_description,user_id) VALUES($1,$2,$3)",[folderName,folderDescription,userId])
        const folderBuffer="Folder created successfully"
        await redis.del(`filteredFiles:user:${userId}`)
        return folderBuffer
    } catch (error) {
        throw error
    }
}

export const allFolder=async(filteringLogic,orderlogic,id)=>{
    try {
        let data;
            const allowedColumns = ['created_at', 'folder_name', 'id'];
            const allowedOrders = ['ASC', 'DESC'];

            const cacheKey=`filteredFolders:user:${id}`
            const cachedData = await redis.get(cacheKey);
            if (cachedData) {
                return { rows: JSON.parse(cachedData) };
            }

        if(filteringLogic && orderlogic && allowedColumns.includes(filteringLogic) && allowedOrders.includes(orderlogic)){
          data=await db.query(`SELECT * FROM FOLDERS WHERE user_id=$1 ORDER BY ${filteringLogic} ${orderlogic}`,[id])

        }
        else{
         data=await db.query(`SELECT * FROM FOLDERS WHERE user_id=$1`,[id])
        }
        await redis.set(cacheKey, JSON.stringify(data.rows), 'EX', 300);
        return data;
    } catch (error) {
        return{status:(500),message:("Failed to get data from DB")}
    }
}

export const deleteFolder=async(id,user_id)=>{
    console.log(id)
    try {
        const query=await db.query("DELETE FROM folders WHERE id=$1",[id])
        await redis.del(`filteredFiles:user:${user_id}`)
        return { status: 201, message: "Document delete successful" };
    } catch (error) {
    return{status:(500),message:("Failed to delete data from DB"),error};
    }
}