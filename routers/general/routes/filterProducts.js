const jwt = require("jsonwebtoken");
const { User, Product, Cart } = require("../../../models");

exports.filterProducts = async (req, res) => {
  const { category } = req.body;
  try {
    if (category) {
      const products = (
        await Product.find({ category: category }).sort()
      ).reverse();
      if (req.cookies.jwt) {
        const user = jwt.decode(req.cookies.jwt);
        const loggedUser = await User.findOne({ username: user.username });
        const carts = await Cart.find({ userId: loggedUser._id });
        if (carts) {
          res.render("index.ejs", {
            category: true,
            user: loggedUser,
            products: products,
            cart: carts,
          });
        } else {
          res.render("index.ejs", {
            category: true,
            user: loggedUser,
            products: products,
            cart: "",
          });
        }
      }
      res.render("index.ejs", { user: "", products: products, category: true });
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
};
