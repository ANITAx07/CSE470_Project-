// petConnect/backend/models/Pet.js
const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String },
  age: { type: String },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  description: { type: String },
  image: { type: String }, // Will store file path like '/uploads/pet1.jpg'
  status: { type: String, enum: ['available', 'adopted'], default: 'available' }
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);
