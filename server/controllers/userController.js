import { profilePic,updatedDetails,userDetails } from "../services/userService.js";
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../config/db.js";
export const profilepic=async(req,res)=>{
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });
        // const result=await profilePic(req.file.filename)
        // res.status(result.status).json(result); 
        const fileBuffer = req.file.buffer;
    const ext = req.file.originalname.split('.').pop();
    const filename = `${uuidv4()}.${ext}`;
    console.log(filename)
    console.log(ext)
    console.log(fileBuffer)

    const { data, error } = await supabase.storage
      .from("profile-pic")
      .upload(filename, fileBuffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from("profile-pic")
      .getPublicUrl(filename);

      const email = req.body.email; 
        const first_name = req.body.firstName;
        const last_name = req.body.lastName;

        const updateResult = await updatedDetails(email, first_name, publicUrlData.publicUrl, last_name);

        return res.status(updateResult.status).json({
            message: updateResult.message,
            profile_pic_url: publicUrlData.publicUrl,
        });

    // res.status(200).json({ path: publicUrlData.publicUrl });
    } catch (error) {
        res.status(500).send('error uploading profile picture');
    }
}

export const updatedetails = async (req, res) => {
    const email=req.body.email;
    const first_name=req.body.firstName;
    const profile_pic = req.body.profile_pic;
    const last_name=req.body.lastName;
    try {
        const updateResult = await updatedDetails(email, first_name, profile_pic, last_name);
        res.status(updateResult.status).json({ message: updateResult.message });
    } catch (error) {
        res.status(500).json({ message: 'Details update failed' });
    }
};

export const userdetails=async (req,res)=>{
    const authHeader=req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No or invalid token" });
  }
      const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_email = decoded.email;
  
    const result = await userDetails(user_email);  
    if (result.status === 200) {
      return res.status(200).json(result.data);
    } else {
      return res.status(result.status).json({ message: result.message });
    }
    
}
