import { useContext } from "react";
import { userContext } from "../context/userProvider";
import { FaUser } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { FaFolder } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import "./sidenav.css"

export default function Sidenav({show}) {
  const {user,loading}=useContext(userContext);
  return (
    <div className="sidenav-body">  
      {show && <div className="sidenav-holder">
        <section className="logged-user">
          <h5>Welcome</h5>
          <FaUser/>
          <p>{user}</p>
        </section>
        <section className="nav-con">
        <div>
          <FaHome className="icons" />
        </div>
        <div>
          <FaFolder className="icons" />
        </div>
        <div>
          <SiGoogledocs className="icons" />
        </div>
        <div>
          <IoSettings className="icons" />
        </div>
        <div>
          <FaSearch className="icons" />
        </div>
        </section>
      </div>}
    </div>
  );
}
