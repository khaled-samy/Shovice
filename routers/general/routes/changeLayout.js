const jwt = require("jsonwebtoken");
const { User, Product, Cart } = require("../../../models");

exports.changeLayout = async (req, res) => {
  const { templete } = req.params;
  try {
    if (templete === "secound" || templete === "third") {
      const products = (await Product.find().sort()).reverse();
      if (req.cookies.jwt) {
        const user = jwt.decode(req.cookies.jwt);
        const loggedUser = await User.findOne({ username: user.username });
        const carts = await Cart.find({ userId: loggedUser._id });
        if (carts) {
          res.render("product/category.ejs", {
            user: loggedUser,
            products: products,
            cart: carts,
            templete: templete,
          });
        } else {
          res.render("product/category.ejs", {
            user: loggedUser,
            products: products,
            cart: "",
            templete: templete,
          });
        }
      }
      res.render("product/category.ejs", {
        user: "",
        cart: "",
        templete: templete,
        products: products,
      });
    } else if (templete === "first") {
      res.redirect("/");
    } else {
      res.redirect("error/404");
    }
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
};
