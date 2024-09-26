const StoreLocationController = require("../controllers/store_location_controller");
const StoreLocationRoutes = require("express").Router();
const verifyToken = require("../middleware/verifyToken");

//For Getting all store location
StoreLocationRoutes.get(
  "/fetchAllStore",
  verifyToken,
  StoreLocationController.fetchAllStoreLocaiton
);
//For creating store location
StoreLocationRoutes.post(
  "/createStoreLocation",
  verifyToken,
  StoreLocationController.createStoreLocation
);
//For fetching store location by id
StoreLocationRoutes.get(
  "/:id",
  verifyToken,
  StoreLocationController.fetchStoreLocationById
);

module.exports = StoreLocationRoutes;
