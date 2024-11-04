import React from "react";
import "../../../styles/AddModal.css"
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

const AddModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="add-modal">
                <button className="close-button" onClick={onClose}>X</button>
                <h1>Add Specimen</h1>
            </div>
        </div>
    )
}

export default AddModal;