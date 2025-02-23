import React,{useState} from "react";
import TopNav from "./topnav";
import Sidenav from "./sidenav";
import Files from "../dashboard/files";
export default function Navcombo(){
          const [show, setShow] = useState(true);
          const handleToggle = () => {
            setShow(!show);
          };

    return <main className="flex flex-col">
            <TopNav handleToggle={handleToggle}/>
        <section className="flex flex-col md:flex-row">
            <Sidenav show={show}/>
            <Files/>
        </section>
    </main>
}