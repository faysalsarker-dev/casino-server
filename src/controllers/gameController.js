const History = require('../models/History');
const User = require('../models/User');

exports.createGameStart = async (req, res) => {
    try {
        
        const user = await User.findOne({ email: req.body.userEmail });
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'No user found with that email'
            });
        }
        user.depositBalance -= req.body.betAmount;
        user.save();

       console.log(user);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};


exports.createGameWin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.userEmail });
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'No user found with that email'
            });
        }
        user.winBalance += req.body.betAmount * 5;
        user.save();
        const winAmount = req.body.betAmount * 5;
        const data = {...req.body, winAmount};
        console.log(data);
        const history = await History.create(data);
        console.log(user, history,'win');
        res.status(201).json({
            status: 'success',
            user,
            history

        });
    } catch (err) {
        res.status(400).json(user);
    }
};
exports.createGameLost = async (req, res) => {
    try {
       
        const user = await User.findOne({ email: req.body.userEmail });
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'No user found with that email'
            });
        }
    
        const history = await History.create(req.body);
        console.log(history);
        res.status(201).json({
            status: 'success',
            user,
            history

        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

