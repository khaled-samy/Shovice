const Order = require("../../../models/order");

exports.updateOrderStatus = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.redirect("/api/admin/users-order");
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
};
