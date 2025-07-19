// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const {
  signup,
  login,
  getProfile,
  updateProfile
} = require('../controllers/authController');

// Signup and login
router.post('/signup', signup);
router.post('/login', login);

// Profile routes
router.get('/profile', getProfile);
router.put('/profile', upload.single('avatar'), updateProfile);

module.exports = router;
