const express = require('express');
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const upload = require('../utils/upload');
const Item = require('../models/Item');
const User = require('../models/User');
const statusGuard = require('../utils/statusGuard');
const router = express.Router();

router.post('/create', auth, role('USER'), async (req, res) => {
  const {
    receiverPhone,
    images
  } = req.body;

  // Validate 4 angles
  const required = ['front', 'back', 'left', 'right'];
  for (let angle of required) {
    if (!images[angle]?.image || !images[angle]?.description) {
      return res.status(400).json({ message: `${angle} image required` });
    }
  }

  // Find or create receiver
  let receiver = await User.findOne({ phone: receiverPhone });
  if (!receiver) {
    receiver = await User.create({
      phone: receiverPhone,
      password: receiverPhone
    });
  }

  // Upload images
  const uploadedImages = {};
  for (let angle of required) {
    const url = await upload(images[angle].image);
    uploadedImages[angle] = {
      url,
      description: images[angle].description
    };
  }

  const item = await Item.create({
    itemId: `ITM-${Date.now()}`,
    sender: req.user.id,
    receiver: receiver._id,
    images: uploadedImages,
    history: [{ status: 'CREATED', updatedBy: req.user.id }]
  });

  res.json(item);
});


router.put(
  '/pickup-confirm/:id',
  auth,
  role('AGENT'),
  async (req, res) => {

    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Must be PICKUP agent
    if (req.user.agentType !== 'PICKUP') {
      return res.status(403).json({ message: 'Not a pickup agent' });
    }

    if (!statusGuard(item.status, 'RECEIVED_AT_PICKUP')) {
      return res.status(400).json({ message: 'Invalid status flow' });
    }

    // Location validation
    if (item.pickupLocation !== req.user.agentLocation) {
      return res.status(403).json({ message: 'Wrong pickup location' });
    }

    item.status = 'RECEIVED_AT_PICKUP';

    item.history.push({
      status: 'RECEIVED_AT_PICKUP',
      updatedBy: req.user.id
    });

    await item.save();
    res.json(item);
  }
);

router.get(
  '/pickup-items',
  auth,
  role('AGENT'),
  async (req, res) => {

    if (req.user.agentType !== 'PICKUP') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const items = await Item.find({
      status: 'VERIFIED_AT_PARK',
      pickupLocation: req.user.agentLocation
    })
      .populate('sender receiver', 'phone fullName')
      .sort({ createdAt: -1 });

    res.json(items);
  }
);


module.exports = router;
