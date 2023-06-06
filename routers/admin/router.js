const express = require("express");
const router = express.Router();
const { addProduct } = require("./routes/addProduct");
const { editProduct } = require("./routes/editProduct");
const { deleteProduct } = require("./routes/deleteProduct");

const Product = require("../../models/product");

const verifyAccessToken = require("../../middlewere/token");
const checkAdmin = require("../../middlewere/checkAdmin");

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
    console.log(888888, product);
    res.render("product/edit", { product: product });
  })
  .put(editProduct)
  .delete(deleteProduct);

router.use(verifyAccessToken);
router.use(checkAdmin);

module.exports = router;
