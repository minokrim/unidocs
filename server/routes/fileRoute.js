import express from 'express';
import upload from '../middlewares/multer.js'; 
import { uploadfile,downloadfile,filteredfiles} from '../controllers/fileController.js';

const router = express.Router();

router.post('/upload/file/metadata', upload.single('file'), uploadfile);
router.post('/document/data', filteredfiles);  
router.get("/document/filedata",downloadfile)

export default router;

