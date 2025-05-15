import { db } from '../config/db.js';

export const uploadFiles=async(filename,filePath,metadata)=>{
    try{
        await db.query("INSERT INTO DOCUMENTS(FILENAME,FILEPATH,METADATA) VALUES($1,$2,$3)",[filename,filePath,JSON.stringify(metadata)])
        return { status: 201, message: "Document upload successful" };
    }
    catch(err){
        console.error("Upload failed:", err);
        throw new Error("Failed to upload document");    }
}

export const allFiles=async()=>{
    try {
        const data=await db.query("SELECT * FROM DOCUMENTS")
        return data;
        
    } catch (error) {
        return{status:(500),message:"Failed to get data from DB"}
    }
}