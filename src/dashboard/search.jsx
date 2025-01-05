 import { useState } from 'react';
 import './search.css'
 import { IoIosMenu } from "react-icons/io";
 import NavDash from './navdash';
import Files from './files';
export default function SearchNav(){
      const [show, setShow] = useState(true);
      const handleToggle = () => {
        setShow(!show);
      };
    return <main className='search-holder'>
        <div className="search-con">
            <IoIosMenu  onClick={handleToggle} className='logo'/>
            <div className='dash ps-2'>
            <h1 className='d-dash'>Dashboard</h1>
            <h5 className='smaller'>Document Manage System</h5>
            </div>
        </div>
        <section className='sidenav-sec'>
            <NavDash show={show}/>
            <Files/>
        </section>
    </main>
 }