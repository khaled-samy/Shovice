const Order = require("../../../models/order");
const User = require("../../../models/user");
const Product = require("../../../models/product");

exports.getUsersOrder = async (req, res) => {
  try {
    const orders = (await Order.find().sort()).reverse();

    const ordersData = await Promise.all(
      orders.map(async (order) => {
        const { _id, userId, status, timeSince, products } = order;
        const users = await User.find({ _id: userId });
        const { username } = users[0];
        const totalPricePromise = products.reduce(
          async (totalPromise, product) => {
            const products = await Product.find({ _id: product.productId });
            const productPrice = products[0].price;
            const productTotal = product.quantity * productPrice;
            const total = await totalPromise;
            return total + productTotal;
          },
          Promise.resolve(0)
        );

        const totalPrice = await totalPricePromise;

        return {
          _id,
          username,
          date: timeSince,
          status,
          totalPrice,
        };
      })
    );

    res.render("admin/usersOrder.ejs", { orders: ordersData });
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
};
