const LedgerGroup = require("../models/ledger_group_model");

const createLedgerGroup = async (req, res) => {
  try {
    const ledgerGroup = await LedgerGroup.create(req.body);
    return res.json({
      success: true,
      message: "Ledger Group Created",
      data: ledgerGroup,
    });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

const deleteLedgerGroup = async (req, res) => {
  try {
    const ledgerGroup = await LedgerGroup.findByIdAndDelete(req.params.id);

    if (!ledgerGroup) {
      return res.json({ success: false, message: "Ledger group not found" });
    }
    return res.json({
      success: true,
      message: "Ledger Group Deleted Successfully!",
    });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

const getAllLedgerGroup = async (req, res) => {
  try {
    const { companyCode } = req.params;

    const ledgerGroups = await LedgerGroup.find({ companyCode: companyCode });
    return res.json({ success: true, data: ledgerGroups });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};


const getSingleLedgerGroup = async (req, res) => {
  try {
    const ledgerGroups = await LedgerGroup.findOne({ _id: req.params.id });
    if (!ledgerGroups) {
      return res.json({ success: false, message: "Ledger Group not found" });
    }
    return res.json({ success: true, data: ledgerGroups });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};


module.exports = { createLedgerGroup, deleteLedgerGroup, getAllLedgerGroup, getSingleLedgerGroup };


