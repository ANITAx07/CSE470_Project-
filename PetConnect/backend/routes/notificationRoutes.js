// PetConnect/backend/routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const Notification = require('../models/Notification');

// Get notifications for a user
router.get('/:userId', notificationController.getUserNotifications);

// Mark notification as read
router.put('/mark-read/:notificationId', notificationController.markNotificationRead);

// Temporary debug route to get raw notifications for a user
router.get('/debug/raw/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const notifications = await Notification.find({ userId: userId }).sort({ createdAt: -1 });
    console.log('Raw notifications for user:', notifications);
    res.status(200).json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching raw notifications' });
  }
});

module.exports = router;
