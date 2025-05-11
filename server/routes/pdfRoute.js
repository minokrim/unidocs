import express from 'express';
import { convertImageToPDF } from '../controllers/pdfController.js';
import { convertPdftoaudio } from '../controllers/pdfController.js';
import { filemerge } from '../controllers/pdfController.js';
import upload from '../middlewares/multer.js'; 

const router = express.Router();

router.post('/file/convert', upload.single('file'), convertImageToPDF);

router.post('/file/audio', upload.single('file'), convertPdftoaudio);

router.post('/file/merge', upload.array('files',2), filemerge);


export default router;
