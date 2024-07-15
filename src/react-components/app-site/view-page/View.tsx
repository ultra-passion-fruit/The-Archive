import React, { useEffect, useState } from 'react';
import Viewer from './Viewer';
import ToolBar from './ToolBar';
import ZoomBar from './ZoomBar';
import HomeButton from './HomeButton';
import { useParams } from 'react-router-dom';

import { Collection } from '../herbarium-page/Herbarium';

///// TEMP TYPES DEFINITIONS /////
    
    // SPECIMEN TYPE DEFINITION
    export type TSpecimen = {
        _id: string,
        imagePath: string,
        height: number,
        width: number,
        collectionId: string,
        binomialNomenclature: string,
        genus: string,
        species: string,
        alt: string,
    }
    
export default function View() {

    const { id } = useParams<string>();
    const [isLoading, setIsLoading] = useState(true);
    const [collection, setCollection] = useState<TSpecimen[]>([]);
    
    useEffect(() => {
        fetch('http://localhost:8000/user')
            .then(res => {
                return res.json();
            })
            .then(data => {
                // setCollection(data.collections.reduce((accum: Collection[], curren: Collection) => {
                //     accum[curren._id] = curren;
                // }, {}).get(id))
                // setCollection(data.collections[0].specimens);
                setCollection(data.collections.find((collec: Collection) => {
                    return collec._id === id;
                }).specimens);
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
                
            })
            .catch((error) => {
                setIsLoading(false);
            })
    }, [collection]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <HomeButton/>
            <ToolBar/>
            <Viewer data={collection}/>
            <ZoomBar/>
        </div>
    );
}
