import { createFolder,allFolder,deleteFolder } from "../services/createFolderService.js";

export const createfolder=async(req,res)=>{
    const { folderName, folderDescription,userId } = req.body;
    if (!folderName || !folderDescription) {
        return res.status(400).send("Folder name and description are required");
    }
    try{
        const folderBuffer=await createFolder(folderName,folderDescription,userId);
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

    try {
        const result=await allFolder(logic,orderlogic,id);
        return res.status(200).json(result);
    } catch (error) {
        res.status(500).send('Failed to retrieve folders');
    }
}

export const deletefolder=async(req,res)=>{
    const folderId=req.body.fileId
    const userId=req.body.userId
    console.log(folderId)
    try {
        const result=await deleteFolder(folderId,userId)
        res.status(result.status).send(result.message);
    } catch (error) {
        res.status(500).send("Failed to delete file");
    }
}