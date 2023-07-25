const jwt = require("jsonwebtoken");
const { User, Product, Cart } = require("../../../models");

exports.addCart = async (req, res) => {
  try {
    const quantity = 1;
    const productId = req.params.productId;
    const user = jwt.decode(req.cookies.jwt);
    const loggedUser = await User.findOne({ username: user.username });
    const userId = loggedUser.id;
    let myProduct = await Product.findOne({ _id: productId });
    const { availability } = myProduct;
    if (availability) {
      let cart = await Cart.findOne({ userId: userId });
      if (cart) {
        const productIndex = cart.products.findIndex(
          (item) => item.productId == productId
        );
        if (productIndex > -1) {
          cart.products[productIndex].quantity += quantity;
          myProduct.availability -= 1;
          myProduct = await myProduct.save();
          cart = await cart.save();
          res.redirect("../");
        } else {
          cart.products.push({ productId: productId, quantity: quantity });
          myProduct.availability -= 1;
          myProduct = await myProduct.save();
          cart = await cart.save();
          res.redirect("/");
        }
      } else {
        let newCart = new Cart({
          userId: userId,
          products: [
            {
              productId: productId,
              quantity: quantity,
            },
          ],
        });

        myProduct.availability -= 1;
        myProduct = await myProduct.save();
        newCart = await newCart.save();
        res.redirect("/");
      }
    } else {
      res.json("No availability of this product!");
    }
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
};
