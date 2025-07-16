import { uploadFiles,filteredFiles,downloadFile,deleteFile,filetoFolder,fileinFolder} from "../services/fileService.js";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { application } from "express";


const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..'); 



export const uploadfile=async(req,res)=>{
    const metadata=req.body.metadata;
    const filePath=req.file.path;
    const filename=req.file.originalname;
    const filesize=(req.file.size/(1024*1024))
    const roundedFilesize=filesize.toFixed(4)
    const userid=req.body.userId

    if (!filePath || !filename) {
        return res.status(400).send("No file uploaded");
    }

    try {
        const result=await uploadFiles(filename,filePath,metadata,roundedFilesize,userid)
        res.status(result.status).send(result.message);

    } catch (error) {
        res.error(error)
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
        console.error(error);
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
        const filePath = path.join(projectRoot, result.filepath);     
        res.download(filePath, result.filename);
    } catch (error) {
        console.error('Error downloading file:', error);
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
        const filePath = path.join(projectRoot, result.filepath);
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
        console.error('Error opening file:', error);
        return res.status(500).json({ 
            message: "Internal server error",
            error: error.message 
        });
    
    }

}


export const deletefile=async(req,res)=>{
    const fileid=req.body.fileId

    try {
        const result=await deleteFile(fileid.id)
        console.log(result)
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
        console.log(result)
        res.status(result.status).send(result.message);
    } catch (error) {
        res.status(500).send("Failed to store file to folder");
    }
}

export const fileinfolder=async(req,res)=>{
    const userId=req.body.userId;
    const folder_id=req.body.folderId;
    

    try {
        console.log(userId,folder_id);
        const result=await fileinFolder(userId,folder_id)
        console.log(result)
        res.status(200).json(result);   // Send JSON array with status 200
    } catch (error) {
        res.status(500).send("Failed to get file in folder");    
    }
}