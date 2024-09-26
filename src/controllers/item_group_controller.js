const ItemsGroup = require("../models/item_group_model");

const createItemGroup = async (req, res) => {
  try {
    const newItemData = req.body;

    // Handle image data if present
    if (newItemData.images && newItemData.images.length > 0) {
      newItemData.images = newItemData.images.map((image) => ({
        data: Buffer.from(image.data, "base64"),
        contentType: image.contentType,
        filename: image.filename,
      }));
    }

    const newItem = await ItemsGroup.create(newItemData);
    res.json({ success: true, data: newItem });
  } catch (ex) {
    res.json({ success: false, message: ex });
  }
};

const getItemGroups = async (req, res) => {
  try {
    const allItemGroups = await ItemsGroup.find();
    res.json({ success: true, data: allItemGroups });
  } catch (ex) {
    res.json({ success: false, message: ex });
  }
};

const getItemGroupById = async (req, res) => {
  try {
    const itemGroup = await ItemsGroup.findById(req.params.itemGroupId);
    if (itemGroup) {
      res.json({ success: true, data: itemGroup });
    } else {
      res.json({ success: false, message: "Item group not found" });
    }
  } catch (ex) {
    res.json({ success: false, message: ex });
  }
};

const updateItemGroup = async (req, res) => {
  try {

    if (req.body.images && req.body.images.length > 0) {
      req.body.images = req.body.images.map((image) => ({
        data: Buffer.from(image.data, "base64"),
        contentType: image.contentType,
        filename: image.filename,
      }));
    }
    const updatedItemGroup = await ItemsGroup.findByIdAndUpdate(
      req.params.itemGroupId,
      req.body,
      { new: true }
    );
    if (updatedItemGroup) {
      res.json({ success: true, data: updatedItemGroup });
    } else {
      res.json({ success: false, message: "Item group not found" });
    }
  } catch (ex) {
    res.json({ success: false, message: ex });
  }
};

const deleteItemGroup = async (req, res) => {
  try {
    const deletedItemGroup = await ItemsGroup.findByIdAndDelete(
      req.params.itemGroupId
    );
    if (deletedItemGroup) {
      res.json({ success: true, data: deletedItemGroup });
    } else {
      res.json({ success: false, message: "Item group not found" });
    }
  } catch (ex) {
    res.json({ success: false, message: ex });
  }
};

module.exports = {
  createItemGroup,
  getItemGroups,
  getItemGroupById,
  updateItemGroup,
  deleteItemGroup,
};


