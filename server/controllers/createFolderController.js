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
    try {
        const result=await allFolder();
        res.send(result)
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to retrieve folders');
    }
}