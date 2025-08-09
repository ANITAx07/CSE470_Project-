const Notification = require('../models/Notification');

exports.getUserNotifications = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log('Fetching notifications for user:', userId);
    const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
    console.log('Notifications found:', notifications.length);
    res.status(200).json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching notifications' });
  }
};

exports.markNotificationRead = async (req, res) => {
  try {
    const notificationId = req.params.notificationId;
    console.log('Marking notification as read:', notificationId);
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    notification.read = true;
    await notification.save();
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error marking notification as read' });
  }
};
