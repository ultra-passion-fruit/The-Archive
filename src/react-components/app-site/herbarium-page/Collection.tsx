import React from "react";

import { TSpecimen } from "../view-page/View";
import { Link } from "react-router-dom";

interface CollectionProps {
    id: string,
    name: string,
    specimens: TSpecimen[];
}

export default function Collection(props: CollectionProps) {
    const {id, name, specimens} = props;
    return (
        <div key={id}>
            <h3>{name}</h3>
            <Link to={`/app/view/${id}`}>{name}</Link>
        </div>
    )
}