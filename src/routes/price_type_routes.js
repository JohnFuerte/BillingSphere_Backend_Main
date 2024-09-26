const PriceController = require("../controllers/price_controller");
const PriceTypeRoutes = require("express").Router();
const verifyToken = require("../middleware/verifyToken");

//For Getting all price type
PriceTypeRoutes.get(
  "/fetchAllPriceType/:companyCode",
  verifyToken,
  PriceController.fetchAllPriceType
);
//For creating price type
PriceTypeRoutes.post(
  "/createPrice",
  verifyToken,
  PriceController.createPriceType
);
//For fetching price type by id
PriceTypeRoutes.get("/:id", verifyToken, PriceController.fetchPriceTypeById);

module.exports = PriceTypeRoutes;
