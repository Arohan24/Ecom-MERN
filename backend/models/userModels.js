const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto=require('crypto');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name Cannot be less than 4 characters "],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater Than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
//Generating password reset token
userSchema.methods.getResetPasswordToken = function () {
  // Generate a token that will be used to reset user's password
  const resetToken = crypto.randomBytes(64).toString("hex");

  // Save this token on the users database document
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set when this token will expire - 15 minutes
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};
module.exports = mongoose.model("User", userSchema);
