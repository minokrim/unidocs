import express from 'express';
import { createfolder,allfolder,deletefolder } from '../controllers/createFolderController.js';

const router = express.Router();

router.post('/folder/create', createfolder);
router.post('/folder/data', allfolder);
router.post("/document/delete/folder",deletefolder)


export default router;