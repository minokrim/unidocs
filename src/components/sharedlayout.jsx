import { Outlet } from "react-router-dom";
import TopNav from "../nav/topnav";
import Sidenav from "../nav/sidenav";
import { useState } from "react";
import AllDocuments from "../documents/allDocs";
import Files from "../dashboard/files";
export default function SharedLayout(){
    const [show, setShow] = useState(true);
    const handleToggle = () => setShow(!show);

    return <main className="flex flex-col">
        <TopNav handleToggle={handleToggle}/>
        <section className="flex flex-row md:flext-row">
            <Sidenav show={show}/>
            <div className="content flex-1 p-4">
                <Outlet/>
                <Files/>
            </div>
        </section>
    </main>
}