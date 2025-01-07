const User = require('../models/User');
const Deposit = require('../models/Deposit');
const Withdraw = require('../models/withdraw');
const Support = require('../models/Support');

const getDashboardData = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
    ]).catch(error => {
      console.error("Error aggregating users:", error);
      return [];
    });

    const deposits = await Deposit.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
    ]).catch(error => {
      console.error("Error aggregating deposits:", error);
      return [];
    });

    const withdraws = await Withdraw.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
    ]).catch(error => {
      console.error("Error aggregating withdraws:", error);
      return [];
    });

    const supports = await Support.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
    ]).catch(error => {
      console.error("Error aggregating supports:", error);
      return [];
    });

    const totalUsers = await User.countDocuments().catch(error => {
      console.error("Error counting users:", error);
      return 0;
    });
    const totalDeposit = await Deposit.countDocuments().catch(error => {
      console.error("Error counting deposits:", error);
      return 0;
    });
    const totalWithdraw = await Withdraw.countDocuments().catch(error => {
      console.error("Error counting withdraws:", error);
      return 0;
    });
    const totalSupport = await Support.countDocuments().catch(error => {
      console.error("Error counting supports:", error);
      return 0;
    });

    res.status(200).json({
      users,
      totalUsers,
      deposits,
      totalDeposit,
      withdraws,
      totalWithdraw,
      supports,
      totalSupport,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDashboardData,
};
