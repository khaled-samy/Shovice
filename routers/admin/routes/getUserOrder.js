const { User, Product, Order } = require("../../../models");

exports.getUserOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId)
      .populate("userId")
      .populate("products.productId");

    let orderProducts = [];

    const { _id, userId, status, name, city, timeSince, createdAt } = order;
    const user = await User.findById(userId);
    const { username, email } = user;
    for (let i = 0; i < order.products.length; i++) {
      const { productId, quantity } = order.products[i];
      const product = await Product.find({ _id: productId });
      product.push({ quantity: quantity });
      orderProducts.push(product);
    }

    res.render("admin/order/userOrder.ejs", {
      name,
      orderId: _id,
      timeSince,
      createdAt,
      status,
      username,
      city,
      email,
      orderProducts,
    });
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
};
