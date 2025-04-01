import { useContext } from "react";
import { userContext } from "../context/userProvider";
import { FaUser } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { FaFolder } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import "./sidenav.css"
import { Link } from "react-router-dom";

export default function Sidenav({show}) {
  const {user,loading}=useContext(userContext);
  return (
    <div className="sidenav-body">  
      {show && (<div className="sidenav-holder">
        <section className="logged-user">
          <h5>Welcome</h5>
          <FaUser/>
          <p>{user.email}</p>
        </section>
        <section className="nav-con">
        <Link to="/">
          <FaHome className="icons" />
        </Link>

        <Link to="/documents">
          <FaFolder className="icons" />
        </Link>

        <Link to="/Folders">
          <SiGoogledocs className="icons" />
        </Link>

        <Link to="/settings">
          <IoSettings className="icons" />
        </Link>
        <Link to="/search">
          <FaSearch className="icons" />
        </Link>
        </section>
      </div>)}
    </div>
  );
}
