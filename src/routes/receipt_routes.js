const ReceiptRoutes = require("express").Router();
const ReceiptController = require("../controllers/receipt_controller");
const verifyToken = require("../middleware/verifyToken");

ReceiptRoutes.post(
  "/create-receipt",
  verifyToken,
  ReceiptController.createReceipt
);
ReceiptRoutes.patch(
  "/update-receipt/:id",
  verifyToken,
  ReceiptController.updateReceipt
);
ReceiptRoutes.delete(
  "/delete-receipt/:id",
  verifyToken,
  ReceiptController.deleteReceipt
);
ReceiptRoutes.get(
  "/get-all-receipt",
  verifyToken,
  ReceiptController.getAllReceipt
);
ReceiptRoutes.get(
  "/get-single-receipt/:id",
  verifyToken,
  ReceiptController.getSingleReceipt
);

module.exports = ReceiptRoutes;
