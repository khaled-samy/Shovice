const Product = require("../../../models/product");

exports.addProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  res.redirect("/api/admin/products");
  try {
    newProduct = await newProduct.save();
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
};
