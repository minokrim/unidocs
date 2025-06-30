import express from 'express';
import upload from '../middlewares/multer.js'; 
import { uploadfile,downloadfile,filteredfiles,deletefile,filetofolder} from '../controllers/fileController.js';

const router = express.Router();

router.post('/upload/file/metadata', upload.single('file'), uploadfile);
router.post('/document/data', filteredfiles);  
router.get("/document/filedata",downloadfile)
router.post("/document/delete/file",deletefile)
router.post("/document/addtofolder",filetofolder)

export default router;

