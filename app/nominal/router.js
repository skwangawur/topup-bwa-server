const express = require("express");
const router = express.Router();
const {
  index,
  viewNominal,
  actionCreate,
  viewEdit,
  actionEdit,
  actionDelete,
} = require("./controller");
const { isLoginAdmin } = require("../middleware/auth");

/* GET home page. */
router.use(isLoginAdmin);
router.get("/", index);
router.get("/create", viewNominal);
router.post("/create", actionCreate);
router.get("/edit/:id", viewEdit);
router.put("/edit/:id", actionEdit);
router.delete("/edit/:id", actionDelete);

module.exports = router;
