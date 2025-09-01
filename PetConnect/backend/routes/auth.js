// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const User = require('../models/User'); // Import User model
const {
  signup,
  login,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');

// Signup and login
router.post('/signup', signup);
router.post('/login', login);

// Forgot password route only (remove reset-password route)
router.post('/forgot-password', forgotPassword);

// Profile routes
router.get('/profile', getProfile);
router.put('/profile', upload.single('avatar'), updateProfile);
router.delete('/avatar', async (req, res) => {
  const { userId } = req.query;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.avatar = '';
  await user.save();
  res.json({ message: 'Avatar deleted' });
});

module.exports = router;
