const DailyCashEntry = require("../models/daily_cash_model");

const createDailyCash = async (req, res) => {
    try {
        const newDailyCashData = req.body;
        const newDailyCash = await DailyCashEntry.create(newDailyCashData);
        res.json({ success: true, data: newDailyCash });
    } catch (ex) {
        res.json({ success: false, message: ex });
    }
};

const updateDailyCash = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedDailyCashData = req.body;
        const updatedDailyCash = await DailyCashEntry.findByIdAndUpdate(id, updatedDailyCashData, {
            new: true,
            runValidators: true,
        });
        if (!updatedDailyCash) {
            return res.status(404).json({ success: false, error: "Entry not found" });
        }
        res.json({ success: true, data: updatedDailyCash });
    } catch (ex) {
        res.json({ success: false, message: ex });
    }
};

const getAllDailyCashEntries = async (req, res) => {
    try {
        const dailyCashEntries = await DailyCashEntry.find();
        res.json({ success: true, data: dailyCashEntries });
    } catch (ex) {
        res.json({ success: false, message: ex });
    }
};

const getDailyCashEntryById = async (req, res) => {
    try {
        const { id } = req.params;
        const dailyCashEntry = await DailyCashEntry.findById(id);
        if (!dailyCashEntry) {
            return res.status(404).json({ success: false, error: "Entry not found" });
        }
        res.json({ success: true, data: dailyCashEntry });
    } catch (ex) {
        res.json({ success: false, message: ex });
    }
};
const deleteDailyCashEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDailyCash = await DailyCashEntry.findByIdAndDelete(id);
        if (!deletedDailyCash) {
            return res.status(404).json({ success: false, error: "Entry not found" });
        }
        res.json({ success: true, data: deletedDailyCash });
    } catch (ex) {
        res.json({ success: false, message: ex });
    }
};

module.exports = {
    createDailyCash,
    updateDailyCash,
    getAllDailyCashEntries,
    getDailyCashEntryById,
    deleteDailyCashEntry,
};
