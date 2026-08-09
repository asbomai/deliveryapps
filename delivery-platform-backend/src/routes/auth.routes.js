const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { phone, password } = req.body;

  let user = await User.findOne({ phone });

  // AUTO-CREATE USER IF NOT EXISTS
  if (!user) {
    user = await User.create({
      phone,
      password: await bcrypt.hash(phone, 10), // default password = phone
      role: 'USER'
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user);

  const profileComplete =
    user.fullName &&
    user.businessName &&
    user.businessAddress;

  res.json({
    token,
    role: user.role,
    profileComplete
  });
});

module.exports = router;
