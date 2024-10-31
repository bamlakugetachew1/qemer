const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      unique: true,
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    age: {
      type: Number,
      required: [true, "Please provide an age"],
      min: [0, "Age must be a positive number"],
      max: [120, "Age must be realistic"],
    },
    course: {
      type: String,
      required: [true, "Please provide a course"],
      trim: true,
      minlength: [3, "Course name must be at least 3 characters long"],
    },
    phonenumber: {
      type: String,
      required: [true, "Please provide a phone number"],
      unique: true,
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
    },
  },
  { timestamps: true }
); // Enabling timestamps

const User = mongoose.model("User", userSchema);
module.exports = User;
