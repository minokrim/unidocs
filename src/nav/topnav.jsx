 import React from 'react';
 import './topnav.css'
 import { IoIosMenu } from "react-icons/io";
 import logo from '../images/logo.png'

export default function TopNav({handleToggle}){

    return <main className=' bg-gradient-to-b from-purple-700 to-black'>
        <div className="flex justify-between w-full content-center items-center">
            <IoIosMenu  onClick={handleToggle} className='text-4xl md:text-8xl'/>
            <div className='w-max mr-[1em] flex justify-between items-center'>
            <img src={logo} alt="" className='w-auto h-[4em] md:h-[6em]'/>
            <section>
            <h1 className='text-lg font-bold md:text-4xl'>Dashboard</h1>
            <h5 className='text-sm font-semibold md:text-lg'>Document Manage System</h5>
            </section>
            </div>
        </div>
    </main>
 }