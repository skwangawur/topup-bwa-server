const Nominal = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const nominal = await Nominal.find();
      res.render("admin/nominal/view_category", {
        nominal,
        alert,
        name: req.session.user.name,
        title: "Nominal Page",
      });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      redirect("/nominal");
    }
  },
  viewNominal: async (req, res) => {
    try {
      res.render("admin/nominal/create", {
        name: req.session.user.name,
        title: "Create Nomninal Page",
      });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      redirect("/nominal");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { coinName, coinQuantity, price } = req.body;
      const nominal = await Nominal({ coinName, coinQuantity, price });
      await nominal.save();
      req.flash("alertMessage", "Success Create Nominal");
      req.flash("alertStatus", "success");
      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", danger);
      res.redirect("/nominal");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const nominal = await Nominal.findById(id);
      console.log(nominal);
      res.render("admin/nominal/edit", {
        nominal,
        name: req.session.user.name,
        title: "Edit Nomninal Page",
      });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", danger);
      res.redirect("/nominal");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { coinName, coinQuantity, price } = req.body;
      await Nominal.findByIdAndUpdate(id, { coinName, coinQuantity, price });
      req.flash("alertMessage", "Edit Form Success");
      req.flash("alertStatus", "success");
      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", danger);
      res.redirect("/nominal");
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Nominal.findByIdAndDelete(id);
      req.flash("alertMessage", "Delete Nominal Success");
      req.flash("alertStatus", "success");
      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", danger);
      res.redirect("/nominal");
    }
  },
};
