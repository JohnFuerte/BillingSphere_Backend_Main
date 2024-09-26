const mongoose = require("mongoose");

const NewSalesManSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ledger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ledger",
    required: true,
  },
  postInAc: {
    type: String,
    required: false,
    default: "",
  },
  fixedCommision: {
    type: Number,
    required: false,
    default: 0,
  },
  address: {
    type: String,
    required: false,
    default: "",
  },
  mobile: {
    type: String,
    required: false,
    default: "",
  },
  email: {
    type: String,
    required: false,
    default: "",
  },
  isActive: {
    type: String,
    required: false,
    default: "",
  },
});

module.exports = mongoose.model("SalesMan", NewSalesManSchema);
