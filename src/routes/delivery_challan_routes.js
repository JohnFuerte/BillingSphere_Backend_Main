const deliveryChallanController = require("../controllers/delivery_challan_controller");
const express = require("express");
const router = express.Router();

router.post("/create", deliveryChallanController.createDeliveryChallan);
router.get("/fetch", deliveryChallanController.getAllDeliveryChallans);
router.get("/fetch/:id", deliveryChallanController.getDeliveryChallanById);
router.patch("/update/:id", deliveryChallanController.updateDeliveryChallan);
router.delete(
  "/delete/:id",
  deliveryChallanController.deleteDeliveryChallan
);

module.exports = router;
