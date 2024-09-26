const mongoose = require("mongoose");
const purchaseSchema = new mongoose.Schema({
  no: { type: String, required: true },
  companyCode: {
    type: String,
    ref: "NewCompany",
    required: true,
  },
  date: { type: String, required: true },
  date2: { type: String, required: true },
  type: { type: String, required: true },
  ledger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ledger",
    required: true,
  },
  place: { type: String, required: true },
  billNumber: { type: String, required: true },
  remarks: { type: String },
  totalamount: { type: String },
  cashAmount: { type: String },
  dueAmount: { type: String },
  roundoffDiff: { type: Number, default: "0.00" },
  entries: [
    {
      itemName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Items",
        required: [true, "Please provide a item name for this sales entry."],
      },
      qty: {
        type: Number,
        required: [true, "Please provide a quantity for this sales entry."],
      },
      rate: {
        type: Number,
        required: [true, "Please provide a rate for this sales entry."],
      },
      unit: {
        type: String,
        required: [true, "Please provide a unit for this sales entry."],
      },
      amount: {
        type: Number,
        required: [true, "Please provide a amount for this sales entry."],
      },
      tax: {
        type: String,
        required: [true, "Please provide a tax for this sales entry."],
      },
      sgst: {
        type: Number,
        required: [true, "Please provide a sgst for this sales entry."],
      },
      cgst: {
        type: Number,
        required: [true, "Please provide a cgst for this sales entry."],
      },
      discount: {
        type: Number,
        required: [true, "Please provide a cgst for this sales entry."],
      },
      igst: {
        type: Number,
        required: [true, "Please provide a igst for this sales entry."],
      },
      netAmount: {
        type: Number,
        required: [true, "Please provide a net amount for this sales entry."],
      },
      sellingPrice: {
        type: Number,
        required: [
          true,
          "Please provide a selling price for this sales entry.",
        ],
      },
    },
  ],
  sundry: [
    {
      sundryName: {
        type: String,
        required: [true, "Please provide a ledger for this sales entry."],
      },
      amount: {
        type: Number,
        required: [true, "Please provide a amount for this sales entry."],
      },
    },
  ],
});

const PurchaseModel = mongoose.model("Purchase", purchaseSchema);
module.exports = PurchaseModel;
