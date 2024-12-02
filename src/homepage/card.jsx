import { FaSearch } from "react-icons/fa";
import "./card.css";

export default function Cards() {
    const boxStyle = {

        color: 'royalblue', 
        padding: '10px', 
       
      };
  return (
    <div className="card-con">
      <div className="c-con">
        <div className="i-box">
          <FaSearch  className="ic"/>
        </div>
        <div className="t-con">
          <h5 style={boxStyle}>Doc Managment</h5>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
      <div className="c-con mt-5">
        <div className="i-box">
          <FaSearch  className="ic"/>
        </div>
        <div className="t-con">
          <h5 style={boxStyle}>Doc Managment</h5>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
    </div>
  );
}
