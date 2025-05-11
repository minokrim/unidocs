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
        setProfilePic(null)
        setPreviewPic(user.profile_pic_url || "");
    
},[user])

async function toggleEditDetails(){
    if(editdetails){
        await uploadprofilePic()
    }
    setEditDetails(!editdetails);
}

// async function updatedetails (uploadedPath) {
//     const data = {
//         firstName: firstName,
//         lastName: lastName,
//         email: email,
//         password: password,
//         profilePic: uploadedPath||user.profilePic
//     };

//     const formData=new FormData()
//     formData.append("profile_pic",profilePic)

//     axios.post("http://localhost:5000/updated/details", data,{withCredentials:true},formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true
//     })
//         .then((res) => {
//             console.log(res);

//             setUser((prevUser) => ({
//                 ...prevUser,
//                 first_name: firstName,
//                 last_name: lastName,
//                 password: password,
//                 profilePic: uploadedPath || prevUser.profilePic
//             }));
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }

async function updatedetails(uploadedPath) {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profile_pic",profilePic)

    try {
        const response = await axios.post("http://localhost:5000/updated/details", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        });
        console.log(response);

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
        const response = await axios.post("http://localhost:5000/upload/profile-pic", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        });
        const uploadedPath = response.data.path;
        const fullPicUrl = `http://localhost:5000/${uploadedPath}?t=${Date.now()}`;
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

    return <main className="bg-white h-[100vh] flex flex-col py-10 items-center w-full">
            <h1 className="ml-24 text-6xl">Profile</h1>

            <div className="flex w-full justify-around">

            <section className="flex w-[90%] mb-20">
                <img src={previewPic||user.profile_pic_url||dp} alt="profile" className="h-[10em] w-[10em] rounded-full"/>
                <label htmlFor="imageInput">
                {editdetails && <FaEdit color="purple" className="text-3xl self-center absolute" />}
                <input type="file" name="file" id="imageInput" className="hidden" onChange={handlePicChange}/>
                </label>
            </section>

            <form action="submit" className="flex flex-col justify-around gap-5 text-black px-5">
                <div className="flex gap-3">
                <h3 className="w-[5em]">First-Name</h3>
                {editdetails && <FaEdit color="purple" className="text-3xl self-center" />}
                <input type="text" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} disabled={!editdetails} className="w-[25em] border border-solid border-gray-800 bg-purple-800/60 text-black font-bold pl-5"/>
                </div>

                <div className="flex gap-3">
                <h3 className="w-[5em]">Last-Name</h3>
                {editdetails && <FaEdit color="purple" className="text-3xl self-center" />}
                <input type="text" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} disabled={!editdetails} className="w-[25em] border border-solid border-gray-800  bg-purple-800/60 text-black font-bold pl-5"/>
                </div>

                <div className="flex gap-3">
                <h3 className="w-[5em]">Email</h3>
                <input type="text" value={email} disabled className="w-[25em] border border-solid border-gray-800  bg-purple-800/60 text-black font-bold pl-5"/>
                </div>

                <div className="flex gap-3">
                <h3 className="w-[5em]">Password</h3>
                {editdetails && <FaEdit color="purple" className="text-3xl self-center" />}
                <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} disabled={!editdetails} className="w-[25em] border border-solid border-gray-800  bg-purple-800/60 text-black font-bold pl-5"/>
                </div>
            </form>

            </div>

            <button className="mt-5 bg-purple-700 text-white px-6 py-2 rounded-lg" onClick={toggleEditDetails}>
            {editdetails ? "Save Details" : "Edit Details"}
            </button>
    </main>
}