const User = require("../models/usermodel");

exports.createUsers = async (req, res) => {
  try {
    const { name, age, course, phonenumber } = req.body;
    const user = new User({ name, age, course, phonenumber });

    await user.save();
    res.status(201).json({ message: "Successfully registered. Please login." });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(400)
      .json({ error: "Failed to register user. Please check input data." });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .sort({ updatedAt: -1 })
      .limit(limit)
      .skip(skip);
    res.status(200).json({ data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to retrieve users." });
  }
};

exports.getTotalLength = async (req, res) => {
  try {
    const length = await User.countDocuments();
    res.status(200).json({ length });
  } catch (error) {
    console.error("Error calculating lengths:", error);
    res.status(500).json({ error: "Failed to calculate length." });
  }
};

exports.deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user." });
  }
};

exports.updateUserById = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res
      .status(200)
      .json({ message: "User updated successfully.", data: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user." });
  }
};
