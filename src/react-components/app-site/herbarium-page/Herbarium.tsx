import React, { useEffect, useState } from "react"
import { TSpecimen } from "../view-page/View";

import { Link } from "react-router-dom";
import Carrousel from "./Carrousel";
import Collection from "./Collection";
import Specimen from "./Specimen";

export interface Collection {
    _id: string,
    name: string,
    specimens: TSpecimen[]
}

export default function Herbarium() {

    const [collections, setCollections] = useState<Collection[]>([]);
    const [collectionsIds, setCollectionsIds] = useState<String[]>([]);
    const [specimens, setSpecimens] = useState<TSpecimen[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        fetch('http://localhost:8000/user')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setCollections(data.collections);
            setSpecimens(data.specimens)

            setTimeout(() => {
                setIsLoading(false)
            }, 500);
            
        })
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Herbarium</h1>
            <div>
                <h2>Collections</h2>
                <Carrousel>
                    {collections.map((collection: Collection) => {
                        return (
                            <Collection 
                                id={collection._id}
                                name={collection.name} 
                                specimens={collection.specimens}
                            />
                        )
                    })}
                </Carrousel>
                <h2>All Specimen</h2>
                <Carrousel>
                    {specimens.map((specimen: TSpecimen) => {
                        return (
                            <Specimen 
                                id={specimen._id}
                                name={specimen.binomialNomenclature}
                                image={specimen.imagePath}
                                alt={specimen.alt}
                            />
                        )
                    })}
                </Carrousel>
                <h2>Unclassified Specimen</h2>
                    {specimens.map((specimen: TSpecimen) => {
                        if (specimen.collectionId === "none") {
                            return (
                                <Specimen 
                                    id={specimen._id}
                                    name={specimen.binomialNomenclature}
                                    image={specimen.imagePath}
                                    alt={specimen.alt}
                                />
                            )
                        }
                    })}
            </div>
            {/* <Collection/> */}
        </div>
    )
}