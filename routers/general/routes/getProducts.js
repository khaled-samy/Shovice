const jwt = require("jsonwebtoken");
const { User, Product, Cart, Order, Message } = require("../../../models");

exports.getProducts = async (req, res) => {
  try {
    const orders = await Order.find();
    let productCount = {};
    let userProductCount = {};

    orders.forEach((order) => {
      order.products.forEach((product) => {
        const { productId, quantity } = product;
        if (productCount[productId]) {
          productCount[productId] += quantity;
        } else {
          productCount[productId] = quantity;
        }

        const { userId } = order;
        if (!userProductCount[userId]) {
          userProductCount[userId] = 0;
        }
        userProductCount[userId] += quantity;
      });
    });

    const sortedProducts = Object.keys(productCount).sort(
      (a, b) => productCount[b] - productCount[a]
    );

    const mostOrderedProducts = sortedProducts.slice(0, 3);

    const sortedUsers = Object.keys(userProductCount).sort(
      (a, b) => userProductCount[b] - userProductCount[a]
    );

    const mostOrderedUsers = sortedUsers.slice(0, 5);

    const topProducts = await Product.find({
      _id: { $in: mostOrderedProducts },
    });

    const userPromises = mostOrderedUsers.map((userId) => {
      return User.findById(userId);
    });

    const topUsers = await Promise.all(userPromises);

    const products = (await Product.find().sort()).reverse();
    const newProducts = products.slice(0, 3);
    if (req.cookies.jwt) {
      const user = jwt.decode(req.cookies.jwt);
      const loggedUser = await User.findOne({ username: user.username });
      const messages = await Message.find();
      const carts = await Cart.find({ userId: loggedUser._id });
      if (carts) {
        res.render("index.ejs", {
          category: false,
          user: loggedUser,
          topUsers: topUsers,
          products: products,
          newProducts: newProducts,
          topProducts: topProducts,
          cart: carts,
          messages: messages,
        });
      } else {
        res.render("index.ejs", {
          category: false,
          user: loggedUser,
          topUsers: topUsers,
          products: products,
          newProducts: newProducts,
          topProducts: topProducts,
          cart: "",
          messages: messages,
        });
      }
    }
    res.render("index.ejs", {
      category: false,
      user: "",
      topUsers: topUsers,
      products: products,
      newProducts: newProducts,
      topProducts: topProducts,
      messages: "",
    });
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
};
