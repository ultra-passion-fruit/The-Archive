import React from "react";

interface CarrouselProps {
    children?: React.ReactNode;
}

export default function Carrousel({ children }: CarrouselProps) {
    return (
        <div>
            {children}
        </div>
    )
}