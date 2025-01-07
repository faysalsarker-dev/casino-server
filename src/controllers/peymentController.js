const {DepositAddress,WithdrawType} = require('../models/peyment');

// Utility for handling async functions
const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// Get all deposit addresses
exports.getDepositAddresses = asyncHandler(async (req, res) => {
    const depositAddresses = await DepositAddress.find();
    const withdrawType = await WithdrawType.find();
    res.status(200).json({ depositAddresses, withdrawType });
});

// Create a new deposit address
exports.createDepositAddress = asyncHandler(async (req, res) => {
    const { address, paymentType } = req.body;

    // Basic validation
    if (!address || !paymentType) {
        return res.status(400).json({ message: 'Address and type are required' });
    }

    const newDepositAddress = await DepositAddress.create(req.body);
    res.status(201).json(newDepositAddress);
});

// Delete a deposit address
exports.deleteDepositAddress = asyncHandler(async (req, res) => {
    const depositAddress = await DepositAddress.findById(req.params.id);

    if (!depositAddress) {
        return res.status(404).json({ message: 'Deposit address not found' });
    }

    await DepositAddress.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Deposit address deleted successfully' });
});





// Create a new deposit address
exports.createWithdrawType = asyncHandler(async (req, res) => {

    const withdrawType = await WithdrawType.create(req.body);
    res.status(201).json(withdrawType);
});

// Delete a deposit address
exports.deleteWithdrawType = asyncHandler(async (req, res) => {
    const withdrawType = await WithdrawType.findById(req.params.id);

    if (!withdrawType) {
        return res.status(404).json({ message: 'Deposit address not found' });
    }

    await withdrawType.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Deposit address deleted successfully' });
});
