const NewSalesManController = require("../controllers/new_sales_man_controller");
const express = require("express");
const router = express.Router();

// Route to create a new customer
router.post("/create", NewSalesManController.createNewSlesMan);

// Route to update an existing customer
router.put("/update/:id", NewSalesManController.updateSalesMan);

// Route to delete a customer by ID
router.delete("/delete/:id", NewSalesManController.deleteSalesMan);

// Route to fetch all customers
router.get("/all", NewSalesManController.fetchAllSalesMan);

// Route to fetch a single customer by ID
router.get("/get/:id", NewSalesManController.fetchSingleSalesMan);

module.exports = router;