import React from 'react';
import hand from '../assets/view-page-tools/hand.png'
import cursor from '../assets/view-page-tools/cursor.png'
import addButton from '../assets/view-page-tools/add-button.png'

export default function ToolBar() {
    return (
        <div className="toolbar">
            <div className="toolbar-main-tools-container">
                <div className="toolbar-button-container toolbar-hand">
                    <img className="toolbar-button toolbar-hand" src={hand} alt="hand button"></img>
                </div>
                <div className="toolbar-button-container toolbar-cursor">
                    <img className="toolbar-button toolbar-cursor" src={cursor} alt="cursor button"></img>
                </div>
            </div>
            <div className="toolbar-button-separator"></div>
            <div className="toolbar-button-container toolbar-add">
                <img className="toolbar-button toolbar-add" src={addButton} alt="add button"></img>
            </div>
        </div>       
    )
}