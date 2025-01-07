const mongoose = require('mongoose');

const { Schema } = mongoose;

const DepositAddressSchema = new Schema({
    paymentType: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

const WithdrawTypeSchema = new Schema({
    withdrawType: {
        type: String,
        required: true
    }
});

module.exports = {
    DepositAddress: mongoose.model('DepositAddress', DepositAddressSchema),
    WithdrawType: mongoose.model('WithdrawType', WithdrawTypeSchema)
};