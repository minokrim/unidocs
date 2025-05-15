import { uploadFiles,allFiles } from "../services/fileService.js";

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