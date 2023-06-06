const Product = require("../../../models/product");

exports.editProduct = async (req, res) => {
  res.redirect("../../..");
  try {
    await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};
