const StoreLocationModel = require("../models/store_location_model");

const StoreLocationController = {
  //For Creating Location wise store
  createStoreLocation: async function (req, res) {
    try {
      const storeLocationData = req.body;
      const newStoreLocation = new StoreLocationModel(storeLocationData);
      await newStoreLocation.save();
      return res.json({
        success: true,
        message: "Store location has been created",
        data: newStoreLocation,
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },
  //For fetching all store location

  fetchAllStoreLocaiton: async function (req, res) {
    try {
      const fetchStoreLocation = await StoreLocationModel.find();
      return res.json({ success: true, data: fetchStoreLocation });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  //For Fetching store locaiton by id

  fetchStoreLocationById: async function (req, res) {
    try {
      const id = req.params.id;
      const foundStoreById = await StoreLocationModel.findById(id);
      if (!foundStoreById) {
        return res.json({
          success: false,
          message: "Store location not found",
        });
      }
      return res.json({ success: true, data: foundStoreById });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },
};
module.exports = StoreLocationController;


