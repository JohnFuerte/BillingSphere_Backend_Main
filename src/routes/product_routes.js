const ProductController = require("../controllers/product_controller");

const ProductRoutes = require("express").Router();
const verifyToken = require("../middleware/verifyToken");

//For Getting all products
ProductRoutes.get(
  "/fetchAllProducts",
  verifyToken,
  ProductController.fetchAllProduct
);
//For creating product
ProductRoutes.post(
  "/createProduct",
  verifyToken,
  ProductController.createProduct
);
//For fetching product by id
ProductRoutes.get("/:id", verifyToken, ProductController.fetchProductById);

module.exports = ProductRoutes;
