const Bank = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };
      const bank = await Bank.find();
      res.render("admin/bank/view_bank", {
        bank,
        alert,
        name: req.session.user.name,
        title: "Bank Page",
      });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      redirect("/bank");
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/bank/create", {
        name: req.session.user.name,
        title: "Create Bank Page",
      });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      redirect("/bank");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { author, bankName, bankAccount } = req.body;
      const bank = await Bank({ author, bankName, bankAccount });
      await bank.save();
      req.flash("alertMessage", "success add bank account");
      req.flash("alertStatus", "success");
      res.redirect("/bank");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      redirect("/bank");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const bank = await Bank.findById(id);
      res.render("admin/bank/edit", {
        bank,
        name: req.session.user.name,
        title: "Edit Bank Page",
      });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      redirect("/bank");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { author, bankName, bankAccount } = req.body;
      await Bank.findByIdAndUpdate(id, { author, bankName, bankAccount });
      req.flash("alertMessage", "success Update bank account");
      req.flash("alertStatus", "success");
      res.redirect("/bank");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      redirect("/bank");
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Bank.findByIdAndDelete(id);
      req.flash("alertMessage", "success Delete bank account");
      req.flash("alertStatus", "success");
      res.redirect("/bank");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      redirect("/bank");
    }
  },
};
