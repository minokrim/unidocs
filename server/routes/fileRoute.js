import express from 'express';
import upload from '../middlewares/multer.js'; 
import { uploadfile,allfiles} from '../controllers/fileController.js';

const router = express.Router();

router.post('/upload/file/metadata', upload.single('file'), uploadfile);
router.get('/document/data', allfiles);  


export default router;

