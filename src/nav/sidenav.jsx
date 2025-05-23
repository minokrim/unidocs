import { useContext } from "react";
import { userContext } from "../context/userProvider";
import { FaUser } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { FaFolder } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";

import "./sidenav.css"
import { Link } from "react-router-dom";

export default function Sidenav() {
  const {user,loading}=useContext(userContext);
  console.log(user.profile_pic_url);
  return (
    <div className="sidenav-body h-[100vh] bg-gradient-to-t from-purple-700 to-black">  
  <div className="sidenav-holder">
        <section className="logged-user">
          <h5>Welcome</h5>
          <img src={user.profile_pic_url} alt="" className="rounded-full w-1/2"/>
          <p>{user.first_name}</p>
        </section>
        <section className="nav-con">
        <Link to="/app/files">
          <FaHome className="icons" />
        </Link>

        <Link to="/app/documents">
          <FaFolder className="icons" />
        </Link>

        <Link to="/app/Folders">
          <SiGoogledocs className="icons" />
        </Link>

        <Link to="/app/settings">
          <IoSettings className="icons" />
        </Link>
        <Link to="/app/search">
          <FaSearch className="icons" />
        </Link>
        
        <Link>
        <IoLogOutSharp className="text-white text-4xl"/>
        </Link>
        </section>
      </div>
    </div>
  );
}
