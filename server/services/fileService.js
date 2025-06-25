import { db } from '../config/db.js';

export const uploadFiles=async(filename,filePath,metadata,filesize)=>{
    try{
        await db.query("INSERT INTO DOCUMENTS(FILENAME,FILEPATH,METADATA,file_size) VALUES($1,$2,$3,$4)",[filename,filePath,JSON.stringify(metadata),filesize])
        return { status: 201, message: "Document upload successful" };
    }
    catch(err){
        console.error("Upload failed:", err);
        throw new Error("Failed to upload document");    }
}


export const filteredFiles=async(filteringLogic,orderlogic)=>{
    try {
        let data;
            const allowedColumns = ['created_at', 'filename', 'id',"file_size"]; // adjust to match your DB columns
            const allowedOrders = ['ASC', 'DESC'];
        if(filteringLogic && orderlogic && allowedColumns.includes(filteringLogic) && allowedOrders.includes(orderlogic)){
          data=await db.query(`SELECT * FROM DOCUMENTS ORDER BY ${filteringLogic} ${orderlogic}`)
        }
        else{
         data=await db.query(`SELECT * FROM DOCUMENTS`)
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