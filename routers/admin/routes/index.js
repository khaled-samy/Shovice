const { adminIndex } = require("./adminIndex");
const { getProducts } = require("./getProducts");
const { addProduct } = require("./addProduct");
const { editProduct } = require("./editProduct");
const { deleteProduct } = require("./deleteProduct");
const { getUsersOrder } = require("./getUsersOrder");
const { getUserOrder } = require("./getUserOrder");
const { updateOrderStatus } = require("./updateOrderStatus");
const { addMessage } = require("./addMessage");

module.exports = {
  adminIndex,
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
  getUsersOrder,
  getUserOrder,
  updateOrderStatus,
  addMessage,
};
