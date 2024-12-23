const express = require('express');
const { createSupport, getSupports, getSupportById, updateSupport, deleteSupport } = require('../controllers/supportController');

const router = express.Router();

// Create a new support link
router.post('/', createSupport);

// Get all support links
router.get('/', getSupports);

// Get a single support link by ID
router.get('/:id', getSupportById);

// Update a support link by ID
router.put('/:id', updateSupport);

// Delete a support link by ID
router.delete('/:id', deleteSupport);

module.exports = router;
