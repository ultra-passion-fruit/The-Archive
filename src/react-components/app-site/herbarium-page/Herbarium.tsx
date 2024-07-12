import React, { useEffect, useState } from "react"
import { Specimen } from "../view-page/View";

import { Link } from "react-router-dom";

export interface Collection {
    _id: string,
    name: string,
    specimens: Specimen[]
}

export default function Herbarium() {

    const [collections, setCollections] = useState<Collection[]>([]);
    const [collectionsIds, setCollectionsIds] = useState<String[]>([]);
    const [isLoading, setIsLoading] = useState(true); // Add a loading state

    useEffect(() => {
        fetch('http://localhost:8000/user')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setCollections(data.collections);
            console.log(data.collections)

            setIsLoading(false);
        })
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Herbarium</h1>
            <div>
                {collections.map((collection: Collection) => {
                    return (
                        <div key={collection._id}>
                            <h2>Collection {collection._id}</h2>
                            <Link to={`/app/view/${collection._id}`}>{collection.name}</Link>
                        </div>
                    )
                })}
            </div>
            {/* <Collection/> */}
        </div>
    )
}