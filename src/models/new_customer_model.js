const mongoose = require("mongoose");

const NewCustomerSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: false,
    default: "",
  },
  mname: {
    type: String,
    required: false,
    default: "",
  },
  fullname: {
    type: String,
    required: false,
    default: "",
  },
  sms: {
    type: String,
    required: false,
    default: "",
  },
  customerType: {
    type: String,
    required: false,
    default: "",
  },
  customerId: {
    type: String,
    required: false,
    default: "",
  },
  address: {
    type: String,
    required: false,
    default: "",
  },
  city: {
    type: String,
    required: false,
    default: "",
  },
  aadharCard: {
    type: String,
    required: false,
    default: "",
  },
  email: {
    type: String,
    required: false,
    default: "",
  },
  birthdate: {
    type: String,
    required: false,
    default: "",
  },
  isActive: {
    type: String,
    required: false,
    default: "",
  },
  createdAt: {
    type: String,
    required: false,
    default: new Date(),
  },
  updatedAt: {
    type: String,
    required: false,
    default: new Date(),
  },
});

const NewCustomer = mongoose.model("NewCustomer", NewCustomerSchema);
module.exports = NewCustomer;
