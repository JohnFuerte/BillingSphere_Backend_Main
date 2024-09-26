const InwardChallanModel = require("../models/inward_challan_model");
const ProductStockModel = require("../models/product_stock_model");
const ItemModel = require("../models/items_model");

// For creating a new inward challan
const createInwardChallan = async (req, res) => {
  try {
    const inwardChallan = new InwardChallanModel(req.body);
    for (let entry of req.body.entries) {
      const item = await ItemModel.findById(entry.itemName);
      item.maximumStock -= entry.qty;

      await item.save();
      //   await productStock.save();
    }
    await inwardChallan.save();
    res.status(201).send(inwardChallan);
  } catch (error) {
    res.status(400).send(error);
  }
  // try {
  //   const inwardChallan = new InwardChallanModel(req.body);
  //   for (let entry of req.body.entries) {
  //     let productStock = await ProductStockModel.findOne({
  //       product: entry.itemName,
  //     });
  //     if (productStock) {
  //       productStock.quantity += entry.qty;
  //       productStock.price += entry.rate;
  //       productStock.selling_price += entry.netAmount;
  //     } else {
  //       productStock = new ProductStockModel({
  //         company: req.body.companyCode,
  //         product: entry.itemName,
  //         quantity: entry.qty,
  //         price: entry.rate,
  //         selling_price: entry.netAmount,
  //       });
  //     }

  //     // Get the item from the item model and update the stock
  //     const item = await ItemModel.findById(entry.itemName);
  //     if (item) {
  //       item.maximumStock -= entry.qty;
  //       await item.save();
  //     }
  //     await productStock.save();
  //   }
  //   await inwardChallan.save();
  //   res.status(201).send(inwardChallan);
  // } catch (error) {
  //   res.status(400).send(error);
  // }
};

// For getting all inward challans
const getAllInwardChallans = async (req, res) => {
  try {
    const inwardChallans = await InwardChallanModel.find();
    res.json({ success: true, data: inwardChallans });
  } catch (error) {
    res.status(500).send(error);
  }
};

// For getting a single inward challan
const getInwardChallanByid = async (req, res) => {
  try {
    const inwardChallan = await InwardChallanModel.findById(req.params.id);
    if (inwardChallan) {
      res.json({ success: true, data: inwardChallan });
    } else {
      res.json({ success: false, message: "inwardChallan not found" });

    }
  } catch (ex) {
    res.json({ success: false, message: ex });
  }
};




// For updating a inward challan
const updateInwardChallan = async (req, res) => {
  try {
    const inwardChallan = await InwardChallanModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!inwardChallan) {
      return res.status(404).send("Inward Challan not found");
    }
    res.status(200).send(inwardChallan);
  } catch (error) {
    res.status(500).send(error);
  }
};

// For deleting a inward challan
const deleteInwardChallan = async (req, res) => {
  try {
    const inwardChallan = await InwardChallanModel.findByIdAndDelete(
      req.params.id
    );
    if (!inwardChallan) {
      return res.status(404).send("Inward Challan not found");
    }
    res.status(200).send(inwardChallan);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createInwardChallan,
  getAllInwardChallans,
  getInwardChallanByid,
  updateInwardChallan,
  deleteInwardChallan,
};
