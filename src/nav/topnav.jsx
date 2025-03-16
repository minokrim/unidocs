<<<<<<< HEAD:src/nav/topnav.jsx
 import React from 'react';
 import './topnav.css'
 import { IoIosMenu } from "react-icons/io";

export default function TopNav({handleToggle}){

    return <main className='search-holder'>
=======
 import './search.css'
 import { FaSearch } from "react-icons/fa";
 export default function SearchNav(){
    return(
>>>>>>> 8c2e6fc33f807d72434db578ba68512d3b536eda:src/dashboard/search.jsx
        <div className="search-con">
            <div className='dash ps-2'>
            <h1 className='d-dash'>Dashboard</h1>
            <h5 className='smaller'>Document Manage System</h5>
            </div>
            <div className='input-box'>

            <FaSearch  className='search-ic' />
                
            <input className='input-hom' type="text" />
            <button className='src-btn'>Search</button>
            </div>
        </div>
<<<<<<< HEAD:src/nav/topnav.jsx
    </main>
=======
    )
>>>>>>> 8c2e6fc33f807d72434db578ba68512d3b536eda:src/dashboard/search.jsx
 }