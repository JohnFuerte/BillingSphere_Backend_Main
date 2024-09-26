const Receipt = require("../models/receipt_model");

//For Creating Receipt
const createReceipt = async (req, res) => {
  try {
    const receipt = await Receipt.create(req.body);
    return res.json({
      success: true,
      message: "Receipt Created",
      data: receipt,
    });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

//For updating Receipt
const updateReceipt = async (req, res) => {
  try {
    const receipt = await Receipt.updateOne({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!receipt) {
      return res.json({ success: false, message: "Receipt not found" });
    }

    return res.json({ success: true, data: receipt });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

//For Deleting Receipt
const deleteReceipt = async (req, res) => {
  try {
    const receipt = await Receipt.deleteOne({ _id: req.params.id });
    if (!receipt) {
      return res.json({ success: false, message: "Receipt not found" });
    }

    return res.json({
      success: true,
      message: "Receipt Deleted Successfully!",
    });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

// Get all Receipt
const getAllReceipt = async (req, res) => {
  try {
    const receipt = await Receipt.find({});
    return res.json({ success: true, data: receipt });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

// Get Single Receipt by Id
const getSingleReceipt = async (req, res) => {
  try {
    const receipt = await Receipt.findOne({ _id: req.params.id });
    if (!receipt) {
      return res.json({ success: false, message: "Ledger not found" });
    }
    return res.json({ success: true, data: receipt });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

module.exports = {
  createReceipt,
  updateReceipt,
  deleteReceipt,
  getAllReceipt,
  getSingleReceipt,
};


