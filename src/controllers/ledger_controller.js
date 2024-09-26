const Ledger = require("../models/ledger_model");

//For Creating Ledger
const createLedger = async (req, res) => {
  try {
    const lowercaseName = req.body.name.toLowerCase();

    const existingLedger = await Ledger.findOne({
      $or: [
        { name: { $regex: new RegExp("^" + lowercaseName + "$", "i") } },
        { ledgerCode: req.body.ledgerCode },
      ],
    });

    if (existingLedger) {
      return res.json({
        success: false,
        message: "Ledger name or code already exists.",
      });
    }

    const ledger = await Ledger.create(req.body);

    return res.json({ success: true, message: "Ledger Created", data: ledger });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

//For updating Ledger
const updateLedger = async (req, res) => {
  try {
    const ledger = await Ledger.updateOne({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!ledger) {
      return res.json({ success: false, message: "Ledger not found" });
    }
    return res.json({ success: true, data: ledger });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

//For Deleting Ledger
const deleteLedger = async (req, res) => {
  try {
    const ledger = await Ledger.findOneAndUpdate(
      { _id: req.params.id },
      { status: "No" },
      { new: true }
    );

    if (!ledger) {
      return res.json({ success: false, message: "Ledger not found" });
    }

    return res.json({
      success: true,
      message: "Ledger status updated successfully",
    });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

const getAllLedger = async (req, res) => {
  try {
    const ledgers = await Ledger.find({});
    return res.json({ success: true, data: ledgers });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

const getSingleLedger = async (req, res) => {
  try {
    const ledger = await Ledger.findOne({ _id: req.params.id });
    if (!ledger) {
      return res.json({ success: false, message: "Ledger not found" });
    }
    return res.json({ success: true, data: ledger });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

module.exports = {
  createLedger,
  updateLedger,
  deleteLedger,
  getAllLedger,
  getSingleLedger,
};
