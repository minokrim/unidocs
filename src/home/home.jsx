import React, { useContext } from "react";
import { userContext } from "../App";
import "./home.css"
import Nav from "../nav/nav";
export default function Home(){
    const user=useContext(userContext)
    return <div className="home-main">
        <section className="home-body">
            <Nav/>
            <form action="/submit">
            <h1>welcome {user}</h1>
            </form>
        </section>
    </div>
}