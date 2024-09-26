const SundryModel = require("../models/sundry_model");

const SundryController = {
    //For Creating Sundry

    createSundry: async function (req, res) {
        try {
            const sundryData = req.body;
            const newSundryData = new SundryModel(sundryData);
            await newSundryData.save();
            return res.json({ success: true, message: "Sundry Type Created", data: newSundryData });


        }
        catch (ex) {
            return res.json({ success: false, message: ex });
        }

    },

    //For fetching all type of sundry

    fetchAllSundryType: async function (req, res) {
        try {

            const sundryType = await SundryModel.find();
            return res.json({ success: true, data: sundryType });
        }
        catch (ex) {
            res.json({ success: false, message: ex });
        }
    },
    //For fetching sundry by id

    fetchSundryById: async function (req, res) {
        try {
            const id = req.params.id;
            const foundSundryById = await SundryModel.findById(id);
            if (!foundSundryById) {
                return res.json({ success: false, message: "Sundry not found" });
            }
            return res.json({ success: true, data: foundSundryById });

        }
        catch (ex) {
            res.json({ success: false, message: ex });
        }
    }
}
module.exports = SundryController;

