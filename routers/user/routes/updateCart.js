const jwt = require("jsonwebtoken");
const User = require("../../../models/user");
const Cart = require("../../../models/cart");

exports.updateCart = async (req, res) => {
  const { productId } = req.params;

  const user = jwt.decode(req.cookies.jwt);
  const loggedUser = await User.findOne({ username: user.username });
  const userId = loggedUser._id;
  const quantity = parseInt(req.body.quantity);

  try {
    const cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.productId === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cart.products[productIndex].quantity = quantity;
    await cart.save();
    res.redirect("/user/cart");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
