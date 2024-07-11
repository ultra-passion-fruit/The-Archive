import React from "react"
import zoomPlus from '../../../assets/view-page-tools/zoom-in-button.png'
import zoomMinus from '../../../assets/view-page-tools/zoom-out-button.png'


export default function ZoomBar() {
    return (
        <div className="zoombar">
            <div className="zoombar-button-container zoombar-plus">
                <img className="zoombar-button zoombar-plus" src={zoomPlus} alt="zoom in button"></img>
            </div>
            <div className="zoombar-button-separator"></div>
            <div className="zoombar-button-container zoombar-minus">
                <img className="zoombar-button zoombar-minus" src={zoomMinus} alt="zoom out button"></img>
            </div>
        </div>
    )
}