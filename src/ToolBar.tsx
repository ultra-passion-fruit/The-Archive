import React from 'react';
import hand from './assets/menu-bar-tools/hand.png'
import cursor from './assets/menu-bar-tools/cursor.png'
import addButton from './assets/menu-bar-tools/add-button.png'

export default function ToolBar() {
    return (
        <div className="toolbar">
            <div className="toolbar-main-tools-container">
                <div className="toolbar-button toolbar-hand">
                    <img className="toolbar-button toolbar-hand" src={hand} alt="hand button"></img>
                </div>
                <div className="toolbar-button toolbar-cursor">
                    <img className="toolbar-button toolbar-cursor" src={cursor} height="35px" width="35px" alt="cursor button"></img>
                </div>
            </div>
            <div className="toolbar-button-separator"></div>
            <div className="toolbar-button toolbar-add">
                <img className="toolbar-button toolbar-add" src={addButton} height="35px" width="35px" alt="add button"></img>
            </div>
        </div>       
    )
}