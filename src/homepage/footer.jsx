import React from "react";
import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialInstagram } from "react-icons/ti";
import { TiSocialLinkedin } from "react-icons/ti";
import { TiSocialYoutube } from "react-icons/ti";
import "./hom.css"
export default function Footer(){
    return <main className="bg-gradient-to-b from-black to-purple-950 flex flex-col p-5 gap-3 md:justify-around">

        <div className="flex flex-col md:flex-row gap-5 md:gap-0 w-full items-center justify-around font-serif">
                    <section>
            <h2>About</h2>
            <p>About us</p>
            <p>Our Story</p>
            <p>Security</p>
        </section>

        <section >
            <h2>Socials</h2>
            <div className="grid grid-cols-2 items-center gap-2">
            <TiSocialFacebook className="text-4xl"/>
            <TiSocialInstagram className="text-4xl"/>
            <TiSocialLinkedin className="text-4xl"/>
            <TiSocialYoutube className="text-4xl"/>
            </div>
        </section>

        <section className="flex flex-col items-center">
            <h2>Support</h2>
            <p>Contact</p>
            <p>Help Center</p>
            <p>Terms</p>
        </section>
        </div>

        <hr />

        <div className="w-full flex flex-col justify-center items-center gap-3">
            <section className="flex w-full items-center justify-center">
                <input type="email" placeholder="Email Address" className="bg-gray-700/60 w-[70%] md:w-[30%] h-[3em] rounded-l-2xl p-3"/>
                <button className="rounded-r-2xl w-[50%] md:w-[20%] bg-gradient-to-b from-white to-purple-950 text-black text-md md:text-2xl font-medium">SUBSCRIBE</button>
            </section>
            <p className="w-full text-xs font-serif text-center"> &copy; 2025 Project. ALL rights reseved</p>
        </div>
    </main>
}