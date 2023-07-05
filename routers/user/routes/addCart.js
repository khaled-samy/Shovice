const jwt = require("jsonwebtoken");
const User = require("../../../models/user");
const Cart = require("../../../models/cart");

exports.addCart = async (req, res) => {
  try {
    const quantity = 1;
    const productId = req.params.productId;
    const user = jwt.decode(req.cookies.jwt);
    const loggedUser = await User.findOne({ username: user.username });
    const userId = loggedUser.id;

    let cart = await Cart.findOne({ userId: userId });
    if (cart) {
      const productIndex = cart.products.findIndex(
        (item) => item.productId == productId
      );
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
        cart = await cart.save();
      } else {
        cart.products.push({ productId: productId, quantity: quantity });
        cart = await cart.save();
      }
    } else {
      let newCart = new Cart({
        userId: userId,
        products: [
          {
            productId: productId,
            quantity: quantity,
          },
        ],
      });

      newCart = await newCart.save();
    }
  } catch (err) {
    console.log(err);
  }
};
