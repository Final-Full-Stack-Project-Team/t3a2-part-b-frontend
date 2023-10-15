import React from 'react';
import CreateList from "../Components/CreateList";

export default function AddListModal({ closeModal }) {
    return (
        <div className="modal-background">
            <div className="modal-content">
                <div>
            <CreateList />
        </div>
                {/* Close button with the same appearance */}
                <button className="close-btn" onClick={closeModal}>CANCEL</button>
            </div>
        </div>
    );
}
