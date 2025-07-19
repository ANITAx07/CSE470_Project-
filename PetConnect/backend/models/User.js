

// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['user', 'admin'], default: 'user' },
  avatar:   { type: String } // ✅ Add this line
});

module.exports = mongoose.model('User', userSchema);






// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: { type: String, enum: ['user', 'admin'], default: 'user' },
//   favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
//   // Add other profile fields as needed (bio, avatar, etc)
// });

// module.exports = mongoose.model('User', userSchema);
