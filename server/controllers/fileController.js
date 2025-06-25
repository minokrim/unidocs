import { uploadFiles,filteredFiles,downloadFile } from "../services/fileService.js";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..'); 



export const uploadfile=async(req,res)=>{
    const metadata=req.body.metadata;
    const filePath=req.file.path;
    const filename=req.file.originalname;
    const filesize=(req.file.size/(1024*1024))
    const roundedFilesize=filesize.toFixed(4)

    if (!filePath || !filename) {
        return res.status(400).send("No file uploaded");
    }

    try {
        const result=await uploadFiles(filename,filePath,metadata,roundedFilesize)
        res.status(result.status).send(result.message);

    } catch (error) {
        res.error(error)
        res.status(500).send("Failed to upload file");

    }
}

// export const allfiles = async (req, res) => {
//     try {
//         const result = await allFiles();
//         res.send(result)

//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Failed to retrieve files');
//     }
// };

export const filteredfiles = async (req, res) => {
    const logic=req.body.logic
    const orderlogic=req.body.order
    try {
        const result = await filteredFiles(logic,orderlogic);
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
        
    }
}