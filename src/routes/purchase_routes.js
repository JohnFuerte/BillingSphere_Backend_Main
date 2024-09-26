const PurchaseController = require("../controllers/purchase_controller");
const PurchaseRoutes = require("express").Router();
const verifyToken = require("../middleware/verifyToken");

//For getting all purchase entry
PurchaseRoutes.get(
  "/fetchAll/:companyCode",
  verifyToken,
  PurchaseController.fetchAllPurchase
);

PurchaseRoutes.get("/get-all", verifyToken, PurchaseController.getAllpurchase);

PurchaseRoutes.post("/create", verifyToken, PurchaseController.createPurchase);
PurchaseRoutes.get(
  "/get/:id",
  verifyToken,
  PurchaseController.fetchPurchseById
);
PurchaseRoutes.get(
  "/getByBillNumber/:billNumber",
  // verifyToken,
  PurchaseController.fetchPurchaseByBillNumber
);
PurchaseRoutes.delete(
  "/delete/:id",
  // verifyToken,
  PurchaseController.deletePurchaseById
);
// updating purchase entry
PurchaseRoutes.put(
  "/update/:id",
  verifyToken,
  PurchaseController.updatePurchase
);

module.exports = PurchaseRoutes;
