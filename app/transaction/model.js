const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    historyVoucherTopup: {
      gameName: { type: String, required: [true, "fill game name"] },
      category: { type: String, required: [true, "fill game category"] },
      thumbnail: { type: String },
      coinName: { type: String, required: [true, "fill coin name"] },
      coinQuantity: { type: String, required: [true, "fill coin quantity"] },
      price: { type: Number },
    },

    historyPayment: {
      name: { type: String, required: [true, "fill name"] },
      type: { type: String, required: [true, "fill payment type"] },
      bankName: { type: String, required: [true, "fill bank name"] },
      noRekening: { type: String, required: [true, "fill payment account"] },
    },
    name: {
      type: String,
      required: [true, "fill payment type"],
      min: [3, "Name should has 3 - 255 character"],
      max: [255, "Name should has 3 - 225 character"],
    },
    accountUser: {
      type: String,
      required: [true, "fill user account"],
      min: [3, "Name should has 3 - 255 character"],
      max: [255, "Name should has 3 - 225 character"],
    },
    tax: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
    historyUser: {
      name: { type: String, required: [false, "fill name"] },
      phoneNumber: {
        type: Number,
        min: [9, "Name should has 9 - 13 character"],
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
