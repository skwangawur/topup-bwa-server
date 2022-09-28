const express = require("express");
const {
  index,
  viewCreate,
  actionCreate,
  viewEdit,
  actionEdit,
  actionDelete,
  actionStatus,
} = require("./controller");
const router = express.Router();
const { isLoginAdmin } = require("../middleware/auth");

/* GET home page. */
router.use(isLoginAdmin);
router.get("/", index);
router.get("/create", viewCreate);
router.post("/create", actionCreate);
router.get("/edit/:id", viewEdit);
router.put("/edit/:id", actionEdit);
router.delete("/edit/:id", actionDelete);
router.put("/status/:id", actionStatus);

module.exports = router;
