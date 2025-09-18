import { uploadFiles,filteredFiles,downloadFile,deleteFile,filetoFolder,fileinFolder,shareFile} from "../services/fileService.js";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { application } from "express";
import { supabase } from "../config/db.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..'); 



export const uploadfile=async(req,res)=>{
    const metadata=req.body.metadata;
    const filePath=req.file.path;
    const filename=req.file.originalname;
    const fileBuffer=req.file.buffer;
    const filesize=(req.file.size/(1024*1024))
    const roundedFilesize=filesize.toFixed(4)
    const userid=req.body.userId
    console.log(metadata,filename,userid,fileBuffer)

    if (!req.file) {
    console.error("❌ No file found in request");
    return res.status(400).send("No file uploaded");
  }

   const { error } = await supabase.storage
      .from("document")
      .upload(filename, fileBuffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      throw error;
    }

    const { data: publicUrlData} = supabase.storage
      .from("document")
      .getPublicUrl(filename);

    const publicUrl = publicUrlData.publicUrl;

    // if (!filePath || !filename) {
    //     return res.status(400).send("No file uploaded");
    // }
    //     console.log("File path:", filePath,filename);

    try {
        const result=await uploadFiles(filename,filePath,metadata,roundedFilesize,userid,publicUrl)
        res.status(result.status).send(result.message);

    } catch (error) {
            console.error("Upload error:", err);
        res.status(500).send("Failed to upload file");

    }
}


export const filteredfiles = async (req, res) => {
    const logic=req.body.logic
    const orderlogic=req.body.order
    const id=req.body.id
    try {
        const result = await filteredFiles(logic,orderlogic,id);
        return res.status(200).json({ rows: result.rows });

    } catch (error) {
        res.status(500).send('Failed to retrieve files');
    }
};

export const downloadfile=async(req,res)=>{
    const fileid=req.query.fileid;

    const id = parseInt(fileid, 10);
    try {
        const result=await downloadFile(id)
        if (result.status && result.status !== 200) {
            return res.status(result.status).json({ message: result.message });
        }
        const filePath = path.join(projectRoot, result.filepath.replace(/\\/g, '/'));     
        res.download(filePath, result.filename);
    } catch (error) {
        return res.status(500).json({ 
            message: "Internal server error",
            error: error.message 
        });
    }    

}

export const openFile=async(req,res)=>{
    const fileid=req.query.fileid;
    const id = parseInt(fileid, 10);

    try {
         const result=await downloadFile(id)
        if (result.status && result.status !== 200) {
            return res.status(result.status).json({ message: result.message });
        }
        const filePath = path.join(projectRoot, result.filepath.replace(/\\/g, '/') );
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "File not found" });
        }
        const stat = fs.statSync(filePath);

        res.setHeader('Content-Type', "application/pdf");
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Disposition', `inline; filename="${path.basename(filePath)}"`);

        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    } catch (error) {
        return res.status(500).json({ 
            message: "Internal server error",
            error: error.message 
        });
    
    }

}


export const deletefile=async(req,res)=>{
    const fileid=req.body.fileId
    const userid=req.body.userId

    try {
        const result=await deleteFile(fileid,userid)
        res.status(result.status).send(result.message);
    } catch (error) {
        res.status(500).send("Failed to delete file");
    }
}

export const filetofolder=async(req,res)=>{
    const file_id=req.body.file_id;
    const folder_id=req.body.folder_id
    const user_id=req.body.userId
    try {
        const result=await filetoFolder(file_id,folder_id,user_id)
        res.status(result.status).send(result.message);
    } catch (error) {
        res.status(500).send("Failed to store file to folder");
    }
}

export const fileinfolder=async(req,res)=>{
    const userId=req.body.userId;
    const folder_id=req.body.folderId;

    try {
        const result=await fileinFolder(userId,folder_id)
        res.status(200).json(result);  
    } catch (error) {
        res.status(500).send("Failed to get file in folder");    
    }
}

export const sharefile=async(req,res)=>{
    const user_name=req.body.name;
    const receiver=req.body.receivers_email;
    const path=req.body.path;

    try {
        const result=await shareFile(receiver,user_name,path);
        if (result.accepted && result.accepted.length > 0) {
            return res.status(200).json({ success: true, message: "File shared successfully" });
        } else {
            return res.status(500).json({ success: false, message: "Failed to share file" });
        }
    } catch (error) {
    }
}