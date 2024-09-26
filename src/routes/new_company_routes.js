const NewCompanyController = require("../controllers/new_company_controller");
const multer = require("multer");
const upload = multer();
const express = require("express");
const router = express.Router();

router.post("/create", upload.fields([{ name: 'logo1' }, { name: 'logo2' }]), NewCompanyController.createNewCompany);
router.put("/update/:id", upload.fields([{ name: 'logo1' }, { name: 'logo2' }]), NewCompanyController.updateNewCompany);
router.delete("/delete/:id", NewCompanyController.deleteNewCompany);
router.get("/all", NewCompanyController.getAllCompany);
router.get("/get/:id", NewCompanyController.getSingleCompany);

module.exports = router;
