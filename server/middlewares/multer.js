import multer from 'multer';
import path from 'path';
import { db } from '../config/db';
import { v4 as uuidv4 } from "uuid";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  
    }
});

export const uploadProfilePicture = async (file) => {
  try {
    const ext = path.extname(file.originalname); 
    const filename = `${uuidv4()}${ext}`;

    const { data, error } = await supabase.storage
      .from("profile-pics") 
      .upload(filename, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from("profile-pics")
      .getPublicUrl(filename);

    return { status: 200, url: publicUrlData.publicUrl };
  } catch (err) {
    return { status: 500, message: err.message };
  }
};
const upload = multer({ storage: storage },)
export default upload;