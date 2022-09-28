const User = require("./model");
const bcrypt = require("bcrypt");

module.exports = {
  viewSignIn: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      if (req.session.user === null || req.session.user === undefined) {
        res.render("admin/signin/view_signin", { alert });
      } else {
        res.redirect("/dashboard");
      }
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
  actionSignIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const check = await User.findOne({ email: email });

      if (check) {
        let passwordCheck = await bcrypt.compare(password, check.password);
        if (passwordCheck) {
          req.session.user = {
            id: check._id,
            email: check.email,
            status: check.status,
            name: check.name,
          };
          res.redirect("/dashboard");
        } else {
          req.flash("alertMessage", "your password is wrong!");
          req.flash("alertStatus", "danger");
          res.redirect("/");
        }
      } else {
        req.flash("alertMessage", "your email is wrong!");
        req.flash("alertStatus", "danger");
        res.redirect("/");
      }
    } catch (error) {}
  },
  actionLogOut: (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
};
