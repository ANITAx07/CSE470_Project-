// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Initialize Express app
const app = express();

// ===== Middlewares =====
app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===== MongoDB Connection =====
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ===== Routes =====
const petRoutes = require('./routes/petRoutes');
const authRoutes = require('./routes/auth');
const adoptionRoutes = require('./routes/adoptionRoutes'); // Make sure this line is uncommented correctly

const userRoutes = require('./routes/userRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// Use routes
app.use('/api/pets', petRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/adoptions', adoptionRoutes); // This should be enabled
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);




// ===== Test Route =====
app.get('/', (req, res) => {
  res.send('🐾 PetConnect API is alive!');
});

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Export app for testing
module.exports = app;
