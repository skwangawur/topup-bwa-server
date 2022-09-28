const mongoose = require("mongoose");
const bycrpt = require("bcrypt");
const salt = bycrpt.genSaltSync(12);

const playerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "fill email"],
    },
    name: {
      type: String,
      required: [true, "fill name"],
    },
    username: {
      type: String,
      required: [true, "fill username"],
      min: [3, "Name should has 3 - 255 character"],
      max: [255, "Name should has 3 - 255 character"],
    },
    password: {
      type: String,
      required: [true, "fill password"],
      max: [255, "Name should has 3 - 255 character"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    avatar: {
      type: String,
    },
    filename: {
      type: String,
    },
    phoneNumber: {
      type: String,
      min: [9, "Name should has 9 - 255 character"],
      max: [255, "Name should has 9 - 255 character"],
    },
    favorite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

playerSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("Player").countDocuments({ email: value });
      return !count;
    } catch (error) {
      throw error;
    }
  },
  (attr) => `${attr.value} has been sign up`
);

playerSchema.pre("save", function (next) {
  this.password = bycrpt.hashSync(this.password, salt);
  next();
});

module.exports = mongoose.model("Player", playerSchema);
