const jwt = require("jsonwebtoken");
const { User, Product } = require("../../../models");

exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const products = await Product.find({ _id: { $ne: req.params.id } }).limit(4);
  try {
    if (req.cookies.jwt) {
      const user = jwt.decode(req.cookies.jwt);
      const loggedUser = await User.findOne({ username: user.username });
      if (product == null) res.redirect("/");
      res.render("product/show", {
        user: loggedUser,
        product: product,
        products: products,
      });
    }
    res.render("product/show", {
      user: "",
      product: product,
      products: products,
    });
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
};
