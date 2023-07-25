const Product = require("../../../models/product");

exports.editProduct = async (req, res) => {
  res.redirect("/api/admin/products");
  try {
    await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
};
