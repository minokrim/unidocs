import express from 'express';
import { createfolder,allfolder } from '../controllers/createFolderController.js';

const router = express.Router();

router.post('/folder/create', createfolder);
router.get('/folder/data', allfolder);


export default router;