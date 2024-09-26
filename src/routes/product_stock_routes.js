const ProductStockController = require('../controllers/product_stock_controller');
const verifyToken = require("../middleware/verifyToken");

const ProductStockRoutes = require('express').Router();
ProductStockRoutes.get('/fetchAll',verifyToken, ProductStockController.fecthAllProductStock);
ProductStockRoutes.post('/create',verifyToken, ProductStockController.createProductStock);

module.exports = ProductStockRoutes;
