const express = require('express');
const gameController = require('../controllers/gameController');

const router = express.Router();

router.post('/games', gameController.createGameWin);
router.post('/games-start', gameController.createGameStart);
router.post('/games-lost', gameController.createGameLost);
router.post('/games-win', gameController.createGameWin);


module.exports = router;