import React, { useContext,useEffect,useState } from "react";
import dp from "../images/defaultdp.png"
import { userContext } from "../context/userProvider";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

export default function Settings(){

const{user,loading}=useContext(userContext)
const[firstName,setFirstName]=useState(user.first_name||"")
const[lastName,setLastName]=useState(user.last_name||"")
const[email,setEmail]=useState(user.email)
const[password,setPassword]=useState(user.password||"")
const[profilePic,setProfilePic]=useState(user.profilePic||dp)
const[editIcon,SetEditIcon]=useState(false)
const [editdetails,setEditDetails]=useState(false)

useEffect(()=>{
        setFirstName(user.first_name||"")
        setLastName(user.last_name||"")
        setEmail(user.email)
        setPassword(user.password||"")
        setProfilePic(dp||"")
    
},[user])

function toggleEditDetails(){
    console.log("toggleEditDetails called");
    setEditDetails(prevState => {
        const newState = !prevState;
        return newState;
    });
    SetEditIcon(!editIcon)
}

useEffect(()=>{
    if (!editdetails) {
        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            profilePic: profilePic
        };

        axios.post("http://localhost:5000/updated/details", data,{withCredentials:true})
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
},[editdetails])

    return <main className="bg-white h-[100vh] flex flex-col py-10 items-center">
            <h1 className="ml-24 text-6xl">Profile</h1>

            <div className="flex w-full justify-around">
            <section className="flex w-[90%] mb-20">
                <img src={dp} alt="" className="rounded=[100px] h-[10em] w-[10em] rounded-full"/>
                <input type="file" name="" id="imageInput" className="hidden" onChange={(e)=>{setProfilePic(e.target.value)}}/>
                <label htmlFor="imageInput">
                {editIcon && <FaEdit color="purple" className="text-3xl self-center absolute" />}
                </label>
            </section>
            <form action="submit" className="flex flex-col justify-around gap-5 text-black px-5">
                <div className="flex gap-3">
                <h3 className="w-[5em]">First-Name</h3>
                {editIcon && <FaEdit color="purple" className="text-3xl self-center" />}
                <input type="text" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} disabled={!editdetails} className="w-[25em] border border-solid border-gray-800 bg-purple-800/60 text-black font-bold pl-5"/>
                </div>

                <div className="flex gap-3">
                <h3 className="w-[5em]">Last-Name</h3>
                {editIcon && <FaEdit color="purple" className="text-3xl self-center" />}
                <input type="text" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} disabled={!editdetails} className="w-[25em] border border-solid border-gray-800  bg-purple-800/60 text-black font-bold pl-5"/>
                </div>

                <div className="flex gap-3">
                <h3 className="w-[5em]">Email</h3>
                <input type="text" value={email} className="w-[25em] border border-solid border-gray-800  bg-purple-800/60 text-black font-bold pl-5"/>
                </div>

                <div className="flex gap-3">
                <h3 className="w-[5em]">Password</h3>
                {editIcon && <FaEdit color="purple" className="text-3xl self-center" />}
                <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} disabled={!editdetails} className="w-[25em] border border-solid border-gray-800  bg-purple-800/60 text-black font-bold pl-5"/>
                </div>
            </form>
            </div>

            <button className="mt-5" onClick={toggleEditDetails}>
            {editdetails ? "Save Details" : "Edit Details"}
            </button>
    </main>
}