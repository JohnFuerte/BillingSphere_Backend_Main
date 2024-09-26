const mongoose = require("mongoose");

const DeliveryChallanSchema = new mongoose.Schema({
  no: {
    type: Number,
    required: [true, "Please provide a number for this sales entry."],
  },
  date: {
    type: String,
    required: [true, " provide a date for this sales entry."],
  },
  companyCode: {
    type: String,
    ref: "NewCompany",
    required: true,
  },
  type: {
    type: String,
    trim: true,
    required: [true, "Please provide a type for this sales entry."],
  },
  party: {
    type: String,
    trim: true,
    required: [true, "Please provide a party for this sales entry."],
  },
  place: {
    type: String,
    trim: true,
    required: [true, "Please provide a place for this sales entry."],
  },
  ledger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ledger",
    required: true,
  },
  dcNo: {
    type: String,
    trim: true,
    required: [true, "Please provide a DC No for this sales entry."],
  },
  date2: {
    type: String,
    required: [true, "Please provide a date for this sales entry."],
  },
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
      netAmount: {
        type: Number,
        required: [true, "Please provide a net amount for this sales entry."],
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
  remark: {
    type: String,
    trim: true,
    required: [false, "Please provide a remark for this sales entry."],
  },
  totalamount: {
    type: String,
    required: [true, "Please provide a date for this sales entry."],
  },
});

module.exports = mongoose.model("DeliveryChallan", DeliveryChallanSchema);
