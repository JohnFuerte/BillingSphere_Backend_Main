const SalesPos = require("../models/sales_pos_model");
const Items = require("../models/items_model");

//For Creating Sales
const createSalesPos = async (req, res) => {
  try {
    const salesData = req.body;
    const entries = salesData.entries;

    console.log("Entries", entries);

    salesData.totalAmount = parseFloat(salesData.totalAmount);
    const newsalesData = SalesPos(salesData);

    // Iterating through the entries
    for (let i = 0; i < entries.length; i++) {
      console.log("Entries ID", entries[i].itemName);
      console.log("Entries Qty", entries[i].qty);

      const item = await Items.findById(entries[i].itemName);
      console.log("Item", item);

      const itemQty = item.maximumStock;
      const salesQty = entries[i].qty;
      const newQty = itemQty - salesQty;

      // Updating the quantity of the item
      await Items.findByIdAndUpdate(entries[i].itemName, {
        maximumStock: newQty,
      });
    }

    const salesEntry = await SalesPos.create(newsalesData);

    return res.json({
      success: true,
      message: "Sales created successfully.",
      data: salesEntry,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//For Getting All Sales
const getAllSalesPos = async (req, res) => {
  try {
    const salesCode = req.params.code;
    const sales = await SalesPos.find({ companyCode: salesCode });

    return res.json({
      success: true,
      data: sales,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//For Updating Sales
const updateSalesPos = async (req, res) => {
  try {
    const salesId = req.params.id;
    const salesData = req.body;
    const entries = salesData.entries;
    salesData.totalAmount = parseFloat(salesData.totalAmount);
    const previousSales = await SalesPos.findById(salesId);
    const previousEntries = previousSales.entries;

    // Iterating through the entries and add the entries to the maximum stock
    for (let i = 0; i < previousEntries.length; i++) {
      const item = await Items.findById(entries[i].itemName);
      const itemQty = item.maximumStock;
      const salesQty = entries[i].qty;
      const newQty = itemQty + salesQty;

      // Updating the quantity of the item
      await Items.findByIdAndUpdate(entries[i].itemName, {
        maximumStock: newQty,
      });
    }

    // Iterating through the entries and subtract the entries from the maximum stock
    for (let i = 0; i < entries.length; i++) {
      const item = await Items.findById(entries[i].itemName);
      const itemQty = item.maximumStock;
      const salesQty = entries[i].qty;
      const newQty = itemQty - salesQty;

      // Updating the quantity of the item
      await Items.findByIdAndUpdate(entries[i].itemName, {
        maximumStock: newQty,
      });
    }

    const sales = await SalesPos.findByIdAndUpdate(salesId, salesData, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//For Deleting Sales
const deleteSalesPos = async (req, res) => {
  try {
    const salesId = req.params.id;
    const sales = await SalesPos.findByIdAndDelete(salesId);

    return res.json({
      success: true,
      message: "Sales deleted successfully.",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//Exporting the functions
module.exports = {
  createSalesPos,
  getAllSalesPos,
  updateSalesPos,
  deleteSalesPos,
};
