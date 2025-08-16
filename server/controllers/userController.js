import { profilePic,updatedDetails,userDetails } from "../services/userService.js";
import jwt from 'jsonwebtoken';

export const profilepic=async(req,res)=>{
    try {
        const result=await profilePic(req.file.filename)
        res.status(result.status).json(result); 
        console.log(result)
    } catch (error) {
        res.status(500).send('error uploading profile picture');
    }
}

export const updatedetails = async (req, res) => {
  console.log("route hit")
  console.log("req.file:", req.file);
    const email=req.body.email;
    const first_name=req.body.firstName;
    const profile_pic = req.file?.filename;
    const last_name=req.body.lastName;
    console.log(profilePic,first_name,last_name)
    try {
        const updateResult = await updatedDetails(email, first_name, profile_pic, last_name);
        res.status(updateResult.status).json({ message: updateResult.message });
    } catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).json({ message: 'Details update failed' });
    }
};

export const userdetails=async (req,res)=>{
    // const user_email = req.session?.email;
    const authHeader=req.headers.authorization;
    console.log(authHeader)
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No or invalid token" });
  }
      const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_email = decoded.email;
    console.log(token)
    console.log(user_email)
    // console.log(user_email);
    // if (!user_email) {
    //   return res.status(401).json({ message: "Not authenticated." });
    // }
  
    const result = await userDetails(user_email);  
    if (result.status === 200) {
      console.log(result.data)
      return res.status(200).json(result.data);
    } else {
      return res.status(result.status).json({ message: result.message });
    }
    
}
