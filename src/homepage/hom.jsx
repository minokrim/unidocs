import "../homepage/hom.css";
import { FaArrowRight } from "react-icons/fa";
import Nav from "../nav/nav";
import sora1 from "../images/sora1.png"
import Card from "../components/card";
import hero from "../images/uni1.png"
import flowchart from "../images/logo.png"
import Footer from "./footer";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

export default function HomeOne () {
  useEffect(()=>{
    AOS.init()
  })
    return <main className="home-container">
      <Nav />
      <div className="home-con md:pt-20 bg-gradient-to-b from-purple-700 to-black">
        <div className="box1">
          <div className="header-img"></div>
          <h1 className="mb-3 text-center w-3/4">Get to work, with a lot less work</h1>
          <h4 className="mb-4 text-center">
            Unidocs delivers tools that help you move your work forward faster,
            keep it safe, and let you collaborate with ease.
          </h4>
          <div className="mt-4">
            <div className="flex flex-col items-center justify-center w-full">
            <button className="signin hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-xl">
              Sign In <FaArrowRight className="ms-2" />
            </button>
            <p className="text-center color">Lets Get Started</p>
            </div>
          </div>
        </div>
      </div>


      <section className="section-2 p-5 bg-gradient-to-b from-purple-700 to-black" >
        <div className="function-card-holder">
        <Card title={"Seamless Document Upload"} description={"Effortlessly upload assignments, reports, and forms with our secure and user-friendly submission portal"} dataAos="zoom-in-up"/>
        <Card title={"Access Records"} description={"View and download your academic records, transcripts, and certificates anytime, anywhere."}/>
        <Card title={"Track Approval Status"} description={"Stay updated on the status of submitted documents with real-time approval and feedback notifications."}/>
        <Card title={"Collaboration Hub"} description={"Share documents with faculty and peers, ensuring efficient communication and teamwork."}/>
        </div>
        <img src={sora1} alt="" className="w-[100%] mt-20 md:md-0 md:w-[30%] h-[20%] rounded-3xl" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000"/>
      </section>


      <section className="p-8 md:p-40 bg-gradient-to-b from-purple-950 to-black">
        <img src={hero} alt="dasboard" data-aos="zoom-in-up" data-aos-duration='3000'/>
      </section>

      <Footer/>
    </main>;
}
