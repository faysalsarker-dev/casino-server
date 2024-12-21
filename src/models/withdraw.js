const mongoose = require('mongoose');

const withdraw = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); 
        },
        message: props => `${props.value} is not a valid email!`,
      },
    },
    amount: {
      type: Number,
      required: true,
      min: [1, 'Amount must be at least 1'],
    },
    type: {
      type: String,
      required: true,
      
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'approved', 'rejected'], 
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model('Withdraw', withdraw);
