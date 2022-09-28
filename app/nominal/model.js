const mongoose = require("mongoose");

const nominalSchema = mongoose.Schema(
  {
    coinName: {
      type: String,
      required: [true, "fill coin name"],
    },
    coinQuantity: {
      type: Number,
      default: 0,
      required: [true, "fill coin amount"],
    },
    price: {
      type: Number,
      default: 0,
      required: [true, "fill coin price"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Nominal", nominalSchema);
