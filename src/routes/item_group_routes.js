const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const ItemsGroupController = require("../controllers/item_group_controller"); // Update the path as needed
const verifyToken = require("../middleware/verifyToken");

// Create an item group
router.post(
  "/create",
  upload.single("image"),
  verifyToken,
  ItemsGroupController.createItemGroup
);

// Get all item groups
router.get("/get", ItemsGroupController.getItemGroups);

// Get a specific item group by ID
router.get(
  "/get/:itemGroupId",
  verifyToken,
  ItemsGroupController.getItemGroupById
);

// Update a specific item group by ID
router.put(
  "/update/:itemGroupId",
  verifyToken,
  ItemsGroupController.updateItemGroup
);

// Delete a specific item group by ID
router.delete(
  "/delete/:itemGroupId",
  verifyToken,
  ItemsGroupController.deleteItemGroup
);

module.exports = router;
