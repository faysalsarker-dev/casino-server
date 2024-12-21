const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
    paymentType: {
        type: String,
        required: true,
    },
    transactionCode: {
        type: String,
        required: true,
        unique: true, 
    },
    number: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /\d{9,}/.test(v); // Ensures the number is at least 9 digits long
            },
            message: props => `${props.value} is not a valid number!`
        },
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'success'], 
        default: 'pending',  
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Validates email format
            },
            message: props => `${props.value} is not a valid email!`
        },
    },
}, { timestamps: true });

module.exports = mongoose.model('Deposit', depositSchema);
