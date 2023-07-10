const express = require("express");
const router = express.Router();
const Message = require("../../models/message");
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

router.get("/message", async (req, res) => {
  const messages = await Message.find({});
  res.render("user/message", { messages: messages });
});

module.exports = router;
