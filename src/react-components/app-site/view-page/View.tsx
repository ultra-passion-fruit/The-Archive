import React, { useEffect, useState } from 'react';
import Viewer from './Viewer';
import ToolBar from './ToolBar';
import ZoomBar from './ZoomBar';
import HomeButton from './HomeButton';
import { useParams } from 'react-router-dom';

import { Collection } from '../herbarium-page/Herbarium';

///// TEMP TYPES DEFINITIONS /////
    
    // SPECIMEN TYPE DEFINITION
    export type Specimen = {
        imagePath: string,
        height: number,
        width: number,
        fullName: string,
        genus: string,
        species: string,
        alt: string,
        _id: number
    }
    
export default function View() {

    const { id } = useParams<string>();
    const [collection, setCollection] = useState<Specimen[]>([]);
    
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
            })
            .catch((error) => {
                
            })
    }, [collection]);

    return (
        <div>
            <HomeButton/>
            <ToolBar/>
            <Viewer data={collection}/>
            <ZoomBar/>
        </div>
    );
}
