const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    /*
    BOTH are required
    username, unique
    password
    */
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema)

module.exports = User
