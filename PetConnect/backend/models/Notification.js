// PetConnect/backend/models/Notification.js

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String, // Examples: "donation_approved", "adoption_request", "general"
    required: true
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false // e.g., donationId, adoptionId, etc.
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: false
  },
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Notification', notificationSchema);











// const mongoose = require('mongoose');

// const notificationSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   type: String, // e.g., "Adoption Approved"
//   message: String,
//   read: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
//   postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: false } // Added postId reference
// });

// module.exports = mongoose.model('Notification', notificationSchema);
