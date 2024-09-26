
const TaxController = require('../controllers/tax_controller');
const TaxRoutes = require('express').Router();
const verifyToken = require("../middleware/verifyToken");

//For Getting all tax category
TaxRoutes.get("/fetchAllTax",verifyToken,TaxController.fetchAllTaxCategory);
//For creating tax 
TaxRoutes.post("/createTax",verifyToken,TaxController.createTaxCategory);
//For fetching tax by id
TaxRoutes.get("/:id",verifyToken,TaxController.fetchTaxCategoryById);

module.exports =  TaxRoutes;