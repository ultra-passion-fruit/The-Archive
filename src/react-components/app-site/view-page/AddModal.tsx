import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

const AddModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="add-modal"> Test </div>
        </div>
    )
}

export default AddModal;