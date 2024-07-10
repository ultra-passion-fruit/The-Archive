import React from "react";
import homeButton from "../assets/herbarium-logo.png"

export default function HomeButton() {

    return (
        <div className="home-button-container">
            <div className="home-button-animation-box"></div>
            <img className="home-button" src={homeButton} alt="home button"></img>
        </div>
        
    )
}