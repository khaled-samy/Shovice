const express = require("express");
const router = express.Router();
const { Message, Product } = require("../../models");
const {
  adminIndex,
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
  getUsersOrder,
  getUserOrder,
  updateOrderStatus,
  addMessage,
} = require("./routes");

const verifyAccessToken = require("../../middlewere/token");
const checkAdmin = require("../../middlewere/checkAdmin");

router.use(verifyAccessToken);
router.use(checkAdmin);

router.get("/", adminIndex);
router.get("/products", getProducts);

router
  .route("/message")
  .get(async (req, res) => {
    const messages = await Message.find({});
    res.render("admin/message", { messages: messages });
  })
  .post(addMessage);

router
  .route("/product")
  .get((req, res) => {
    res.render("admin/product/add");
  })
  .post(addProduct);

router
  .route("/product/:id")
  .get(async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render("admin/product/edit", { product: product });
  })
  .put(editProduct)
  .delete(deleteProduct);

router.get("/users-order", getUsersOrder);
router.route("/user-order/:orderId").get(getUserOrder).put(updateOrderStatus);

module.exports = router;
