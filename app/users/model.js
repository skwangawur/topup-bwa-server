const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "fill email"],
    },
    name: {
      type: String,
      required: [true, "fill name"],
    },
    password: {
      type: String,
      required: [true, "fill password"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "admin",
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    phoneNumber: {
      type: String,
      required: [true, "fill phone number"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
