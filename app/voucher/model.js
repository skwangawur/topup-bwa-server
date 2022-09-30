const mongoose = require("mongoose");

const voucherSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "fill game name"],
  },
  status: {
    type: String,
    enum: ["Y", "N"],
    default: "Y",
  },
  thumbnail: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  nominals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nominal",
    },
  ],
  payments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
  ],
  price: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Voucher", voucherSchema);
