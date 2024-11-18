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
    const [specimenIds, setspecimenIds] = useState<Set<string>>()
    const [isLoading, setIsLoading] = useState(true);
    const [collection, setCollection] = useState<TSpecimen[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const setSpecimens = (specimens: Set<string>) => {
        setspecimenIds(specimens);
    }

    useEffect(() => {
        const storedCollection = sessionStorage.getItem('specimens');

        if (storedCollection && JSON.parse(storedCollection).length > 0){
            const parsedCollection = JSON.parse(storedCollection);

            setCollection(parsedCollection);
            
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        } else {
            fetch('http://localhost:8000/user')
            .then(res => {
                return res.json();
            })
            .then(data => {
                // setCollection(data.collections.reduce((accum: Collection[], curren: Collection) => {
                //     accum[curren._id] = curren;
                // }, {}).get(id))
                // setCollection(data.collections[0].specimens);
                const fetchedSpecimens = data.collections.find((collec: Collection) => {
                    return collec._id === id;
                }).specimens;

                setCollection(fetchedSpecimens);
                sessionStorage.setItem('specimens', JSON.stringify(fetchedSpecimens));

                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            })
            .catch((error) => {
                setIsLoading(false);
            })
        }
    }, []);

    useEffect(() => {
        if (specimenIds && specimenIds.size > 0) {
            fetch('http://localhost:8000/user')
            .then(res => {
                return res.json();
            })
            .then(data => {
                const newCollection = data.specimens.filter((specimens: Collection) => {
                    return specimenIds?.has(specimens._id);
                });

                const combinedCollection = [...collection, ...newCollection];
                setCollection(combinedCollection);
                
                if (combinedCollection.length > 0){
                    sessionStorage.setItem('specimens', JSON.stringify(combinedCollection));
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, [specimenIds])

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
