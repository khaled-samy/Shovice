const jwt = require("jsonwebtoken");
const { User, Product, Cart } = require("../../../models");

exports.updateCart = async (req, res) => {
  const user = jwt.decode(req.cookies.jwt);
  const loggedUser = await User.findOne({ username: user.username });
  const userId = loggedUser._id;
  const { quantity } = req.body;

  const { productId } = req.params;
  const action = req.body.plus ? "plus" : req.body.minus ? "minus" : null;

  let cart = await Cart.find({ userId: userId });
  let product = await Product.find({ _id: productId });

  if (action === "plus") {
    try {
      if (product[0].availability > 0) {
        const updatedCart = await Cart.findOneAndUpdate(
          {
            userId: userId,
            "products.productId": productId,
          },
          { $inc: { "products.$.quantity": 1 } },
          { new: true }
        );
        product[0].availability -= 1;
        product[0] = await product[0].save();
        res.redirect("/user/cart");
      } else {
        res.json("No available for this product!");
      }
    } catch (err) {
      console.log(err);
      res.render("error/500");
    }
  } else if (action === "minus") {
    try {
      if (quantity > 1) {
        const updatedCart = await Cart.findOneAndUpdate(
          {
            userId: userId,
            "products.productId": productId,
          },
          { $inc: { "products.$.quantity": -1 } },
          { new: true }
        );
        product[0].availability += 1;
        product[0] = await product[0].save();
        res.redirect("/user/cart");
      } else {
        product[0].availability += 1;
        product[0] = await product[0].save();
        cart[0].products.splice(productId, 1);
        cart = await cart[0].save();
        res.redirect("/user/cart");
      }
    } catch (err) {
      console.log(err);
      res.render("error/500");
    }
  } else {
    res.status(400).send("Invalid action");
  }
};
