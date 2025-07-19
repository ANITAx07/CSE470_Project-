const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  item: String,
  quantity: Number,
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', donationSchema);
