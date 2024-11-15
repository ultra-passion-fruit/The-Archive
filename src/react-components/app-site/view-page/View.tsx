import React, { useEffect, useState } from 'react';
import Viewer from './Viewer';
import ToolBar from './ToolBar';
import ZoomBar from './ZoomBar';
import HomeButton from './HomeButton';
import AddModal from './AddModal';
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

    const { id } = useParams<{ id: string }>();
    const [specimensId, setSpecimensId] = useState<Set<string>>()
    const [isLoading, setIsLoading] = useState(true);
    const [collection, setCollection] = useState<TSpecimen[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const setSpecimens = (specimens: Set<string>) => {
        setSpecimensId(specimens);
    }

    useEffect(() => {
        console.log(collection);
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
    }, []);

    useEffect(() => {
        fetch('http://localhost:8000/user')
            .then(res => {
                return res.json();
            })
            .then(data => {
                const newCollection = data.specimens.filter((specimens: Collection) => {
                    return specimensId?.has(specimens._id);
                });

                setCollection(prevCollection => [...prevCollection, ...newCollection]);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [specimensId])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <AddModal isOpen={isModalOpen} onClose={closeModal} onConfirm={setSpecimens}/>
            <div className="view-container">
                <HomeButton/>
                <ToolBar addButtonClick={openModal}/>
                <ZoomBar/>
            </div>
            <Viewer data={collection}/>
        </>
        
    );
}
