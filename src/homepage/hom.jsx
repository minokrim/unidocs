import "../homepage/hom.css";
import { FaArrowRight } from "react-icons/fa";
import Nav from "../nav/nav";
import header from "../images/images.png"
import Card from "../components/card";
import flowchart from "../images/logo.png"
export default function (HomeOne) {
  return (
    <main className="home-container">
      <Nav />
      <div className="home-con">
        <div className="box1">
          <div className="header-img"></div>
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
      <section className="section-2">
        <div className="function-card-holder">
        <Card title={"Seamless Document Upload"} description={"Effortlessly upload assignments, reports, and forms with our secure and user-friendly submission portal"}/>
        <Card title={"Access Records"} description={"View and download your academic records, transcripts, and certificates anytime, anywhere."}/>
        <Card title={"Track Approval Status"} description={"Stay updated on the status of submitted documents with real-time approval and feedback notifications."}/>
        <Card title={"Collaboration Hub"} description={"Share documents with faculty and peers, ensuring efficient communication and teamwork."}/>
        </div>
        <img src={flowchart} alt="" />
      </section>
    </main>
  );
}
