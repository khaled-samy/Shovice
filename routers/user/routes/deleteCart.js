const Cart = require("../../../models/cart");
const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

exports.deleteCart = async (req, res) => {
  try {
    const user = jwt.decode(req.cookies.jwt);
    const loggedUser = await User.findOne({ username: user.username });
    const userId = loggedUser._id;

    let cart = await Cart.find({ userId: userId });
    if (!cart) {
      res.status(404).send("Cart not found");
    } else {
      const productIndex = cart[0].products.findIndex(
        (product) => product.productId === req.params.productId
      );
      if (productIndex === -1) {
        res.status(404).send("Product not found in cart");
      } else {
        cart[0].products.splice(productIndex, 1);
        cart = await cart[0].save();
        res.redirect("/user/cart");
      }
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};