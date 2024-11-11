import React from "react";
import "../../../styles/Grid.css"

interface GripProps {
    children?: React.ReactNode;
}

export default function Grud({ children }: GripProps) {
    return (
        <div className="grid">
            {React.Children.map(children, (child) => (
                <div className="card">{child}</div>
            ))}
       </div>
    )
}