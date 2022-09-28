const express = require("express");
const { viewSignIn, actionSignIn, actionLogOut } = require("./controller");
const router = express.Router();

router.get("/", viewSignIn);
router.post("/", actionSignIn);
router.get("/logout", actionLogOut);

module.exports = router;
