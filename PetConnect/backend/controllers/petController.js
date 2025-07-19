// petController.js
const Pet = require('../models/Pet');

const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find({ status: 'available' });
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pets' });
  }
};

module.exports = { getAllPets };
