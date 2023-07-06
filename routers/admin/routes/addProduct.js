const Product = require("../../../models/product");

exports.addProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  res.redirect("../..");
  try {
    newProduct = await newProduct.save();
  } catch (err) {
    res.status(500).json(err);
  }
};
