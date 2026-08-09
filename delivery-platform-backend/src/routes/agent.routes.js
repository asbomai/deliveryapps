const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');

const User = require('../models/User');
const Item = require('../models/Item');

// ✅ AGENT VERIFY ROUTE
router.post('/verify/:itemId', async (req, res) => {
  const item = await Item.findOneAndUpdate(
    { itemId: req.params.itemId },
    { status: 'VERIFIED' },
    { new: true }
  );

  if (!item) {
    return res.status(404).json({ message: 'Invalid Item ID' });
  }

  res.json(item);
});

module.exports = router;
