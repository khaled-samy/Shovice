const User = require("../../../models/user");
const Cart = require("../../../models/cart");
const Product = require("../../../models/product");
const Order = require("../../../models/order");

exports.adminIndex = async (req, res) => {
  const users = await User.find({});
  const carts = await Cart.find({});
  const products = await Product.find({});
  const orders = await Order.find({});

  const laptops = await Product.find({ category: "laptop" });
  const phones = await Product.find({ category: "phone" });
  const screens = await Product.find({ category: "screen" });
  try {
    res.render("admin", {
      users: users.length,
      carts: carts.length,
      products: products.length,
      orders: orders.length,
      laptops: laptops.length,
      phones: phones.length,
      screens: screens.length,
    });
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
};
