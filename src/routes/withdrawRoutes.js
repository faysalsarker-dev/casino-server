const express = require('express');
const withdrawController = require('../controllers/withdrawController');

const router = express.Router();

router.post('/', withdrawController.createWithdrawRequest);
router.get('/', withdrawController.getAllWithdrawRequests);
router.put('/:id', withdrawController.updateWithdrawRequestStatus);
router.delete('/:id', withdrawController.deleteWithdrawRequest);

module.exports = router;
