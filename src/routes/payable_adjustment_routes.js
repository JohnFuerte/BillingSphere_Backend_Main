const express = require("express");
const router = express.Router();
const PayableController = require("../controllers/payable_adjustment_controller");
const verifyToken = require("../middleware/verifyToken");

router.get(
  "/:location/:id?",

  PayableController.fetchPayable
);

module.exports = router;


