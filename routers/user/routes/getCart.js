const User = require("../../../models/user");
const Cart = require("../../../models/cart");
const Product = require("../../../models/product");
const jwt = require("jsonwebtoken");

exports.getCart = async (req, res) => {
  try {
    const user = jwt.decode(req.cookies.jwt);
    const userId = await User.findOne({ username: user.username });
    const carts = await Cart.find({ userId: userId._id });
    console.log(1111111, carts[0].products);
    const products = await Product.find();
    // const cartProducts = await carts.map((cart) => {
    const cartProductIds = carts[0].products.map(
      (product) => product.productId
    );
    const cartProducts = products.filter((product) =>
      cartProductIds.includes(product._id.toString())
    );
    // return {
    //   userId: cart.userId,
    //   products: cartProducts,
    // };
    // });

    // let cartsArray = [];
    // for (i = 0; i < carts.length; i++) {
    //   cartsArray.push(carts[i].products);
    // }
    // let productsArray = [];
    // for (i = 0; i < cartProducts.length; i++) {
    //   productsArray.push(cartProducts[i].products);

    res.render("cart/cart.ejs", {
      products: cartProducts,
      carts: carts,
      user: user,
    });

    // const user = jwt.decode(req.cookies.jwt);
    // const userId = await User.findOne({ username: user.username });
    // const carts = await Cart.find({ userId: userId._id });
    // console.log(carts);
    // let productsArray = [];
    // carts.forEach(async (cart) => {
    //   const ids = cart.products[0].productId;
    //   if (userId._id == cart.userId) {
    //     const products = await Product.find({ _id: ids });
    //     products.forEach((product) => {
    //       productsArray.push(product); // push each product into the array
    //     });
    //     console.log(55555555, productsArray);
    //     res.render("cart/cart.ejs", { products: productsArray });
    //   } else {
    //     console.log("no product");
    //   }
    // });
  } catch (err) {
    res.status(500).json(err);
  }
};
