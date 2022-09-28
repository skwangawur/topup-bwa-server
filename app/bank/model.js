const mongoose = require("mongoose");

const schemaBank = mongoose.Schema(
  {
    author: {
      type: String,
      required: [true, "fill the author of bank account"],
    },
    bankName: {
      type: String,
      required: [true, "fill bank name"],
    },
    bankAccount: {
      type: Number,
      required: [true, "fill bank account"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bank", schemaBank);
