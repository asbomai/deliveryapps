const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const User = require('../models/User');

router.post(
  '/create-agent',
  auth,
  role('ADMIN'),
  async (req, res) => {

    const { phone, agentType, agentLocation } = req.body;

    const exists = await User.findOne({ phone });
    if (exists) return res.status(400).json({ message: 'Agent exists' });

    const agent = await User.create({
      phone,
      password: phone,
      role: 'AGENT',
      agentType, // PARK or PICKUP
      agentLocation,
      isActive: true
    });

    res.json(agent);
  }
);

router.put(
  '/agent-status/:id',
  auth,
  role('ADMIN'),
  async (req, res) => {
    const agent = await User.findById(req.params.id);
    agent.isActive = !agent.isActive;
    await agent.save();
    res.json(agent);
  }
);

router.get(
  '/all-items',
  auth,
  role('ADMIN'),
  async (req, res) => {
    const items = await Item.find()
      .populate('sender receiver', 'phone fullName')
      .sort({ createdAt: -1 });
    res.json(items);
  }
);

module.exports = router;
