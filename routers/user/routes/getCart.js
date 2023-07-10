const jwt = require("jsonwebtoken");
const countryOptions = require("../../../services/utils/getCountryOptions");
const { User, Product, Cart } = require("../../../models");

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

      res.render("user/cart.ejs", {
        products: cartProducts,
        carts: carts,
        user: user,
        countryOptions,
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

      res.render("user/cart.ejs", {
        products: "",
        carts: {
          products: [],
        },
        user: "",
        countryOptions,
      });
    }
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
};
