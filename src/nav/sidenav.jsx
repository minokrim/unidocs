import { FaUser } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { FaFolder } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
<<<<<<< HEAD:src/nav/sidenav.jsx
import "./sidenav.css"

export default function Sidenav({show}) {
  const {user,loading}=useContext(userContext);
  return (
    <div className="sidenav-body">  
      {show && <div className="sidenav-holder">
        <section className="logged-user">
          <h5>Welcome</h5>
          <FaUser/>
          <p>{user.email}</p>
        </section>
        <section className="nav-con">
=======
import "./navdash.css"
import { useState } from "react";

export default function NavDash() {
  const [show, setShow] = useState(true);
  const handleToggle = () => {
    setShow(!show);
  };
  return (
    
    <div className="nav-con">
      <div className="admin-con" onClick={handleToggle}>
        <div className="admin-r mt-3">
          <FaUser  className="admin"  />
        </div>
        <h3 className="mt-2" >Admin</h3>
       <div className={show? "uni" : "uni active"}>
        <h3>
          U
        </h3>
        <h3>
          N
        </h3>
        <h3>
          I
        </h3>
        <h3>
          D
        </h3>
        <h3>
          O
        </h3>
        <h3>
          C
        </h3>
        <h3>
          S
        </h3>
       </div>
      </div>
     

      <div className={show? "icon-con" : "icon-con active"}>
>>>>>>> 8c2e6fc33f807d72434db578ba68512d3b536eda:src/dashboard/navdash.jsx
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
      </div>
    </div>
  );
}
