import express from 'express';
import upload from '../middlewares/multer.js'; 
import { profilepic,updatedetails,userdetails } from '../controllers/userController.js';

const router = express.Router();

router.post("/updated/details",upload.single('profile_pic'),updatedetails)
router.post("/upload/profile-pic", upload.single("profile_pic"),profilepic);
router.get("/database/details", userdetails);


export default router
