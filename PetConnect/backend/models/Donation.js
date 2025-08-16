// PetConnect/backend/models/Donation.js
const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  item: String,
  quantity: Number,
  category: {
    type: String,
    enum: ['food', 'toy', 'medicine', 'clothing', 'accessories', 'bedding', 'other'],
    required: true
  },
  condition: {
    type: String,
    enum: ['new', 'used'],
    required: true
  },
  photo: String,
  pickupMethod: {
    type: String,
    enum: ['pickup', 'drop-off'],
    required: true
  },
  pickupAddress: String,
  meetupLocation: String,
  notes: String,
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'completed'], 
    default: 'pending' 
  },
  adminNotes: String,
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviewedAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field on save
donationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Donation', donationSchema);
