const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/payment_controller");
const verifyToken = require("../middleware/verifyToken");

// Create a new payment
router.post("/create", verifyToken, PaymentController.createPayment);

// Get all payments
router.get("/payments", verifyToken, PaymentController.getPayments);

// Get a payment by ID
router.get("/payments/:id", verifyToken, PaymentController.getPaymentById);

// Update a payment
router.put("/update/:id", verifyToken, PaymentController.updatePayment);

// Delete a payment
router.delete("/delete/:id", verifyToken, PaymentController.deletePayment);

module.exports = router;
