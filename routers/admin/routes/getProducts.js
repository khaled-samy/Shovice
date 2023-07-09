const Product = require("../../../models/product");

exports.getProducts = async (req, res) => {
  try {
    const products = (await Product.find().sort()).reverse();
    res.render("admin/products.ejs", {
      products: products,
    });
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
};
