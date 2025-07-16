import express from 'express';
import upload from '../middlewares/multer.js'; 
import { uploadfile,downloadfile,filteredfiles,deletefile,filetofolder,fileinfolder,openFile} from '../controllers/fileController.js';

const router = express.Router();

router.post('/upload/file/metadata', upload.single('file'), uploadfile);
router.post('/document/data', filteredfiles);  
router.get("/document/filedata",downloadfile)
router.get("/document/filedata/open",openFile)
router.post("/document/delete/file",deletefile)
router.post("/document/addtofolder",filetofolder)
router.post("/document/fileinfolder",fileinfolder)

export default router;

