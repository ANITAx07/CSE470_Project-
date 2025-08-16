// backend/routes/adoptionRoutes.js
const express = require('express');
const router = express.Router();
const Adoption = require('../models/AdoptionRequest');
const Notification = require('../models/Notification');
const Pet = require('../models/Pet');
const User = require('../models/User');

// ✅ 1. Submit an adoption request
router.post('/request', async (req, res) => {
  const {
    userId,
    petId,
    name,
    address,
    phone,
    hadPetBefore,
    carePlan,
    estimatedCost,
    deliveryRequested
  } = req.body;

  try {
    const newRequest = new Adoption({
      userId,
      petId,
      name,
      address,
      phone,
      hadPetBefore,
      carePlan,
      estimatedCost,
      deliveryRequested,
      status: 'pending'
    });

    await newRequest.save();
    
    // Notify admins about new adoption request
    const pet = await Pet.findById(petId);
    const adminUsers = await User.find({ role: 'admin' });
    for (const admin of adminUsers) {
      await Notification.create({
        userId: admin._id,
        message: `New adoption request for ${pet.name} from ${name}`,
        type: 'adoption_request',
        relatedId: newRequest._id
      });
    }

    res.status(201).json({
      message: 'Adoption request submitted',
      request: newRequest
    });
  } catch (err) {
    console.error(err); // 🧪 log full error
    res.status(500).json({
      error: 'Failed to submit adoption request',
      details: err.message
    });
  }
});

// ✅ 2. Get all adoption requests for a specific user
router.get('/my-requests/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const requests = await Adoption.find({ userId })
      .populate('petId', 'name image breed age')
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch requests', details: err.message });
  }
});

// 3. Admin: Get all adoption requests

router.get('/admin/adoption-requests', async (req, res) => {
  try {
    const requests = await Adoption.find()
      .populate('petId', 'name image breed age')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch adoption requests', details: err.message });
  }
});


// ==============================

// backend/routes/adoptionRoutes.js

// backend/routes/adoptionRoutes.js
// const Notification = require('../models/Notification');

router.put('/admin/adoption-requests/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const request = await Adoption.findById(id); // Find the request by ID
        if (!request) return res.status(404).json({ error: 'Request not found' });

        request.status = status; // Update the status
        await request.save(); // Save the updated request

        // Create notification for user on approval or rejection
        if (status === 'approved' || status === 'rejected') {
            const pet = await Pet.findById(request.petId);
            const message = `Your adoption request for ${pet.name} has been ${status}.`;
            const notification = new Notification({
                userId: request.userId,
                type: `adoption_${status}`,
                message,
                relatedId: request._id
            });
            await notification.save();
        }

        res.status(200).json({ message: 'Request status updated', request });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update status', details: err.message });
    }
});

module.exports = router;

// // ✅ 5. Update payment status after approval
router.put('/pay/:requestId', async (req, res) => {
  const { requestId } = req.params;
  const { platformFeePaid, deliveryFeePaid } = req.body;

  try {
    const request = await Adoption.findById(requestId);
    if (!request) return res.status(404).json({ error: 'Request not found' });

    request.platformFeePaid = platformFeePaid;
    request.deliveryFeePaid = deliveryFeePaid;

    await request.save();
    res.status(200).json({ message: 'Payment recorded', request });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update payment', details: err.message });
  }
});


// backend/routes/adoptionRoutes.js

// Admin: Get all completed adoption requests
// Get completed adoptions
router.get('/admin/adoption-history', async (req, res) => {
  try {
    const completedAdoptions = await Adoption.find({
      status: 'approved',
      platformFeePaid: true,
    })
      .populate('petId', 'name image breed age')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(completedAdoptions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch completed adoptions', details: err.message });
  }
});















