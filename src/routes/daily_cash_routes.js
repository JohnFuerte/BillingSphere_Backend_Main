const DailyCashController = require("../controllers/daily_cash_controller");
const express = require('express');
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");


router.post("/create", verifyToken, DailyCashController.createDailyCash);
router.put("/update/:id", verifyToken, DailyCashController.updateDailyCash);
router.get("/get-all", verifyToken, DailyCashController.getAllDailyCashEntries);
router.get("/get-single/:id", verifyToken, DailyCashController.getDailyCashEntryById);
router.delete("/delete/:id", verifyToken, DailyCashController.deleteDailyCashEntry);

module.exports = router;
