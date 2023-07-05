const jwt = require("jsonwebtoken");
const User = require("../../../models/user");
const Cart = require("../../../models/cart");
const Order = require("../../../models/order");

exports.addOrder = async (req, res) => {
  try {
    const { city, name } = req.body;
    const user = jwt.decode(req.cookies.jwt);
    const loggedUser = await User.findOne({ username: user.username });
    const userId = loggedUser.id;
    const cart = await Cart.findOne({ userId: userId });
    let products = [];

    if (cart.products.length > 0) {
      products = cart.products;

      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const { productId, quantity } = product;

        const existingOrder = await Order.findOne({ userId: userId });

        if (existingOrder) {
          const updatedProducts = [...existingOrder.products];
          const existingProductIndex = updatedProducts.findIndex(
            (product) => product.productId === productId
          );

          if (existingProductIndex !== -1) {
            updatedProducts[existingProductIndex].quantity += quantity;
          } else {
            updatedProducts.push({
              productId: productId,
              quantity: quantity,
            });
          }

          existingOrder.products = updatedProducts;
          existingOrder.info = [
            {
              name: name,
              city: city,
            },
          ];

          await existingOrder.save();
        } else {
          const order = new Order({
            userId: userId,
            products: [
              {
                productId: productId,
                quantity: quantity,
              },
            ],
            info: [
              {
                name: name,
                city: city,
              },
            ],
          });

          await order.save();
        }
      }

      cart.products = [];
      await cart.save();
      res.redirect("/user/cart");
    }
  } catch (err) {
    console.log(err);
  }
};
