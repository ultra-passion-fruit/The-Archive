import React from "react";
import "../../../styles/Grid.css"

interface GripProps {
    children?: React.ReactNode;
}

export default function Grud({ children }: GripProps) {
    return (
        <div className="grid">
            <div className="card">
                {children}
            </div>
        </div>
    )
}