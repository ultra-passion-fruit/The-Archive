import React from 'react';
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
        image: string,
        height: number,
        width: number,
        alt: string,
        id: number
    }
    
export default function View() {

    //////////////////////////////////

    // Individual specimen created
    const specimen1: Specimen = {
        image: specimenFile1,
        height: 600,
        width: 420,
        alt: "tree",
        id: 1,
    }

    const specimen2: Specimen = {
        image: specimenFile2,
        height: 600,
        width: 420,
        alt: "tree",
        id: 2,
    }

    const specimen3: Specimen = {
        image: specimenFile3,
        height: 600,
        width: 420,
        alt: "tree",
        id: 3,
    }

    // Collection Objects created
    const collection: Specimen[] = [
        {
            image: specimenFile1,
            height: 600,
            width: 420,
            alt: "tree",
            id: 1
        },
        {
            image: specimenFile2,
            height: 600,
            width: 420,
            alt: "tree",
            id: 2
        },
        {
            image: specimenFile3,
            height: 600,
            width: 420,
            alt: "tree",
            id: 3
        }
    ];

    // const [collection, useCollections] = useState([
    //     {
    //         image: specimenFile1,
    //         height: 600,
    //         width: 420,
    //         id: 1
    //     },
    //     {
    //         image: specimenFile2,
    //         height: 600,
    //         width: 420,
    //         id: 2
    //     },
    //     {
    //         image: specimenFile3,
    //         height: 600,
    //         width: 420,
    //         id: 3
    //     }
    // ]);
    
    return (
        <div>
            <HomeButton/>
            <ToolBar/>
            <Viewer data={collection}/>
            <ZoomBar/>
        </div>
    );
}
