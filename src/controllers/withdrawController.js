const Withdraw = require('../models/withdraw');

// Create a new withdraw request
exports.createWithdrawRequest = async (req, res) => {
  try {
    const { email, amount, type } = req.body;

    // Validate required fields
    if (!email || !amount || !type) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const withdrawRequest = new Withdraw({ email, amount, type });
    const savedRequest = await withdrawRequest.save();

    res.status(201).json({ message: 'Withdrawal request created successfully.', data: savedRequest });
  } catch (error) {
    res.status(500).json({ error: 'Error creating withdrawal request.', details: error.message });
  }
};

// Fetch all withdraw requests
exports.getAllWithdrawRequests = async (req, res) => {
 try {
     const page = parseInt(req.query.page, 10) || 1;
     const limit = parseInt(req.query.limit, 10) || 10;
     const search = req.query.search || "";
     const status = req.query.status || "pending";
     const skip = (page - 1) * limit;
 
   
     const filter = status ? { status } : {};
 
    console.log(filter,'filter');
     const searchInfo = search
       ? {
           $or: [
             { transactionCode: { $regex: search, $options: "i" } },
             { paymentType: { $regex: search, $options: "i" } },
           ],
         }
       : {};
 
     
     const query = { ...filter };
 
    
     const deposits = await Withdraw.find(query)
       .skip(skip)
       .limit(limit)
       .sort({ createdAt: -1 }); 
 console.log(deposits);
     
     const totalDeposits = await Withdraw.countDocuments(query);
 
     
     res.status(200).send({
       deposits,
       totalDeposits,
       totalPages: Math.ceil(totalDeposits / limit),
       currentPage: page,
     });
   } catch (error) {
    res.status(500).json({ error: 'Error fetching withdrawal requests.', details: error.message });
  }
};

// Approve or reject a withdrawal request
exports.updateWithdrawRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value.' });
    }

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
