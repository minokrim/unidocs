import { createFolder,allFolder } from "../services/createFolderService.js";

export const createfolder=async(req,res)=>{
    const { folderName, folderDescription } = req.body;
    if (!folderName || !folderDescription) {
        return res.status(400).send("Folder name and description are required");
    }
    try{
        const folderBuffer=await createFolder(folderName,folderDescription);
        res.send(folderBuffer)
    }
    catch(error){
        res.status(500).send("Failed to Create Folder");
    }
}

export const allfolder=async(req,res)=>{
    const logic=req.body.logic
    const orderlogic=req.body.order
    const id=req.body.id;
console.log("User ID:", req.body.id); // logs: undefined
    console.log("Request Body:", req.body); // Debug entire body
    console.log("Request Body Keys:", Object.keys(req.body));
console.log("req.body.id exists?", 'id' in req.body);

    try {
        const result=await allFolder(logic,orderlogic,id);
        return res.status(200).json({ rows: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to retrieve folders');
    }
}