const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  photo: String, // optional
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
