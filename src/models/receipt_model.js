const mongoose = require("mongoose");

const ReceiptSchema = new mongoose.Schema({
  entryType: {
    type: String,
    required: [true, "Please provide an entry type for this receipt."],
  },
  ledgerName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ledger",
    required: [true, "Please provide a ledger name for this receipt."],
  },
  remark: {
    type: String,
    required: [false],
  },
  debit: {
    type: Number,
    required: [false],
  },
  credit: {
    type: Number,
    required: [false],
  },
});

const ReceiptModel = mongoose.model("Receipt", ReceiptSchema);

module.exports = ReceiptModel;
