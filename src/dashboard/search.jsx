 import './search.css'
 import { FaSearch } from "react-icons/fa";
 export default function SearchNav(){
    return(
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
    )
 }