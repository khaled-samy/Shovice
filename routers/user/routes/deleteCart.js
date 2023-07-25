const jwt = require("jsonwebtoken");
const { User, Product, Cart } = require("../../../models");

exports.deleteCart = async (req, res) => {
  try {
    const user = jwt.decode(req.cookies.jwt);
    const loggedUser = await User.findOne({ username: user.username });
    const userId = loggedUser._id;
    const { productId } = req.params;

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
        let myProduct = await Product.findOne({ _id: productId });
        const { quantity } = cart[0].products[productIndex];
        cart[0].products.splice(productIndex, 1);
        myProduct.availability += quantity;
        myProduct = await myProduct.save();
        cart = await cart[0].save();
        res.redirect("/user/cart");
      }
    }
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
};
