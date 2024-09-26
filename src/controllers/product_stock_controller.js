const ProductStockModel = require("../models/product_stock_model");

const ProductStockController = {
  createProductStock: async function (req, res) {
    try {
      const productStockData = req.body;
      const newProductStockData = new ProductStockModel(productStockData);
      await newProductStockData.save();
      return res.json({
        success: true,
        message: "Product Stock Created",
        data: newProductStockData,
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  fecthAllProductStock: async function (req, res) {
    try {
      const fetchAllProductStock = await ProductStockModel.find();
      return res.json({ success: true, data: fetchAllProductStock });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },
};
module.exports = ProductStockController;


