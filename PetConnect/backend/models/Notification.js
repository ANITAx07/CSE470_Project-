const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: String, // e.g., "Adoption Approved"
  message: String,
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: false } // Added postId reference
});

module.exports = mongoose.model('Notification', notificationSchema);
