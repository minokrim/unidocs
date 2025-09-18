import { db } from '../config/db.js';
import nodemailer from "nodemailer"
import env from "dotenv";
import path from 'path';
import fs from "fs"
import redis from '../config/redis.js';
env.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ayomidekareem563@gmail.com",
    pass: "rsji jynn shwk qagc",
  },
});


export const uploadFiles=async(filename,filePath,metadata,filesize,userid,publicUrl)=>{
    try{
        await db.query("INSERT INTO DOCUMENTS(FILENAME,FILEPATH,METADATA,file_size,user_id) VALUES($1,$2,$3,$4,$5)",[filename,publicUrl,JSON.stringify(metadata),filesize,userid])
        await redis.del(`filteredFiles:user:${userid}`)

        return { status: 201, message: "Document upload successful" };
    }
    catch(err){
        throw new Error("Failed to upload document");    
    }
}


export const filteredFiles=async(filteringLogic,orderlogic,id)=>{
    try {
        let data;
            const allowedColumns = ['created_at', 'filename', 'id',"file_size"]; 
            const allowedOrders = ['ASC', 'DESC'];
            let cacheKey = `filteredFiles:user:${id}`;

            const cachedData = await redis.get(cacheKey);
            if (cachedData) {
                return { rows: JSON.parse(cachedData) };
    }

        if(filteringLogic && orderlogic && allowedColumns.includes(filteringLogic) && allowedOrders.includes(orderlogic)){
          data=await db.query(`SELECT DOCUMENTS.*,Folders.folder_name AS folder_name FROM DOCUMENTS LEFT JOIN FOLDERS ON DOCUMENTS.folder_id=FOLDERS.id WHERE DOCUMENTS.user_id=$1 ORDER BY DOCUMENTS.${filteringLogic} ${orderlogic}`,[id])

        }
        else{
         data=await db.query(`SELECT DOCUMENTS.*,Folders.folder_name AS folder_name FROM DOCUMENTS LEFT JOIN FOLDERS ON DOCUMENTS.folder_id=FOLDERS.id WHERE DOCUMENTS.user_id=$1`,[id])
        }
        await redis.set(cacheKey, JSON.stringify(data.rows), 'EX', 300);
        return data
        
    } catch (error) {
        return{status:(500),message:"Failed to get data from DB"}
    }
}

export const downloadFile=async(id)=>{
        try {
            const data=await db.query("SELECT * FROM DOCUMENTS WHERE id=$1",[id])
    
            if(data.rows.length===0){
                 return{status:(404),message:("Document not found")};
            }
            const fileData=data.rows[0];
            return fileData

        } catch (error) {
            return{status:(500),message:("Failed to get data from DB"),error};
    
        }
}

export const deleteFile=async(id,userId)=>{
    try {
        const query=await db.query("DELETE FROM DOCUMENTS WHERE id=$1 AND user_id=$2",[id,userId])
        await redis.del(`filteredFiles:user:${userId}`)
        return { status: 201, message: "Document delete successful" };
    } catch (error) {
    return{status:(500),message:("Failed to delete data from DB"),error};
    }
}

export const filetoFolder=async(file_id,folder_id,user_id)=>{
    try {
        await Promise.all(
            folder_id.map(async (f_id)=>{
                await db.query("INSERT INTO file_folders(file_id,folder_id,user_id) VALUES($1,$2,$3) ON CONFLICT (file_id, folder_id) DO UPDATE SET user_id = EXCLUDED.user_id",[file_id,f_id,user_id]);
            })
        )
    return { status: 201, message: "file inserted successful" };
    } catch (error) {
        throw new Error("Failed to upload document");    
    }
}

export const fileinFolder=async(userId,FolderId)=>{
    try {
        const query=await db.query("SELECT documents.*, folders.folder_name AS folder_name FROM documents JOIN file_folders ON documents.id = file_folders.file_id JOIN folders ON folders.id = file_folders.folder_id WHERE file_folders.folder_id = $1 AND file_folders.user_id = $2",[FolderId,userId])
        return query.rows;
    } catch (error) {
        throw new Error("Failed to get documents");    
    
    }
}

export const shareFile=async(receiver,user_name,upload_path)=>{
    const absolutePath=path.resolve(upload_path)
    const fileContent=fs.readFileSync(upload_path)
    const fileName = path.basename(absolutePath);
    try {
    const mail = await transporter.sendMail({
    from: `${user_name} <ayomidekareem563@gmail.com>`,
    to: `${receiver}`,
    subject: `${user_name} shared a file with you`,
    text: "Hello world?", // plain‑text body
      html: `
    <p>Hello,</p>
    <p><strong>John Doe</strong> has shared a file with you via <strong>UniDocs</strong>.</p>
    <p>— UniDocs</p>
  `,
    attachments:[
        {
        filename: `${fileName}.pdf`,               
        content: fileContent,              
        contentType: 'application/pdf',
        }
    ]
  });
      return mail;
    } catch (error) {
        return error
    }
}