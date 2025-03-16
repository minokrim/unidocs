import "../up/upnav.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

export default function (UpNav){

    const [menu, setMenu] = useState(false);
    const handleToggle = () => {
        setMenu(!menu);
      };
return(
    <div className="d-flex justify-content-end bg-black">

    <div className={menu? "upnav" : "upnav active"}>
        <ul
        className="list" >
            <li className="li"><a href="#">Home</a></li>
            <li className="li"><a href="#">About</a></li>
            <li className="li"><a href="#">Services</a></li>
            <li className="li"><a href="#">Contact</a></li>
        
        </ul>
        
    </div>
    <RxHamburgerMenu onClick={handleToggle} className="icon-li"/>

    </div>
)



}