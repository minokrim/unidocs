import { FaUser } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { FaFolder } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
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
