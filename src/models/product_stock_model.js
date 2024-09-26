const mongoose = require("mongoose");
const productStockSchema = new mongoose.Schema({
  company: {
    type: String,
    ref: "Company",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Items",
    required: true,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
    default: 0.0,
  },
  selling_price: {
    type: Number,
    default: 0.0,
  },
  isActive: {
    type: String,
    default: "Yes",
  },
});

const ProductStockModel = mongoose.model("ProductStock", productStockSchema);
module.exports = ProductStockModel;
