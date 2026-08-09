const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemId: String,

  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  images: {
    front: { url: String, description: String },
    back: { url: String, description: String },
    left: { url: String, description: String },
    right: { url: String, description: String }
  },

  status: {
    type: String,
    enum: [
      'CREATED',
      'APPROVED_BY_RECEIVER',
      'VERIFIED_AT_PARK',
      'RECEIVED_AT_PICKUP',
      'IN_TRANSIT',
      'DELIVERED'
    ],
    default: 'CREATED'
  },

  history: [
    {
      status: String,
      date: { type: Date, default: Date.now },
      updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
