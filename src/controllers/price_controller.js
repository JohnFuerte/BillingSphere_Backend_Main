const PriceModel = require("../models/price_model");

const PriceController = {
  //For Creating Price Type
  createPriceType: async function (req, res) {
    try {
      const priceTypeData = req.body;
      const newPriceType = new PriceModel(priceTypeData);
      await newPriceType.save();
      return res.json({
        success: true,
        message: "Price Type Created",
        data: newPriceType,
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },
  //For fetching all type of price
  fetchAllPriceType: async function (req, res) {
    try {
      const { user_id } = req.params;
      const priceType = await PriceModel.find({ user_id: user_id });
      return res.json({ success: true, data: priceType });
    } catch (ex) {
      res.json({ success: false, message: ex });
    }
  },
  //Fetching Price Type by Id
  fetchPriceTypeById: async function (req, res) {
    try {
      const id = req.params.id;
      const foundPriceType = await PriceModel.findById(id);
      if (!foundPriceType) {
        return res.json({ success: false, message: "Price Type not found" });
      }
      return res.json({ success: true, data: foundPriceType });
    } catch (ex) {
      res.json({ success: false, message: ex });
    }
  },
};
module.exports = PriceController;


