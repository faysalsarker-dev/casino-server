const express = require('express');
const dAddressController = require('../controllers/peymentController');

const router = express.Router();

// Define routes
router.get('/', dAddressController.getDepositAddresses);
router.post('/', dAddressController.createDepositAddress);
router.delete('/:id', dAddressController.deleteDepositAddress);

router.post('/types', dAddressController.createWithdrawType);
router.delete('/types/:id', dAddressController.deleteWithdrawType);

module.exports = router;