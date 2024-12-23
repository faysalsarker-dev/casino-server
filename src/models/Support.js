const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true, 
    trim: true,
  },
  link: {
    type: String,
    required: true, 
      message: 'Invalid URL format for link.',
    },
  name: {
    type: String,
    trim: true,
    default: 'Support', 
  },
}, { timestamps: true });

module.exports = mongoose.model('Support', supportSchema);
