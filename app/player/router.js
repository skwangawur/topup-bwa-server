const express = require("express");
const { isLoginPlayer } = require("../middleware/auth");
const {
  dashboard,
  landingPage,
  detailPage,
  category,
  checkout,
  history,
  historyDetail,
  profile,
  editProfile,
} = require("./controller");
const router = express.Router();
const multer = require("multer");
const os = require("os");

router.get("/landingpage", landingPage);
router.get("/:id/detail", detailPage);
router.get("/category", category);
router.post("/checkout", isLoginPlayer, checkout);
router.get("/history", isLoginPlayer, history);
router.get("/history/:id/detail", isLoginPlayer, historyDetail);
router.get("/dashboard", isLoginPlayer, dashboard);
router.get("/profile", isLoginPlayer, profile);
router.put(
  "/profile",
  isLoginPlayer,
  multer({ dest: os.tmpdir() }).single("image"),
  editProfile
);

module.exports = router;
