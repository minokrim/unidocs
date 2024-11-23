 import './search.css'
 import { FaSearch } from "react-icons/fa";
 export default function SearchNav(){
    return(
        <div className="search-con">
            <div className='dash ms-4'>
            <h1>Dashboard</h1>
            <h5>Document Manage System</h5>
            </div>
            <div className='input-con'>
                <div className='search-box'>
            <FaSearch  className='search-icon'/>
            </div>
                <input className='input' type="text" /> 
            </div>
        </div>
    )
 }