import React, { useEffect, useState } from 'react';
import Viewer from './Viewer';
import ToolBar from './ToolBar';
import specimenFile1 from '../../../assets/data/acer-saccharum-CAN501466.png';
import specimenFile2 from '../../../assets/data/taraxacum-officinale-CAN10088957.png';
import specimenFile3 from '../../../assets/data/tilia-americana-CAN500927.png';
import specimenFile from '../../../assets/data/specimen.png';
import ZoomControl from './ZoomBar';
import ZoomBar from './ZoomBar';
import HomeButton from './HomeButton';

///// TEMP TYPES DEFINITIONS /////
    
    // SPECIMEN TYPE DEFINITION
    export type Specimen = {
        imagePath: string,
        height: number,
        width: number,
        alt: string,
        _id: number
    }
    
export default function View() {

    const [collection, setCollection] = useState<Specimen[]>([]);
    
    useEffect(() => {
        fetch('http://localhost:8000/user')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setCollection(data.collections[0].specimens);
                console.log(data.collections[0].specimens)
            })
    }, []);

    return (
        <div>
            <HomeButton/>
            <ToolBar/>
            <Viewer data={collection}/>
            <ZoomBar/>
        </div>
    );
}
