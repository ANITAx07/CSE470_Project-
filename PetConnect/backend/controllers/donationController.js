// donationController.js
const Donation = require('../models/Donation');
const User = require('../models/User');
const Notification = require('../models/Notification');
const path = require('path');

// Create a new donation
const createDonation = async (req, res) => {
    console.log('Authenticated user:', req.user); // Log the user information
  try {
console.log('Request Body:', req.body);
console.log('Uploaded File:', req.file);
const { item, quantity, category, condition, pickupMethod, pickupAddress, meetupLocation, notes } = req.body;
    
    if (!item || !quantity || !category || !condition || !pickupMethod) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const newDonation = new Donation({
      item,
      quantity: parseInt(quantity),
      category,
      condition,
      pickupMethod,
      pickupAddress,
      meetupLocation,
      notes,
      donor: req.user.userId,
      photo: req.file ? req.file.filename : null
    });

    await newDonation.save();
    
    // Create notification for admin
    const adminUsers = await User.find({ role: 'admin' });
    for (const admin of adminUsers) {
      await Notification.create({
        userId: admin._id,
        message: `New donation request from ${req.user.name}: ${item}`,
        type: 'donation',
        relatedId: newDonation._id
      });
    }

    res.status(201).json({ 
      message: 'Donation request submitted successfully', 
      donation: newDonation 
    });
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all donations for the logged-in user
const getUserDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user.userId })
      .populate('donor', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(donations);
  } catch (error) {
    console.error('Error fetching user donations:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all donations (admin only)
const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate('donor', 'name email phone')
      .populate('reviewedBy', 'name')
      .sort({ createdAt: -1 });
    
    res.json(donations);
  } catch (error) {
    console.error('Error fetching all donations:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single donation by ID
const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate('donor', 'name email phone')
      .populate('reviewedBy', 'name');
    
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    res.json(donation);
  } catch (error) {
    console.error('Error fetching donation:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Approve donation (admin only)
const approveDonation = async (req, res) => {
  try {
    const { adminNotes } = req.body;
    
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    donation.status = 'approved';
    donation.adminNotes = adminNotes;
    donation.reviewedBy = req.user.userId;
    donation.reviewedAt = new Date();
    await donation.save();

    // Notify donor
    await Notification.create({
      userId: donation.donor,
      message: `Your donation of ${donation.item} has been approved!`,
      type: 'donation_approved',
      relatedId: donation._id
    });

    console.log('Notification created successfully');
    console.log('Notification created successfully');
    console.log('Notification created successfully');
    console.log('Notification created successfully');
    console.log('Notification created successfully');
    res.json({ message: 'Donation approved successfully', donation });
  } catch (error) {
    console.error('Error approving donation:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Reject donation (admin only)
const rejectDonation = async (req, res) => {
  try {
    const { adminNotes } = req.body;
    
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    donation.status = 'rejected';
    donation.adminNotes = adminNotes;
    donation.reviewedBy = req.user.userId;
    donation.reviewedAt = new Date();
    await donation.save();

    // Notify donor
    await Notification.create({
      userId: donation.donor,
      message: `Your donation of ${donation.item} has been rejected. Reason: ${adminNotes}`,
      type: 'donation_rejected',
      relatedId: donation._id
    });

    res.json({ message: 'Donation rejected successfully', donation });
  } catch (error) {
    console.error('Error rejecting donation:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Mark donation as completed
const completeDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    donation.status = 'completed';
    await donation.save();

    // Notify donor
    await Notification.create({
      userId: donation.donor,
      message: `Thank you! Your donation of ${donation.item} has been successfully delivered.`,
      type: 'donation_completed',
      relatedId: donation._id
    });

    res.json({ message: 'Donation marked as completed', donation });
  } catch (error) {
    console.error('Error completing donation:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Upload donation photo
const uploadDonationPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // Check if user owns this donation
    if (donation.donor.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this donation' });
    }

    donation.photo = req.file.filename;
    await donation.save();

    res.json({ 
      message: 'Photo uploaded successfully', 
      photoUrl: req.file.filename 
    });
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createDonation,
  getUserDonations,
  getAllDonations,
  getDonationById,
  approveDonation,
  rejectDonation,
  completeDonation,
  uploadDonationPhoto
};
