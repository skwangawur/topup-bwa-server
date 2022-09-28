const Transaction = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const transaction = await Transaction.find().populate("player");
      console.log(transaction);
      res.render("admin/transaction/view_transaction", {
        alert,
        transaction,
        name: req.session.user.name,
        title: "Transaction Page",
      });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/transaction");
    }
  },
  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.query;
      console.log(status, id);
      await Transaction.findByIdAndUpdate(id, { status });
      req.flash("alertMessage", `Status updated to ${status}`);
      req.flash("alertStatus", "success");
      res.redirect("/transaction");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/transaction");
    }
  },
};
