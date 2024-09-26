const express = require("express");
const router = express.Router();
const ReceiptVoucherController = require("../controllers/receipt_voucher_controller");
const verifyToken = require("../middleware/verifyToken");

// Create a new receipt voucher
router.post("/create", verifyToken, ReceiptVoucherController.createReceiptVoucher);

// Get all receipt voucher
router.get("/receipt", verifyToken, ReceiptVoucherController.getReceiptVoucher);

// Get a receipt voucher by ID
router.get("/receipt/:id", verifyToken, ReceiptVoucherController.getReceiptVoucherById);

// Update a receipt voucher
router.put("/update/:id", verifyToken, ReceiptVoucherController.updateReceiptVoucher);

// Delete a receipt voucher
router.delete("/delete/:id", verifyToken, ReceiptVoucherController.deleteReceiptVoucher);

module.exports = router;