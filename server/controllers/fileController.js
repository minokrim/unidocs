import { uploadFiles,allFiles,downloadFile } from "../services/fileService.js";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..'); 



export const uploadfile=async(req,res)=>{
    const metadata=req.body.metadata;
    const filePath=req.file.path;
    const filename=req.file.originalname;

    if (!filePath || !filename) {
        return res.status(400).send("No file uploaded");
    }

    try {
        const result=await uploadFiles(filename,filePath,metadata)
        res.status(result.status).send(result.message);

    } catch (error) {
        res.error(error)
        res.status(500).send("Failed to upload file");

    }
}

export const allfiles = async (req, res) => {
    try {
        const result = await allFiles();
        res.send(result)

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
        
    }
}