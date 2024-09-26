const NewCustomerController = require("../controllers/new_customers_controller");
const express = require("express");
const router = express.Router();

// Route to create a new customer
router.post("/create", NewCustomerController.createNewCustomer);

// Route to update an existing customer
router.put("/update/:id", NewCustomerController.updateCustomer);

// Route to delete a customer by ID
router.delete("/delete/:id", NewCustomerController.deleteCustomer);

// Route to fetch all customers
router.get("/all", NewCustomerController.fetchAllCustomers);

// Route to fetch a single customer by ID
router.get("/get/:id", NewCustomerController.fetchSingleCustomer);

module.exports = router;
