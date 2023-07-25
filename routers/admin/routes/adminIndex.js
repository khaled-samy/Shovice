const { User, Product, Cart, Order } = require("../../../models");

exports.adminIndex = async (req, res) => {
  const users = await User.find({});
  const carts = await Cart.find({});
  const products = await Product.find({});
  const orders = await Order.find({});

  let categoryCounts = {
    laptop: 0,
    phone: 0,
    screen: 0,
  };

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    const orderProducts = order.products;

    for (let j = 0; j < orderProducts.length; j++) {
      const productId = orderProducts[j].productId;
      const product = await Product.findById(productId);

      if (product) {
        const category = product.category;

        if (category === "laptop") {
          categoryCounts.laptop += 1;
        } else if (category === "phone") {
          categoryCounts.phone += 1;
        } else if (category === "screen") {
          categoryCounts.screen += 1;
        }
      }
    }
  }

  try {
    res.render("admin", {
      users: users.length,
      carts: carts.length,
      products: products.length,
      orders: orders.length,
      laptops: categoryCounts.laptop,
      phones: categoryCounts.phone,
      screens: categoryCounts.screen,
    });
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
};
