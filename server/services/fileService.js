import { db } from '../config/db.js';

export const uploadFiles=async(filename,filePath,metadata,filesize)=>{
    try{
        await db.query("INSERT INTO DOCUMENTS(FILENAME,FILEPATH,METADATA,file_size) VALUES($1,$2,$3,$4)",[filename,filePath,JSON.stringify(metadata),filesize])
        return { status: 201, message: "Document upload successful" };
    }
    catch(err){
        console.error("Upload failed:", err);
        throw new Error("Failed to upload document");    
    }
}


export const filteredFiles=async(filteringLogic,orderlogic,id)=>{
    try {
        let data;
            const allowedColumns = ['created_at', 'filename', 'id',"file_size"]; 
            const allowedOrders = ['ASC', 'DESC'];
        if(filteringLogic && orderlogic && allowedColumns.includes(filteringLogic) && allowedOrders.includes(orderlogic)){
          data=await db.query(`SELECT * FROM DOCUMENTS WHERE user_id=$1 ORDER BY ${filteringLogic} ${orderlogic}`,[id])
        }
        else{
         data=await db.query(`SELECT * FROM DOCUMENTS WHERE user_id=$1`,[2])
        }
        return data;
        
    } catch (error) {
        return{status:(500),message:"Failed to get data from DB"}
    }
}

export const downloadFile=async(id)=>{
        try {
            const data=await db.query("SELECT * FROM DOCUMENTS WHERE id=$1",[id])
            console.log("File fetched from DB:", data.rows);  
    
            if(data.rows.length===0){
                 return{status:(404),message:("Document not found")};
            }
            const fileData=data.rows[0];
            return fileData

        } catch (error) {
            return{status:(500),message:("Failed to get data from DB"),error};
    
        }
}

export const deleteFile=async(id)=>{
    try {
        const query=await db.query("DELETE FROM DOCUMENTS WHERE id=$1",[id])
        console.log(query)
        return { status: 201, message: "Document delete successful" };
    } catch (error) {
    return{status:(500),message:("Failed to delete data from DB"),error};
    }
}

export const filetoFolder=async(file_id,folder_id)=>{

    try {
        await Promise.all(
            folder_id.map(async (f_id)=>{
                await db.query("INSERT INTO file_folders(file_id,folder_id) VALUES($1,$2) ON CONFLICT (file_id, folder_id) DO NOTHING",[file_id,f_id]);
            })
        )
    return { status: 201, message: "file inserted successful" };
    } catch (error) {
        console.error("Upload failed:", error);
        throw new Error("Failed to upload document");    
    }
}