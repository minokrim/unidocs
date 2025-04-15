import React from "react";
import "./card.css"
export default function Card({title, description}){
    return <main className="card-holder">
        <div className="card-body">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    </main>
}