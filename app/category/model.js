const mongoose = require("mongoose");

let categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Fill Category Name"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
