import "../homepage/hom.css";
import { FaArrowRight } from "react-icons/fa";
import Nav from "../nav/nav";

export default function (HomeOne) {
  return (
    <main>
      <Nav />
      <div className="home-con">
        <div className="box1">
          <h1 className="aaa  mb-3">Get to work, with a lot less work</h1>
          <h4 className="bbb mb-4">
            Unidocs delivers tools that help you move your work forward faster,
            keep it safe, and let you collaborate with ease.
          </h4>
          <div className="ccc mt-4">
            <div className="">
            <button className="signin">
              Sign In <FaArrowRight className="ms-2" />
            </button>
            <p className="text-center color">Lets Get Started</p>
            </div>
            <a className="t-l" href="">
              More Information <FaArrowRight className="ms-2" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
