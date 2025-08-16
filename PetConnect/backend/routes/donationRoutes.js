// donationRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
  createDonation,
  getUserDonations,
  getAllDonations,
  getDonationById,
  approveDonation,
  rejectDonation,
  completeDonation,
  uploadDonationPhoto
} = require('../controllers/donationController');

// Public routes (no auth required)
// None for now - all donation operations require authentication

// Protected routes (require authentication)
router.post('/', authMiddleware, upload.single('photo'), createDonation); // ✅ includes file upload
router.get('/my-donations', authMiddleware, getUserDonations);
router.get('/:id', authMiddleware, getDonationById);

// Admin routes (require admin role)
router.get('/', authMiddleware, (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  next();
}, getAllDonations);

router.put('/:id/approve', authMiddleware, (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  next();
}, approveDonation);

router.put('/:id/reject', authMiddleware, (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  next();
}, rejectDonation);

router.put('/:id/complete', authMiddleware, (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  next();
}, completeDonation);

// Photo upload route
router.post('/:id/upload-photo', authMiddleware, upload.single('photo'), uploadDonationPhoto);

module.exports = router;
