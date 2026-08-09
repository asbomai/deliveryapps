const express = require('express');
const auth = require('../middleware/auth.middleware');
const User = require('../models/User');

const router = express.Router();

router.put('/profile', auth, async (req, res) => {
  const { fullName, businessName, businessAddress } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { fullName, businessName, businessAddress },
    { new: true }
  );

  res.json(user);
});

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

module.exports = router;
