const ProductCategoryController = require("../controllers/product_category_controller");
const ProductCategoryRoutes = require("express").Router();
const verifyToken = require("../middleware/verifyToken");

//For getting all product category
ProductCategoryRoutes.get(
  "/fetchAllProductCategory",
  verifyToken,
  ProductCategoryController.fetchAllProductCategory
);
//For creating product category
ProductCategoryRoutes.post(
  "/createProductCategory",
  verifyToken,
  ProductCategoryController.createProductCategory
);
//For fetching product category by id
ProductCategoryRoutes.get(
  "/:id",
  verifyToken,
  ProductCategoryController.fetchProductCategoryById
);
module.exports = ProductCategoryRoutes;
