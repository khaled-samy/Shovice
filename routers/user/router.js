const express = require("express");
const router = express.Router();
const Message = require("../../models/message");
const {
  getCart,
  addCart,
  updateCart,
  deleteCart,
  addOrder,
} = require("./routes");

const verifyAccessToken = require("../../middlewere/token");

router.use(verifyAccessToken);

router.route("/cart").get(getCart);
router.route("/cart/add/:productId").post(addCart);
router.route("/cart/:productId/").put(updateCart).delete(deleteCart);
router.post("/order", addOrder);

router.get("/message", async (req, res) => {
  const messages = await Message.find({});
  res.render("user/message", { messages: messages });
});

module.exports = router;
