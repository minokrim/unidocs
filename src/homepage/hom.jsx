import '../homepage/hom.css'
import { FaSearch } from "react-icons/fa";
export default function(HomeOne){
return (
    <div className="hom imgs">
        <div className='hom-con'>
            <h1 className=''>Manage You Docs</h1>
            <h5 className='mt-2 d-flex text-center'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </h5>

            <div className='input-box'>

            <FaSearch  className='search-ic' />
                
            <input className='input-hom' type="text" />
            <button className='src-btn'>Search</button>
            </div>
        </div>
    </div>
)

}