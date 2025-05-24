import React from "react";
import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialInstagram } from "react-icons/ti";
import { TiSocialLinkedin } from "react-icons/ti";
import { TiSocialYoutube } from "react-icons/ti";
import "./hom.css"
export default function Footer(){
    return <main className="bg-gradient-to-b from-white to-purple-950 flex p-5 gap-3 md:justify-around">

        <section>
            <h2>About</h2>
            <p>Home</p>
            <p>Privacy</p>
            <p>Security</p>
        </section>

        <section >
            <h2>Socials</h2>
            <div className="flex flex-col  items-center gap-2">
            <TiSocialFacebook className="text-4xl"/>
            <TiSocialInstagram className="text-4xl"/>
            <TiSocialLinkedin className="text-4xl"/>
            <TiSocialYoutube className="text-4xl"/>
            </div>
        </section>

        <section>
            <h2>Support</h2>
        </section>
    </main>
}