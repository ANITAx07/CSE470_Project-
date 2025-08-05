const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Add pet to favorites
router.put('/add-favorite/:userId', async (req, res) => {
  try {
    const { petId } = req.body; // Pet ID from request body
    const { userId } = req.params; // User ID from URL params

    const user = await User.findById(userId);  // Find user by ID
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Check if pet is already in favorites
    if (user.favorites.includes(petId)) {
      return res.status(400).json({ error: 'Pet already in favorites' });
    }

    // Add petId to favorites
    user.favorites.push(petId);
    await user.save();
    return res.status(200).json({ message: 'Pet added to favorites' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});


// Get favorites
router.get('/:userId/favorites', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('favorites');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user.favorites);  // Return the list of favorite pets
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
      user.favorites = user.favorites.filter(id => id !== petId);
      await user.save();
      return res.status(200).json({ message: 'Pet removed from favorites' });
    }
    return res.status(400).json({ error: 'Pet not found in favorites' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});module.exports = router;  // Ensure this is properly exported
