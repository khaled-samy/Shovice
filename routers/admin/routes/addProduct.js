const Product = require("../../../models/product");

// router.get("/new", (req, res) => {
//   res.render("products/new", { product: new Product() });
// });

// router.get("/:id", async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (product == null) res.redirect("/");
//   res.render("products/show", { product: product });
// });

// router.post("/", async (req, res) => {
//   let product = new Product({
//     name: req.body.name,
//     category: req.body.category,
//     details: req.body.details,
//     price: req.body.price,
//   });
//   try {
//     product = await product.save();
//     res.redirect(`/products/${product.id}`);
//   } catch (e) {
//     res.render("products/new", { product: product });
//   }
// });
// module.exports = router;

exports.addProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  res.redirect("../..");
  try {
    newProduct = await newProduct.save();
  } catch (err) {
    res.status(500).json(err);
  }
};
