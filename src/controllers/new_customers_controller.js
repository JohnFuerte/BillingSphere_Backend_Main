const NewCustomers = require("../models/new_customer_model");

// Create
const createNewCustomer = async (req, res) => {
  try {
    const newCustomer = req.body;
    const customer = await NewCustomers.create(newCustomer);
    return res.json({
      success: true,
      message: "Customer Created",
      data: customer,
    });
  } catch (ex) {
    return res.json({ success: false, message: ex.message });
  }
};

// Update
const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCustomer = req.body;
    const customer = await NewCustomers.findByIdAndUpdate(id, updatedCustomer, {
      new: true,
    });
    if (!customer) {
      return res.json({ success: false, message: "Customer not found" });
    }
    return res.json({
      success: true,
      message: "Customer Updated",
      data: customer,
    });
  } catch (ex) {
    return res.json({ success: false, message: ex.message });
  }
};

// Fetch All
const fetchAllCustomers = async (req, res) => {
  try {
    const customers = await NewCustomers.find();
    return res.json({
      success: true,
      message: "Customers Fetched",
      data: customers,
    });
  } catch (ex) {
    return res.json({ success: false, message: ex.message });
  }
};

// Fetch Single
const fetchSingleCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await NewCustomers.findById(id);
    if (!customer) {
      return res.json({ success: false, message: "Customer not found" });
    }
    return res.json({
      success: true,
      message: "Customer Fetched",
      data: customer,
    });
  } catch (ex) {
    return res.json({ success: false, message: ex.message });
  }
};

// Delete
const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await NewCustomers.findByIdAndDelete(id);
    if (!customer) {
      return res.json({ success: false, message: "Customer not found" });
    }
    return res.json({
      success: true,
      message: "Customer Deleted",
      data: customer,
    });
  } catch (ex) {
    return res.json({ success: false, message: ex.message });
  }
};

module.exports = {
  createNewCustomer,
  updateCustomer,
  fetchAllCustomers,
  fetchSingleCustomer,
  deleteCustomer,
};
