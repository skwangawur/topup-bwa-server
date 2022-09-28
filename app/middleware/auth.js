const jwt = require("jsonwebtoken");
const config = require("../../config");
const Player = require("../player/model");

module.exports = {
  isLoginAdmin: (req, res, next) => {
    if (req.session.user === null || req.session.user === undefined) {
      req.flash("alertMessage", "your session was done");
      req.flash("alertStatus", "danger");
      res.redirect("/");
    } else {
      next();
    }
  },
  isLoginPlayer: async (req, res, next) => {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.replace("Bearer ", "")
        : null;

      console.log(token);

      const data = jwt.decode(token);
      console.log(data);

      const player = await Player.findOne({ _id: data.data.id });

      req.player = player;
      req.token = token;

      next();
    } catch (error) {
      res.status(400).json({
        error: "Not authorized to access this resources ",
      });
    }
  },
};
