const jwt = require("jsonwebtoken");
const { User, Cart, Order } = require("../../../models");

exports.addOrder = async (req, res) => {
  try {
    const { city, name } = req.body;
    const user = jwt.decode(req.cookies.jwt);
    const loggedUser = await User.findOne({ username: user.username });
    const userId = loggedUser.id;
    const cart = await Cart.findOne({ userId: userId });
    const products = cart.products.map((product) => ({
      productId: product.productId,
      quantity: product.quantity,
    }));

    if (products.length > 0) {
      const order = new Order({
        userId: userId,
        products: products,
        name: name,
        city: city,
      });

      await order.save();
    }

    cart.products = [];
    await cart.save();
    res.redirect("/user/cart");
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
};
