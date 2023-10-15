import React, { useEffect } from 'react';
import CreateList from "../Components/CreateList";

export default function AddListModal({ closeModal }) {
  // Define a function to handle clicks outside of the modal
  const handleClickOutside = (event) => {
    if (event.target.classList.contains('modal-background')) {
      closeModal();
    }
  };

  // Add an event listener when the component mounts
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="modal-background">
      <div className="modal-content">
        <div>
          <CreateList />
        </div>
        {/* Close button with the same appearance */}
        <button className="close-btn" onClick={closeModal}>
          CANCEL
        </button>
      </div>
    </div>
  );
}
