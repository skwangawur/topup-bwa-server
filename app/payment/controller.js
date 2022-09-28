const Payment = require("./model");
const Bank = require("../bank/model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const bank = await Bank.find();
      const payment = await Payment.find().populate("banks");
      res.render("admin/payment/view_payment", {
        payment,
        alert,
        bank,
        name: req.session.user.name,
        title: "Payment Page",
      });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
  viewCreate: async (req, res) => {
    try {
      const bank = await Bank.find();
      res.render("admin/payment/create", {
        bank,
        name: req.session.user.name,
        title: "Create Payment Page",
      });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { type, banks } = req.body;
      const payment = await Payment({ type, banks });
      payment.save();
      req.flash("alertMessage", "succes create payment");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const bank = await Bank.find();
      const payment = await Payment.findById(id);
      res.render("admin/payment/edit", {
        bank,
        payment,
        name: req.session.user.name,
        title: "Edit Payment Page",
      });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { type, banks } = req.body;
      console.log(type);
      await Payment.findByIdAndUpdate(id, { type, banks });
      req.flash("alertMessage", "succes update payment");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Payment.findByIdAndDelete(id);
      req.flash("alertMessage", "succes delete payment");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await Payment.findById(id);
      console.log(payment);
      let status = payment.status == "Y" ? "N" : "Y";
      await Payment.findByIdAndUpdate(id, { status });
      req.flash("alertMessage", "succes update status payment");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
};
