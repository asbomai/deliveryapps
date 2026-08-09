const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['USER', 'AGENT', 'ADMIN'],
    default: 'USER'
  },

  fullName: String,
  businessName: String,
  businessAddress: String,

  // Agent-only
  agentLocation: String,
  agentType: {
    type: String,
    enum: ['PARK', 'PICKUP']
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
