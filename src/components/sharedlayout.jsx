import { Outlet } from "react-router-dom";
import TopNav from "../nav/topnav";
import Sidenav from "../nav/sidenav";
import { useState } from "react";
import AllDocuments from "../documents/allDocs";
import Files from "../dashboard/files";
import Footer from "../homepage/footer"
import "../components/gen.css"
export default function SharedLayout(){
    const [show, setShow] = useState(true);
    const handleToggle = () => setShow(!show);

    return <main className="flex flex-col w-[100%]">
        <TopNav handleToggle={handleToggle}/>
        <section className="flex flex-row md:flex-row h-[70rem]">
            {show && (
            <div  className="bg-transparent h-[70rem] md:w-[8%]  z-40 w-[25%]">
            < Sidenav/>
            </div>
            )}
            <div className="scroll w-[100vw] h-[70rem] overflow-y-scroll overflow-x-hidden z-10 pl-3 pr-4">
                <Outlet/>
            </div>
        </section>
        <Footer/>
    </main>
}