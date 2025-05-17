import { profilePic,updatedDetails,userDetails } from "../services/userService.js";

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
    console.log(profilePic)
    try {
        const updateResult = await updatedDetails(email, first_name, profile_pic, last_name);
        res.status(updateResult.status).json({ message: updateResult.message });
    } catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).json({ message: 'Details update failed' });
    }
};

export const userdetails=async (req,res)=>{
    const user_email = req.session?.email;
    if (!user_email) {
      return res.status(401).json({ message: "Not authenticated." });
    }
  
    const result = await userDetails(user_email);
  
    if (result.status === 200) {
      return res.status(200).json(result.data);
    } else {
      return res.status(result.status).json({ message: result.message });
    }
    
}
