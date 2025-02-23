 import React from 'react';
 import './topnav.css'
 import { IoIosMenu } from "react-icons/io";

export default function TopNav({handleToggle}){

    return <main className='search-holder'>
        <div className="search-con">
            <IoIosMenu  onClick={handleToggle} className='logo'/>
            <div className='dash ps-2'>
            <h1 className='d-dash'>Dashboard</h1>
            <h5 className='smaller'>Document Manage System</h5>
            </div>
        </div>
    </main>
 }