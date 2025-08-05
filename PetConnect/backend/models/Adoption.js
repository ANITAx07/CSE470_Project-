// backend/models/Adoption.js
const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  priorPetOwnership: { type: String },
  carePlan: { type: String },
  estimatedTimeCost: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'paid'], default: 'pending' },
  platformFeePaid: { type: Boolean, default: false },
  deliveryFee: { type: Boolean, default: false },
  totalPaid: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Adoption', adoptionSchema);
