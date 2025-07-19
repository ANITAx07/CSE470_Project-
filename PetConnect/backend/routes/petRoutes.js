// backend/routes/petRoutes.js
const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const upload = require('../middleware/uploadMiddleware');

// ==============================
// Add a new pet (with image upload)
// ==============================
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, breed, age, gender, description } = req.body;

    const newPet = new Pet({
      name,
      breed,
      age,
      gender,
      description,
      image: req.file ? `/uploads/${req.file.filename}` : ''
    });

    const savedPet = await newPet.save();
    res.status(201).json({
      message: 'Pet added successfully',
      pet: savedPet
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ==============================
// Get all pets
// ==============================
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
