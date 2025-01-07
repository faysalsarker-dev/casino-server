const History = require('../models/historyModel');

// Get all history records
exports.getAllHistory = async (req, res) => {
    try {
        const history = await History.find();
        res.status(200).json({
            status: 'success',
            results: history.length,
            data: {
                history
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Get a single history record by ID
exports.getHistoryById = async (req, res) => {
    try {
        const history = await History.findById(req.params.id);
        if (!history) {
            return res.status(404).json({
                status: 'fail',
                message: 'No history found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                history
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Create a new history record
exports.createHistory = async (req, res) => {
    try {
        const newHistory = await History.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                history: newHistory
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Update a history record by ID
exports.updateHistory = async (req, res) => {
    try {
        const history = await History.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!history) {
            return res.status(404).json({
                status: 'fail',
                message: 'No history found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                history
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Delete a history record by ID
exports.deleteHistory = async (req, res) => {
    try {
        const history = await History.findByIdAndDelete(req.params.id);
        if (!history) {
            return res.status(404).json({
                status: 'fail',
                message: 'No history found with that ID'
            });
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};