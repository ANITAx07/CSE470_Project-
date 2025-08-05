import React, { useEffect, useState } from 'react'; 
import axios from 'axios'; 
import './AdoptPage.css'; 
import { FaHeart } from 'react-icons/fa';  // Import the heart icon 
import PetModal from './PetModal';

export default function AdoptPage() {
  const [pets, setPets] = useState([]); 
  const [filteredPets, setFilteredPets] = useState([]); 
  const [selectedPet, setSelectedPet] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [favorites, setFavorites] = useState([]); // To store favorite pets

  useEffect(() => {
    fetchPets();
    fetchFavorites(); // Fetch favorite pets on page load
  }, []);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, pets]);

  const fetchPets = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/pets');
      const availablePets = res.data.filter((pet) => pet.status === 'available');
      setPets(availablePets);
      setFilteredPets(availablePets);
    } catch (err) {
      alert('Failed to fetch pets');
    }
  };

  // Fetch the list of favorite pets for the logged-in user
  const fetchFavorites = async () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${userId}/favorites`);
        setFavorites(res.data);
      } catch (err) {
        console.error('Error fetching favorites:', err);
      }
    }
  };

  const handleSearch = (term) => {
    const lowercased = term.toLowerCase();
    const filtered = pets.filter((pet) =>
      pet.name.toLowerCase().includes(lowercased) ||
      pet.breed.toLowerCase().includes(lowercased)
    );
    setFilteredPets(filtered);
  };

  // 👉 Adoption request handler
  const handleAdopt = async (petId) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/adoptions/request',
        { petId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assumes token is stored
          },
        }
      );
      alert('✅ Adoption request submitted!');
    } catch (err) {
      alert('❌ Failed to submit request');
    }
  };

  // 👉 Add pet to favorites
  const handleFavorite = async (petId) => {
    // Add pet to favorites locally first
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(petId)) {
        return prevFavorites; // Pet is already in favorites, no need to add it
      } else {
        return [...prevFavorites, petId]; // Add pet to favorites
      }
    });

    // Send the petId to the backend to add it to favorites
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("❌ Please log in to add pets to favorites");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/add-favorite/${userId}`,
        { petId }
      );
      alert("❤️ Pet added to favorites!");
    } catch (err) {
      console.error("Error adding to favorites:", err.response || err.message);
      alert("❌ Failed to add to favorites");
      setFavorites((prevFavorites) => prevFavorites.filter(id => id !== petId)); // Revert on error
    }
  };

  // 👉 Remove pet from favorites
  const handleRemoveFavorite = async (petId) => {
    setFavorites((prevFavorites) => prevFavorites.filter(id => id !== petId)); // Remove from UI first

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("❌ Please log in to remove pets from favorites");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/remove-favorite/${userId}`,
        { petId }
      );
      alert("❌ Pet removed from favorites!");
      fetchFavorites(); // Re-fetch updated favorites
    } catch (err) {
      console.error("Error removing from favorites:", err.response || err.message);
      alert("❌ Failed to remove from favorites");
      setFavorites((prevFavorites) => [...prevFavorites, petId]); // Revert on error
    }
  };

  return (
    <div className="adopt-page">
      <h2>Available Pets for Adoption</h2>

      {/* 🔍 Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or breed..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Pet Grid */}
      <div className="pet-grid">
        {filteredPets.map((pet) => (
          <div key={pet._id} className="pet-box" onClick={() => setSelectedPet(pet)}>
            <img src={`http://localhost:5000${pet.image}`} alt={pet.name} />
            <div className="pet-info">
              <h4>
                {pet.name}
                <FaHeart
                  style={{
                    color: favorites.includes(pet._id) ? 'red' : 'gray', // Change color based on favorite status
                    cursor: 'pointer',
                    marginLeft: '8px',
                  }}
                  onClick={() => {
                    if (favorites.includes(pet._id)) {
                      handleRemoveFavorite(pet._id);  // Remove from favorites
                    } else {
                      handleFavorite(pet._id);  // Add to favorites
                    }
                  }} 
                />
              </h4>
              <p>Age: {pet.age}</p>
              <button className="adopt-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPet && (
        <PetModal
          pet={selectedPet}
          onClose={() => setSelectedPet(null)}
          onAdopt={handleAdopt}
        />
      )}
    </div>
  );
}
