const Product = require("../../../models/product");

exports.deleteProduct = async (req, res) => {
  res.redirect("/api/admin/products");
  try {
    await Product.findByIdAndDelete(req.params.id);
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
};
