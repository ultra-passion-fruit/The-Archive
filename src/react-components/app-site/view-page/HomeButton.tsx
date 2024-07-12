import React from "react";
import homeButton from "../../../assets/herbarium-logo.png"
import { useNavigate } from "react-router-dom";

export default function HomeButton() {

    const navigate = useNavigate();

    const goHome = () => {
        navigate("/app/herbarium")
    }

    return (
        <div className="home-button-container" onClick={goHome}>
            <div className="home-button-animation-box"></div>
            <img className="home-button" src={homeButton} alt="home button"></img>
        </div>
        
    )
}