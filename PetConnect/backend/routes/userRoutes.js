// PetConnect - User Routes for Managing Favorites
// This file handles user-related operations such as adding/removing pets to/from favorites
// and retrieving a user's favorite pets.
// This code is part of the PetConnect backend application.
// userRoutes.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Add pet to fav
router.put('/add-favorite/:userId', async (req, res) => {
  try {
    const { petId } = req.body; // Pet id from request body
    const { userId } = req.params; 

    const user = await User.findById(userId);  // Find user by ID
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Check if pet is already in fav
    if (user.favorites.includes(petId)) {
      return res.status(400).json({ error: 'Pet already in favorites' });
    }

    // Add petId to fav
    user.favorites.push(petId);
    await user.save();
    return res.status(200).json({ message: 'Pet added to favorites' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});


// Get fav
router.get('/:userId/favorites', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('favorites');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user.favorites);  // Return the list of fav pets
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Remove pet from favorites
router.put('/remove-favorite/:userId', async (req, res) => {
  try {
    const { petId } = req.body;
    const { userId } = req.params;

    // Find user by userId
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Remove petId from favorites if it exists
    if (user.favorites.includes(petId)) {
      user.favorites = user.favorites.filter(id => id.toString() !== petId);
      await user.save();  // Save the updated user document
      return res.status(200).json({ message: 'Pet removed from favorites' });
    }
    return res.status(400).json({ error: 'Pet not found in favorites' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});




module.exports = router;  // Ensure this is properly exported
