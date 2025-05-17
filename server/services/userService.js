import { db } from "../config/db.js";

export const profilePic=async(filename)=>{
    try { 
        const imagePath = `uploads/${filename}`; 
        return{status:(200),data:{ path: imagePath }};
    } catch (err) {
        console.error("Upload error:", err);
        return{status:(500),message: "Image upload failed"};
    }
}

export const updatedDetails=async(email,first_name,profile_pic,last_name)=>{

    try {   
        let user=await db.query("SELECT * FROM USERS WHERE EMAIL=$1",[email])
        if (user.rows.length === 0) {
            return { status: 400, message: "User does not exist" }; 
        }
            try {
                await db.query("UPDATE USERS SET email=$1,first_name=$2,profile_pic=$3,last_name=$4 where email=$5",[email,first_name,profile_pic,last_name,email])
                
                return{status:200,message:"db updates successfully"}
            } catch (error) {
                return{status:500,message:"server error"}
            }
    

    } catch (error) {
        return{status:400,message:"server error during lookup"}
    }
}

export const userDetails=async (user_email)=>{
    try {
        const result = await db.query("SELECT * FROM USERS WHERE EMAIL=$1", [user_email]);
        if (result.rows.length > 0) {
          const user = result.rows[0];
          console.log(user)
    
          user.profile_pic_url = `http://localhost:5000/uploads/${user.profile_pic}`;
  
    
          return{status:(200),data:(user)}
        } else {
            return{status:(400),message:("Invalid email. Please sign up or use the correct email.")}
        }
      } catch (error) {
        console.error("Error retrieving user:", error);
        return{status:(500),message:("Internal server error.")}
      }
}
