import express from 'express';
import upload from '../middlewares/multer.js'; 
import { uploadfile,allfiles,downloadfile} from '../controllers/fileController.js';

const router = express.Router();

router.post('/upload/file/metadata', upload.single('file'), uploadfile);
router.get('/document/data', allfiles);  
router.get("/document/filedata",downloadfile)

export default router;

