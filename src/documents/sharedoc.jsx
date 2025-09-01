import { useState,useContext } from "react"
import axios from "axios";
import { userContext } from "../context/userProvider";
import Swal from "sweetalert2";

export default function SharePdf({filePath,onclose}){
    const [email,setemail]=useState("");
    const {user}=useContext(userContext);
    const [sending, setSending] = useState(false);
    function shareFile(){
        if (!email || !email.includes('@')) {
          Swal.fire({
            icon: "error",
            title: "invalid email entered",
            text: "Enter valid email",
          })
            return;
        }

        console.log(filePath)
        setSending(true);
        axios.post("https://unidocs-ukv1.onrender.com/document/share/file",{receivers_email:email,name:user.first_name,users_email:user.email,path:filePath})
        .then((res)=>{
            onclose()
            Swal.fire({
            position: "center",
            icon: "success",
            title: "file shared succesfully",
            showConfirmButton: false,
            timer: 1500,
            })
            setemail("");
        })
        .catch((err)=>{
          Swal.fire({
            icon: "error",
            title: "File sharing failed",
            text: "Try again",
          })
        })
        .finally(() => {
            setSending(false);
        });
        
    }
    return <main className="text-black flex flex-col bg-white shadow-2xl rounded-xl w-[80%] md:w-[40%] py-20 px-3 md:px-20 gap-5 items-center"> 
        <section className="flex items-center w-full justify-around">
            <h2 className="font-bold">Share Document</h2>
        </section>

        <section className="flex flex-col items-start justify-center gap-3 w-full">
            <p className="text-xl mb-0 pb-0 font-semibold">Email address</p>
            <input type="email" placeholder="Email address" id="" onChange={(e)=>setemail(e.target.value)} className="bg-black-300/30 mt-0 pt-0 w-[100%] rounded-md h-10 pl-0 md:pl-5 border-[0.1em] border-solid text-base md:text-xl"/>
        </section>

        <section className="flex w-full items-center justify-end gap-5 cursor-pointer">
            <button className="w-[100%] border-2 border-solid border-red-500 rounded-lg text-red-500 bg-white" onClick={onclose}>Cancel</button>
            <button className="w-[100%] bg-blue-600" onClick={shareFile} disabled={sending}>{sending ? "Sharing..." : "Share"}</button>
        </section>
    </main>
}