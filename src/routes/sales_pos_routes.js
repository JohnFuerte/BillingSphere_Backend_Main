const SalesPosController = require('../controllers/sales_pos_controller');
const express = require('express');
const router = express.Router();

router.post('/create', SalesPosController.createSalesPos);
router.get('/all/:code', SalesPosController.getAllSalesPos);
router.put('/update/:id', SalesPosController.updateSalesPos);
router.delete('/delete/:id', SalesPosController.deleteSalesPos);

module.exports = router;
