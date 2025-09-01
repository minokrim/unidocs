import React, { useContext,useEffect,useState } from "react";
import dp from "../images/defaultdp.png"
import { userContext } from "../context/userProvider";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

export default function Settings(){

const{user,setUser,loading,refreshUser}=useContext(userContext)
const[firstName,setFirstName]=useState(user.first_name||"")
const[lastName,setLastName]=useState(user.last_name||"")
const[email,setEmail]=useState(user.email)
const[password,setPassword]=useState(user.password||"")
const[profilePic,setProfilePic]=useState(user.profile_pic_url)
const [editdetails,setEditDetails]=useState(false)
const [previewPic, setPreviewPic] = useState(user.profile_pic_url);

useEffect(()=>{
        setFirstName(user.first_name||"")
        setLastName(user.last_name||"")
        setEmail(user.email)
        setPassword(user.password||"")
        setProfilePic(dp)
        setPreviewPic(user.profile_pic_url);
    
},[user])

async function toggleEditDetails() {
    if (editdetails) {
        if (profilePic) {
            await uploadprofilePic();
        } else {
            await updatedetails(user.profile_pic_url); 
            await refreshUser();
        }
    }
    setEditDetails(!editdetails);
}


async function updatedetails(uploadedPath) {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    if (profilePic) {
        formData.append("profile_pic", profilePic);
      }
    try {
        const response = await axios.post("https://unidocs-ukv1.onrender.com/user/api/updated/details", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        });
        setUser((prevUser) => ({
            ...prevUser,
            first_name: firstName,
            last_name: lastName,
            password: password,
            profile_pic_url: uploadedPath
        }));
    } catch (err) {
        console.log(err);
    }
}


async function uploadprofilePic() {
    if(!profilePic) return;

        const formData=new FormData()
        formData.append("profile_pic",profilePic)
    
    try {
        const response = await axios.post("https://unidocs-ukv1.onrender.com/user/api/upload/profile-pic", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        });
        const uploadedPath = response.data.data.path;
        const fullPicUrl = `https://unidocs-ukv1.onrender.com/${uploadedPath}?t=${Date.now()}`;
        setPreviewPic(fullPicUrl); 
        await updatedetails(fullPicUrl); 
        await refreshUser(); 
    } catch (err) {
        console.error("Error uploading image", err);
    }
}

const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setProfilePic(file); 
        setPreviewPic(URL.createObjectURL(file));
    }
};

    return <main className="bg-white h-full md:h-[100vh] flex flex-col justify-start md:justify-between pt-5 items-center w-full">
            <h1 className="ml-10 md:ml-24 self-center justify-center w-[100%] text-purple-600">PROFILE SETTINGS</h1>

            <div className="flex w-full justify-around content-center items-center flex-col md:flex-row">

            <section className="flex flex-col w-max justify-center border border-solid border-1 border-purple-400 items-center p-5 rounded-lg gap-5">
                <img src={previewPic||dp} alt="profile" className="h-[5em] w-[5em] md:h-[10em] md:w-[10em] rounded-full border border-solid border-red-500"/>
                {editdetails && <label htmlFor="imageInput" className="bg-white text-purple-600 border-purple-600 rounded-lg w-max p-2 border-2 border-solid ">Upload Photo</label>}
                <input type="file" name="file" id="imageInput" className="hidden" onChange={handlePicChange}/>
            </section>

            <form className="w-max flex flex-col justify-center content-center md:justify-around gap-3 text-black">
                
                <div className="flex flex-col gap-1 w-max">
                <h3 className="w-full md:w-[5em] font-normal text-xl">First-Name</h3>
                {editdetails && <FaEdit color="purple" className="text-3xl self-start" />}
                <input type="text" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} disabled={!editdetails} className="w-full md:w-[25em] border border-solid border-gray-800 rounded-lg text-black font-bold pl-5 py-2"/>
                </div>

                <div className="flex flex-col gap-1 w-max">
                <h3 className="w-full md:w-[5em] font-normal text-xl">Last-Name</h3>
                {editdetails && <FaEdit color="purple" className="text-3xl self-start" />}
                <input type="text" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} disabled={!editdetails} className="w-full md:w-[25em] border border-solid border-gray-800 rounded-lg text-black font-bold pl-5 py-2"/>
                </div>

                <div className="flex flex-col gap-1 w-max">
                <h3 className="w-full md:w-[5em] font-normal text-xl">Email</h3>
                <input type="text" value={email} disabled className="w-full md:w-[25em] border border-solid border-gray-800 rounded-lg text-black font-bold pl-5 py-2"/>
                </div>

                {/* <div className="flex flex-col gap-1 w-max">
                <h3 className="w-full md:w-[5em] font-normal text-xl">Password</h3>
                {editdetails && <FaEdit color="purple" className="text-3xl self-start" />}
                <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} disabled={!editdetails} className="w-full md:w-[25em] border border-solid border-gray-800 rounded-lg text-black font-bold pl-5 py-2"/>
                </div> */}
            </form>

            </div>

            <section className="w-full md:w-[70%] flex flex-col md:flex-row justify-end items-center gap-3 mt-5 BORDER">
                <button className="w-[50%] md:w-[20%] bg-purple-700 text-white rounded-lg" onClick={toggleEditDetails}>
            {editdetails ? "Save Details" : "Edit Details"}
            </button>

            <button className="bg-white w-[50%] md:w-[20%] border-red-600 rounded-lg text-red-600 font-semibold text-lg">Delete Account</button>
            </section>
    </main>
}