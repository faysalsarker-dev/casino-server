const User = require("../models/User");
const admin = require("firebase-admin");
const serviceAccount = require("./cas-ino-firebase-adminsdk-4cm3v-2eaceb59c2");
// Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const skip = (page - 1) * limit;

    const searchInfo = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(searchInfo).skip(skip).limit(limit);

    const totalUsers = await User.countDocuments(searchInfo);

    res.status(200).send({
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    });
  } catch (error) {
    next(error);
  }
};





exports.checkUserExists = async (req, res) => {
  try {
    const { email, phone } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    if (!phone) {
      return res.status(400).json({ error: 'Phone is required' });
    }
    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (user) {
      return res.status(200).json({
        exists: true,
        message: `User already exists with ${
          user.email === email ? 'email' : 'phone'
        }`,
      });
    }
    return res.status(404).json({ exists: false, message: 'User does not exist' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while checking the user' });
  }
};




// Create a new user
exports.createUser = async (req, res, next) => {
  try {
    const data = req.body;

    const user = await User.create(data);

    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "User creation failed", error });
  }
};

// Get a user by ID
exports.getUserByEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Update user by ID
exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};





admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const authAdmin = admin.auth();
// Delete user by ID
exports.deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findOneAndDelete(req.params.uid);
    await authAdmin.deleteUser(req.params.uid);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
