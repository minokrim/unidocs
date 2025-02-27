import React, { useContext,useEffect,useState } from "react";
import dp from "../images/dp.jpg"
import { userContext } from "../context/userProvider";
export default function Settings(){

const{user,loading}=useContext(userContext)
const[firstName,setFirstName]=useState(user.first_name||"")
const[lastName,setLastName]=useState(user.last_name||"")
const[email,setEmail]=useState(user.email||"")
const[password,setPassword]=useState(user.password||"")

const [editdetails,setEditDetails]=useState(false)

useEffect(()=>{
        setFirstName(user.first_name||"")
        setLastName(user.last_name||"")
        setEmail(user.email||"")
        setPassword(user.password||"")
    
},[user])

function toggleEditDetails(){
    setEditDetails(!editdetails)
}



    return <main className="bg-purple-700 h-[100vh] flex flex-col py-10 items-center">
            <h1 className="ml-24 text-6xl">User Details</h1>
            <section className="flex justify-end w-[90%] mb-20">
                <img src={dp} alt="" className="rounded=[100px] h-[10em] w-[10em] rounded-full"/>
            </section>
            <form action="submit" className="flex flex-wrap justify-around gap-5 text-black px-5">
                <div className="flex gap-5">
                <h3 className="w-[5em]">First-Name</h3>
                <input type="text" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} disabled={!editdetails} className="w-[25em] border border-solid border-gray-800"/>
                </div>

                <div className="flex gap-5">
                <h3 className="w-[5em]">Last-Name</h3>
                <input type="text" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} disabled={!editdetails} className="w-[25em] border border-solid border-gray-800"/>
                </div>

                <div className="flex gap-5">
                <h3 className="w-[5em]">Email</h3>
                <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} disabled={!editdetails} className="w-[25em] border border-solid border-gray-800"/>
                </div>

                <div className="flex gap-5">
                <h3 className="w-[5em]">Password</h3>
                <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} disabled={!editdetails} className="w-[25em] border border-solid border-gray-800"/>
                </div>
            </form>

            <button className="mt-5" onClick={toggleEditDetails}>
            {editdetails ? "Save Details" : "Edit Details"}
            </button>
    </main>
}