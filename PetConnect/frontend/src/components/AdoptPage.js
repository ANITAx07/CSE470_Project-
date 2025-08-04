// // frontend/src/components/AdoptPage.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './AdoptPage.css';
// import PetModal from './PetModal';

// export default function AdoptPage() {
//   const [pets, setPets] = useState([]);
//   const [selectedPet, setSelectedPet] = useState(null);

//   useEffect(() => {
//     fetchPets();
//   }, []);

//   const fetchPets = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/pets');
//       const availablePets = res.data.filter((pet) => pet.status === 'available');
//       setPets(availablePets);
//     } catch (err) {
//       alert('Failed to fetch pets');
//     }
//   };

//   return (
//     <div className="adopt-page">
//       <h2>Available Pets for Adoption</h2>
//       <div className="pet-grid">
//         {pets.map((pet) => (
//           <div key={pet._id} className="pet-box" onClick={() => setSelectedPet(pet)}>
//             <img src={`http://localhost:5000${pet.image}`} alt={pet.name} />
//             <div className="pet-info">
//               <h4>{pet.name}</h4>
//               <p>Age: {pet.age}</p>
//               <button className="adopt-btn">View Details</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedPet && (
//         <PetModal pet={selectedPet} onClose={() => setSelectedPet(null)} />
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdoptPage.css';
import PetModal from './PetModal';

export default function AdoptPage() {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPets();
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

  const handleSearch = (term) => {
    const lowercased = term.toLowerCase();
    const filtered = pets.filter((pet) =>
      pet.name.toLowerCase().includes(lowercased) ||
      pet.breed.toLowerCase().includes(lowercased)
    );
    setFilteredPets(filtered);
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
              <h4>{pet.name}</h4>
              <p>Age: {pet.age}</p>
              <button className="adopt-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPet && (
        <PetModal pet={selectedPet} onClose={() => setSelectedPet(null)} />
      )}
    </div>
  );
}
