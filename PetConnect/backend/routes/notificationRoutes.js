const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Get notifications for a user
router.get('/:userId', notificationController.getUserNotifications);

// Mark notification as read
router.put('/mark-read/:notificationId', notificationController.markNotificationRead);

module.exports = router;
