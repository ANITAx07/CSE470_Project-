// backend/models/AdoptionRequest.js
const mongoose = require('mongoose');

const adoptionRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },

  name: { type: String, required: true },                            // ✅ Add name field
  address: { type: String, required: true },
  phone: { type: String, required: true },
  hadPetBefore: { type: String, required: true },
  carePlan: { type: String, required: true },
  estimatedCost: { type: String, required: true },
  deliveryRequested: { type: Boolean, default: false },

  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },

  platformFeePaid: { type: Boolean, default: false },
  deliveryFeePaid: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AdoptionRequest', adoptionRequestSchema);
