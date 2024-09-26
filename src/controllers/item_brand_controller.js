const mongoose = require("mongoose");
const ItemsBrand = require("../models/item_brand_model");

const createItemGroup = async (req, res) => {
  try {
    const newItemData = req.body;

    if (newItemData.images && newItemData.images.length > 0) {
      newItemData.images = newItemData.images.map((image) => ({
        data: Buffer.from(image.data, "base64"),
        contentType: image.contentType,
        filename: image.filename,
      }));
    }

    const newItemGroup = await ItemsBrand.create(newItemData);

    res.json({ success: true, data: newItemGroup });
  } catch (ex) {
    res.json({ success: false, message: ex.message });
  }
};

const getItemGroups = async (req, res) => {
  try {
    const allItemGroups = await ItemsBrand.find();
    res.json({ success: true, data: allItemGroups });
  } catch (ex) {
    res.json({ success: false, message: ex.message });
  }
};

const getItemGroupById = async (req, res) => {
  try {
    const itemGroup = await ItemsBrand.findById(req.params.itemGroupId);
    if (itemGroup) {
      res.json({ success: true, data: itemGroup });
    } else {
      res.json({ success: false, message: "Item group not found" });
    }
  } catch (ex) {
    res.json({ success: false, message: ex.message });
  }
};

const updateItemGroup = async (req, res) => {
  try {
    // Take care of image data
    if (req.body.images && req.body.images.length > 0) {
      req.body.images = req.body.images.map((image) => ({
        data: Buffer.from(image.data, "base64"),
        contentType: image.contentType,
        filename: image.filename,
      }));
    }

    const updatedItemGroup = await ItemsBrand.findByIdAndUpdate(
      req.params.itemGroupId,
      req.body,
      { new: true }
    );

    if (updatedItemGroup) {
      res.json({ success: true, data: updatedItemGroup });
    } else {
      res.status(404).json({ success: false, message: "Item group not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const deleteItemGroup = async (req, res) => {
  try {
    const deletedItemGroup = await ItemsBrand.findByIdAndDelete(
      req.params.itemGroupId
    );
    if (deletedItemGroup) {
      res.json({ success: true, data: deletedItemGroup });
    } else {
      res.json({ success: false, message: "Item group not found" });
    }
  } catch (ex) {
    res.json({ success: false, message: ex.message });
  }
};

module.exports = {
  createItemGroup,
  getItemGroups,
  getItemGroupById,
  updateItemGroup,
  deleteItemGroup,
};
