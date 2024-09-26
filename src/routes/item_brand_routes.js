const express = require("express");
const router = express.Router();
const ItemsBrandController = require("../controllers/item_brand_controller"); // Update the path as needed
const verifyToken = require("../middleware/verifyToken");

// Create an item group
router.post("/create", ItemsBrandController.createItemGroup);

// Get all item groups
router.get("/get", verifyToken, ItemsBrandController.getItemGroups);

// Get a specific item group by ID
router.get(
  "/get/:itemGroupId",
  ItemsBrandController.getItemGroupById
);

// Update a specific item group by ID
router.put(
  "/update/:itemGroupId",
  // verifyToken,
  ItemsBrandController.updateItemGroup
);

// Delete a specific item group by ID
router.delete(
  "/delete/:itemGroupId",
  verifyToken,
  ItemsBrandController.deleteItemGroup
);

module.exports = router;
