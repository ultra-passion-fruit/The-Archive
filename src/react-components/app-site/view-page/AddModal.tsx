import React, { useEffect, useState } from "react";
import "../../../styles/AddModal.css";
import { TSpecimen } from "./View";
import Specimen from "../herbarium-page/Specimen";
import Grid from "./Grid";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

const AddModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [specimens, setSpecimens] = useState<TSpecimen[]>([]);
    const [selectedSpecimens, setSelectedSpecimens] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetch('http://localhost:8000/user')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setSpecimens(data.specimens);
            setTimeout(() => setIsLoading(false), 500);
        });
    }, []);

    if (!isOpen) return null;

    // Toggle selection on specimen click
    const toggleSelection = (id: string) => {
        setSelectedSpecimens(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(id)) {
                newSelected.delete(id);
            } else {
                newSelected.add(id);
            }
            return newSelected;
        });
    };

    return (
        <div className="modal-overlay">
            <div className="add-modal">
                <div>
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
                <div>
                    <h1>Add Specimen</h1>
                    <Grid>
                        {specimens.map((specimen: TSpecimen) => (
                            <div
                                key={specimen._id}
                                className={`card ${selectedSpecimens.has(specimen._id) ? 'selected' : ''}`}
                                onClick={() => toggleSelection(specimen._id)}
                            >
                                <Specimen 
                                    id={specimen._id}
                                    name={specimen.binomialNomenclature}
                                    image={specimen.imagePath}
                                    alt={specimen.alt}
                                />
                            </div>
                        ))}
                    </Grid>
                </div>
                <div>
                    <button className="confirm-button" >Confirm Selection</button> {/* onClick={handleConfirm} */}
                </div>
            </div>
        </div>
    )
}

export default AddModal;