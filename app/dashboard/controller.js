const Transaction = require("../transaction/model");
const Player = require("../player/model");
const Voucher = require("../voucher/model");
const Category = require("../category/model");

module.exports = {
  index: async (req, res) => {
    try {
      const transaction = await Transaction.countDocuments();
      const player = await Player.countDocuments();
      const voucher = await Voucher.countDocuments();
      const category = await Category.countDocuments();
      console.log("session");
      console.log(req.session.user.name);
      res.render("admin/dashboard/view_dashboard", {
        name: req.session.user.name,
        title: "Dashboard Page",
        count: {
          transaction,
          player,
          voucher,
          category,
        },
      });
    } catch (err) {
      console.log(err);
    }
  },
};
