const BarcodePrintRoutes = require("express").Router();
const BarcodePrintController = require("../controllers/barcode_print_controller");
const verifyToken = require("../middleware/verifyToken");

BarcodePrintRoutes.post(
  "/create-barcode-print",
  // verifyToken,
  BarcodePrintController.createBarcodePrint
);

BarcodePrintRoutes.post(
  "/create-barcode-image/:barcodeValue/:numBarcodes",
  BarcodePrintController.createBarcodeImage
);

// Get barcode by id
BarcodePrintRoutes.get(
  "/get-barcode/:id",
  // verifyToken,
  BarcodePrintController.getBarcodePrintById
);

module.exports = BarcodePrintRoutes;
