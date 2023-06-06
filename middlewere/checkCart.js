const Cart = require("../models/cart");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const checkCart = async (req, res, next) => {
  const user = jwt.decode(req.cockies.jwt);
  const userId = await User.find({ username: user.username });
  const existingCart = await Cart.findOne({ userId: userId._id });

  if (existingCart) {
    existingCart.products.forEach((product) => {
      const existingProduct = existingCart.products.find(
        (p) => p.productId === product.productId
      );
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        existingCart.products.push(product);
      }
    });

    await existingCart.save();
    return next(new Error("Cart already exists, quantity updated"));
  }

  next();
};

module.exports = checkCart;
