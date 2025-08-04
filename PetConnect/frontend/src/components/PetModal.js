// frontend/src/components/PetModal.js
import React from 'react';
import './PetModal.css';

export default function PetModal({ pet, onClose, onAdopt }) {
  if (!pet) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-btn" onClick={onClose}>✖
        </button>
        <div className="modal-image-container">
          <img
            src={`http://localhost:5000${pet.image}`}
            alt={pet.name}
            className="modal-image"
          />
        </div>
        <div className="modal-content">
          <h2 style={{ color: '#191615ff', fontFamily:"cursive" }}>{pet.name}</h2>
          <p><strong>Breed:</strong> {pet.breed}</p>
          <p><strong>Age:</strong> {pet.age}</p>
          <p><strong>Gender:</strong> {pet.gender}</p>
          <p><strong>Status:</strong> {pet.status}</p>
          <p>{pet.description}</p>
          <button className="adopt-btn" onClick={() => onAdopt(pet._id)}>
            💖 Adopt Me
          </button>
        </div>
      </div>
    </div>
  );
}


