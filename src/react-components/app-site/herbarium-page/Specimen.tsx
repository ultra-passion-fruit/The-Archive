import React from "react";

interface SpecimenProps {
    id: string,
    image: string,
    name: string,
    alt: string
}

export default function Specimen(props : SpecimenProps) {
    const {id, image, name, alt} = props;
    return (
        <div key={id}>
            <img src={image} height="100px" width="66px" alt={alt}/>
            <h3>{name}</h3>
        </div>
    )
}