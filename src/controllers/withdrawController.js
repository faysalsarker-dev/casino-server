const Withdraw = require('../models/withdraw');
const User = require('../models/User');
const withdraw = require('../models/withdraw');

// Create a new withdraw request


// Create a new withdraw request
exports.createWithdrawRequest = async (req, res) => {
  try {
    const { email, amount, type, number } = req.body;

    // Validate input
    if (!email || !amount || !type) {
      return res.status(400).json({ error: "All fields are required." });
    }



    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Validate withdrawal amount
    // if (user.winBalance < amount) {
    //   return res.status(400).json({
    //     error: "Insufficient balance for this withdrawal.",
    //   });
    // }

    // Update user's balance
    // user.winBalance -= amount;
    // await user.save();

    // Create the withdrawal request
    const newWithdraw = await Withdraw.create({
      email,
      amount,
      type,
      number
    });

  

    return res.status(200).json({
      message: "Withdrawal request created successfully.",
      data: newWithdraw,
    });
  } catch (error) {
    console.error("Error creating withdrawal request:", error.message);
    return res.status(500).json({
      error: "Error creating withdrawal request.",
      details: error.message,
    });
  }
};

// Fetch all withdraw requests
exports.getAllWithdrawRequests = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const search = req.query.search || "";
    const status = req.query.status || "pending";
    const date = req.query.date || "newest";
    const skip = (page - 1) * limit;

   
    const filter = status ? { status } : {};

   
    const searchInfo = search
      ? {
          $or: [
            { email: { $regex: search, $options: "i" } },
            { paymentType: { $regex: search, $options: "i" } },
          ],
        }
      : {};


    const query = { ...filter, ...searchInfo };

    // Determine sort order based on date
    const dateSort = date === "newest" ? { createdAt: -1 } : { createdAt: 1 };

    // Fetch data with filters, pagination, and sorting
    const withdraws = await Withdraw.find(query)
      .skip(skip)
      .limit(limit)
      .sort(dateSort);

    // Get total count of matching documents
    const totalWithdraws = await Withdraw.countDocuments(query);

    // Send response
    res.status(200).send({
      withdraws,
      totalWithdraws,
      totalPages: Math.ceil(totalWithdraws / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching withdrawal requests.", details: error.message });
  }
};


// Approve or reject a withdrawal request
exports.updateWithdrawRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedRequest = await Withdraw.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ error: 'Withdrawal request not found.' });
    }

    res.status(200).json({ message: 'Withdrawal request status updated successfully.', data: updatedRequest });
  } catch (error) {
    res.status(500).json({ error: 'Error updating withdrawal request.', details: error.message });
  }
};

// Delete a withdrawal request
exports.deleteWithdrawRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRequest = await Withdraw.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ error: 'Withdrawal request not found.' });
    }

    res.status(200).json({ message: 'Withdrawal request deleted successfully.', data: deletedRequest });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting withdrawal request.', details: error.message });
  }
};
