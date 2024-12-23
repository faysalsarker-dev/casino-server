const Deposit = require("../models/Deposit");
const User = require("../models/User");

// Get all deposits
exports.getAllDeposits = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const search = req.query.search || "";
    const status = req.query.status || "pending";
    const skip = (page - 1) * limit;

  
    const filter = status ? { status } : {};

   
    const searchInfo = search
      ? {
          $or: [
            { transactionCode: { $regex: search, $options: "i" } },
            { paymentType: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    
    const query = { ...filter };

   
    const deposits = await Deposit.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); 

    
    const totalDeposits = await Deposit.countDocuments(query);

    
    res.status(200).send({
      deposits,
      totalDeposits,
      totalPages: Math.ceil(totalDeposits / limit),
      currentPage: page,
    });
  } catch (error) {
    next(error); 
  }
};


// Create a new deposit
exports.createDeposit = async (req, res, next) => {
  try {
    const { email, paymentType, transactionCode, number, status } = req.body;

    // Check if the user exists
    const user = await Deposit.find({ email:email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure transactionCode is unique
    const existingTransaction = await Deposit.findOne({ transactionCode });
    if (existingTransaction) {
      return res.status(400).json({ message: "Transaction code already exists" });
    }
    // Create a new deposit
    const newDeposit = await Deposit.create({
      email,
    
      paymentType,
      transactionCode,
      number,
      status,
    });

    res.status(201).json({
      message: "Deposit successfully created",
      deposit: newDeposit,
    });
  } catch (error) {
    next(error);
  }
};

// Get a deposit by ID
exports.getDepositByEmail = async (req, res, next) => {
  try {
    const deposit = await Deposit.find({ email: req.params.email });
    if (!deposit) {
      return res.status(404).json({ message: "Deposit not found" });
    }
    res.status(200).json(deposit);
  } catch (error) {
    next(error);
  }
};

// Update deposit by ID
exports.updateDeposit = async (req, res, next) => {
  try {
    const { email, status, depositBalance } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const updatedDeposit = await Deposit.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedDeposit) {
      return res.status(404).json({ message: "Deposit not found" });
    }


  

   
    user.depositBalance += depositBalance;
    await user.save(); 

    res.status(200).json({
      message: "Deposit updated successfully",
      deposit: updatedDeposit,
    });
  } catch (error) {
    next(error);
  }
};


// Delete deposit by ID
exports.deleteDeposit = async (req, res, next) => {
  try {
    const deletedDeposit = await Deposit.findByIdAndDelete(req.params.id);
    if (!deletedDeposit) {
      return res.status(404).json({ message: "Deposit not found" });
    }
    res.status(200).json({ message: "Deposit deleted successfully" });
  } catch (error) {
    next(error);
  }
};
