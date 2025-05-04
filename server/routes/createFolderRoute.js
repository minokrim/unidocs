import express from 'express';
import { createfolder } from '../controllers/createFolderController.js';

const router = express.Router();

router.post('/folder/create', createfolder);

export default router;