const LedgerRoutes = require("express").Router();
const LedgerController = require("../controllers/ledger_controller");
const verifyToken = require("../middleware/verifyToken");
const restrictAccessByUserType = require("../middleware/restriction");

LedgerRoutes.post(
  "/create-ledger",
  verifyToken,
  // restrictAccessByUserType(["Admin", "Manager"]),
  LedgerController.createLedger
);
LedgerRoutes.patch(
  "/update-ledger/:id",
  verifyToken,
  // restrictAccessByUserType,
  LedgerController.updateLedger
);
LedgerRoutes.delete(
  "/delete-ledger/:id",
  verifyToken,
  LedgerController.deleteLedger
);
LedgerRoutes.get(
  "/get-all-ledger/:companyCode",
  verifyToken,
  LedgerController.getAllLedger
);
LedgerRoutes.get(
  "/get-single-ledger/:id",
  verifyToken,
  LedgerController.getSingleLedger
);

module.exports = LedgerRoutes;
