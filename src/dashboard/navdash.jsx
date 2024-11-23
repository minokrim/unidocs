import { FaUser } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { FaFolder } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import "./navdash.css"

export default function NavDash() {
  return (
    
    <div className="nav-con">
      <div className="admin-con">
        <div className="admin-r mt-3">
          <FaUser className="admin " />
        </div>
        <h3 className="mt-2">Admin</h3>
      </div>

      <div className="icon-con">
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
