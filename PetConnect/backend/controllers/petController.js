// petController.js

const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json(pet);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pet' });
  }
};

module.exports = { getAllPets, getPetById };



// const Pet = require('../models/Pet');

// const getAllPets = async (req, res) => {
//   try {
//     const pets = await Pet.find({ status: 'available' });
//     res.json(pets);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch pets' });
//   }
// };

// module.exports = { getAllPets };
