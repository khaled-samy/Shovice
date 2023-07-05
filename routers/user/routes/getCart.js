const User = require("../../../models/user");
const Cart = require("../../../models/cart");
const Product = require("../../../models/product");
const jwt = require("jsonwebtoken");

exports.getCart = async (req, res) => {
  try {
    const user = jwt.decode(req.cookies.jwt);
    const userId = await User.findOne({ username: user.username });
    const carts = await Cart.find({ userId: userId._id });
    if (carts.length > 0) {
      const products = await Product.find();
      const cartProductIds = carts[0].products.map(
        (product) => product.productId
      );
      const cartProducts = products.filter((product) =>
        cartProductIds.includes(product._id.toString())
      );

      res.render("cart/cart.ejs", {
        products: cartProducts,
        carts: carts,
        user: user,
      });
    } else {
      let newCart = new Cart({
        userId: userId._id,
        products: [
          {
            productId: "",
            quantity: "",
          },
        ],
      });

      newCart = await newCart.save();

      res.render("cart/cart.ejs", {
        products: "",
        carts: {
          products: [],
        },
        user: "",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
