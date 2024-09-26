const SundryController = require("../controllers/sundry_controller.js");
const verifyToken = require("../middleware/verifyToken");

const SundryRoutes = require("express").Router();
SundryRoutes.get(
  "/fetchAllSundry",
  verifyToken,
  SundryController.fetchAllSundryType
);
SundryRoutes.post("/createSundry", verifyToken, SundryController.createSundry);
SundryRoutes.get("/get/:id", verifyToken, SundryController.fetchSundryById);

module.exports = SundryRoutes;
