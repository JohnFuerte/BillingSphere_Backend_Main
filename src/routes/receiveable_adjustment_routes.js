const express = require("express");
const router = express.Router();
const ReceiveableController = require("../controllers/receiveable_adjustment_controller");
const verifyToken = require("../middleware/verifyToken");

router.get(
  "/:location/:id?",

  ReceiveableController.fetchReceivable
);

module.exports = router;


