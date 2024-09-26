const NewSalesMan = require("../models/new_sales_man_model");

// Create
const createNewSlesMan = async (req, res) => {
  try {
    const newCustomer = req.body;
    const customer = await NewSalesMan.create(newCustomer);
    return res.json({
      success: true,
      message: "SalesMan Created",
      data: customer,
    });
  } catch (ex) {
    return res.json({ success: false, message: ex.message });
  }
};

// Update
const updateSalesMan = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCustomer = req.body;
    const customer = await NewSalesMan.findByIdAndUpdate(id, updatedCustomer, {
      new: true,
    });
    if (!customer) {
      return res.json({ success: false, message: "SalesMan not found" });
    }
    return res.json({
      success: true,
      message: "SalesMan Updated",
      data: customer,
    });
  } catch (ex) {
    return res.json({ success: false, message: ex.message });
  }
};

// Fetch All
const fetchAllSalesMan = async (req, res) => {
  try {
    const customers = await NewSalesMan.find();
    return res.json({
      success: true,
      message: "SalesMan Fetched",
      data: customers,
    });
  } catch (ex) {
    return res.json({ success: false, message: ex.message });
  }
};

// Fetch Single
const fetchSingleSalesMan = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await NewSalesMan.findById(id);
    if (!customer) {
      return res.json({ success: false, message: "SalesMan not found" });
    }
    return res.json({
      success: true,
      message: "SalesMan Fetched",
      data: customer,
    });
  } catch (ex) {
    return res.json({ success: false, message: ex.message });
  }
};

// Delete
const deleteSalesMan = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await NewSalesMan.findByIdAndDelete(id);
    if (!customer) {
      return res.json({ success: false, message: "SalesMan not found" });
    }
    return res.json({
      success: true,
      message: "SalesMan Deleted",
      data: customer,
    });
  } catch (ex) {
    return res.json({ success: false, message: ex.message });
  }
};

module.exports = {
  createNewSlesMan,
  updateSalesMan,
  fetchAllSalesMan,
  fetchSingleSalesMan,
  deleteSalesMan,
};
