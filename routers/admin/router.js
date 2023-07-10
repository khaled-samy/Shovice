const express = require("express");
const router = express.Router();
const Message = require("../../models/message");
const { getProducts } = require("./routes/getProducts");
const { addProduct } = require("./routes/addProduct");
const { editProduct } = require("./routes/editProduct");
const { deleteProduct } = require("./routes/deleteProduct");
const { getUsersOrder } = require("./routes/getUsersOrder");
const { getUserOrder } = require("./routes/getUserOrder");
const { updateOrderStatus } = require("./routes/updateOrderStatus");
const { adminIndex } = require("./routes/adminIndex");
const { addMessage } = require("./routes/addMessage");

const Product = require("../../models/product");

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
    res.render("product/add");
  })
  .post(addProduct);

router
  .route("/product/:id")
  .get(async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render("product/edit", { product: product });
  })
  .put(editProduct)
  .delete(deleteProduct);

router.get("/users-order", getUsersOrder);
router.route("/user-order/:orderId").get(getUserOrder).put(updateOrderStatus);

module.exports = router;
