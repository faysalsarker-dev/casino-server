const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    gameName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    betAmount: {
        type: Number,
        required: true
    },
    winAmount: {
        type: Number,
       default: 0
    },
    status: {
        type: String,
        enum: ['win', 'lost'],
        required: true
    }
}, {
    timestamps: true
});

const History = mongoose.model('History', historySchema);

module.exports = History;