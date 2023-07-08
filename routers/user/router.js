const express = require("express");
const router = express.Router();
const { addCart } = require("./routes/addCart");
const { deleteCart } = require("./routes/deleteCart");
const { getCart } = require("./routes/getCart");
const { updateCart } = require("./routes/updateCart");
const { addOrder } = require("./routes/addOrder");

const verifyAccessToken = require("../../middlewere/token");

router.use(verifyAccessToken);

router.route("/cart").get(getCart);
router.route("/cart/add/:productId").post(addCart);
router.route("/cart/:productId/").put(updateCart).delete(deleteCart);
router
  .route("/order")
  .get((req, res) => {
    res.render("modals/order-modal");
  })
  .post(addOrder);

module.exports = router;
