const express = require("express");
const router = express.Router();
const { addCart } = require("./routes/addCart");
const { editCart } = require("./routes/editCart");
const { deleteCart } = require("./routes/deleteCart");
const { getCart } = require("./routes/getCart");
const { updateCart } = require("./routes/updateCart");

const verifyAccessToken = require("../../middlewere/token");
const checkUser = require("../../middlewere/checkUser");

router.route("/cart").get(getCart);
router.route("/cart/add/:productId").post(addCart);
router.route("/cart/:productId/").put(updateCart).delete(deleteCart);

router.use(verifyAccessToken);
router.use(checkUser);

module.exports = router;
