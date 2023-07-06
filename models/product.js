const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["laptop", "phone", "screen"],
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  size: {
    type: String,
  },
  color: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  availability: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", productsSchema);
