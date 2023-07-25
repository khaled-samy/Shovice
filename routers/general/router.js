const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  filterProducts,
  changeLayout,
} = require("./routes");

router.route("/").get(getProducts).post(filterProducts);
router.get("/product/:id", getProduct);
router.get("/:templete", changeLayout);

module.exports = router;
