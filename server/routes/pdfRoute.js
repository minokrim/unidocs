import express from 'express';
import { convertImageToPDF } from '../controllers/pdfController.js';
import upload from '../middlewares/multer.js'; // assuming you defined it here

const router = express.Router();

router.post('/file/convert', upload.single('file'), convertImageToPDF);

export default router;
