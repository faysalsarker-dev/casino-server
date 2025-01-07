const express = require('express');
const historyController = require('../controllers/historyController');

const router = express.Router();

// Define routes for history
router.get('/', historyController.getAllHistory);
router.get('/:id', historyController.getHistoryById);
router.post('/', historyController.createHistory);
router.put('/:id', historyController.updateHistory);
router.delete('/:id', historyController.deleteHistory);

module.exports = router;