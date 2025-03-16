import "../homepage/hom.css";
import { FaArrowRight } from "react-icons/fa";
import Nav from "../nav/nav";
<<<<<<< HEAD
import header from "../images/images.png"
import Card from "../components/card";
import flowchart from "../images/logo.png"
import Footer from "./footer";
export default function HomeOne () {
  return <main className="home-container">
=======

export default function (HomeOne) {
  return (
    <main>
>>>>>>> 8c2e6fc33f807d72434db578ba68512d3b536eda
      <Nav />
      <div className="home-con pt-40 md:pt-20">
        <div className="box1">
<<<<<<< HEAD
          <div className="header-img"></div>
          <h1 className="mb-3 text-center w-3/4">Get to work, with a lot less work</h1>
          <h4 className="mb-4 text-center">
=======
          <h1 className="aaa  mb-3">Get to work, with a lot less work</h1>
          <h4 className="bbb mb-4">
>>>>>>> 8c2e6fc33f807d72434db578ba68512d3b536eda
            Unidocs delivers tools that help you move your work forward faster,
            keep it safe, and let you collaborate with ease.
          </h4>
          <div className="mt-4">
            <div className="flex flex-col items-center justify-center w-full">
            <button className="signin">
              Sign In <FaArrowRight className="ms-2" />
            </button>
            <p className="text-center color">Lets Get Started</p>
            </div>
          </div>
        </div>
      </div>
<<<<<<< HEAD
      <section className="section-2 p-5">
        <div className="function-card-holder">
        <Card title={"Seamless Document Upload"} description={"Effortlessly upload assignments, reports, and forms with our secure and user-friendly submission portal"}/>
        <Card title={"Access Records"} description={"View and download your academic records, transcripts, and certificates anytime, anywhere."}/>
        <Card title={"Track Approval Status"} description={"Stay updated on the status of submitted documents with real-time approval and feedback notifications."}/>
        <Card title={"Collaboration Hub"} description={"Share documents with faculty and peers, ensuring efficient communication and teamwork."}/>
        </div>
        <img src={flowchart} alt="" />
      </section>
      <Footer/>
    </main>;
=======
    </main>
  );
>>>>>>> 8c2e6fc33f807d72434db578ba68512d3b536eda
}
