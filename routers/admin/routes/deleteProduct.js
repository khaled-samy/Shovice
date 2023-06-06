const Product = require("../../../models/product");

exports.deleteProduct = async (req, res) => {
  res.redirect("../../..");
  try {
    await Product.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
};
