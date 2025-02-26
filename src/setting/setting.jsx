import React from "react";
import dp from "../images/dp.jpg"
import axios from "axios";
export default function Settings(){

    return <main className="bg-purple-700 h-[100vh] flex flex-col py-10 items-center">
            <h1 className="ml-24 text-6xl">User Details</h1>
            <section className="flex justify-end w-[90%] mb-20">
                <img src={dp} alt="" className="rounded=[100px] h-[10em] w-[10em] rounded-full"/>
            </section>
            <form action="submit" className="flex flex-wrap justify-around gap-5 text-black px-5">
                <div className="flex gap-5">
                <h3 className="w-[5em]">First-Name</h3>
                <input type="text" className="w-[25em] border border-solid border-gray-800"/>
                </div>

                <div className="flex gap-5">
                <h3 className="w-[5em]">Last-Name</h3>
                <input type="text" className="w-[25em] border border-solid border-gray-800"/>
                </div>

                <div className="flex gap-5">
                <h3 className="w-[5em]">Email</h3>
                <input type="text" className="w-[25em] border border-solid border-gray-800"/>
                </div>

                <div className="flex gap-5">
                <h3 className="w-[5em]">Password</h3>
                <input type="text" className="w-[25em] border border-solid border-gray-800"/>
                </div>
            </form>

            <button className="mt-5">Edit Details</button>
    </main>
}