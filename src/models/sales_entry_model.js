const mongoose = require("mongoose");

const SalesEntrySchema = new mongoose.Schema({
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
  dcNo: {
    type: String,
    trim: true,
    required: [true, "Please provide a DC No for this sales entry."],
  },
  date2: {
    type: String,
    required: [true, "Please provide a date for this sales entry."],
  },
  totalamount: {
    type: String,
    required: [true, "Please provide a date for this sales entry."],
  },
  dueAmount: { type: String, default: "0" },
  cashAmount: { type: String, default: "0" },
  roundoffDiff: { type: Number, default: "0.00" },

  entries: [
    {
      itemName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Items",
        required: [true, "Please provide a item name for this sales entry."],
      },
      additionalInfo: {
        type: String,
        required: [false, "Please provide a additionalInfo for this sales entry."],
      },
      qty: {
        type: Number,
        required: [true, "Please provide a quantity for this sales entry."],
      },
      baseRate: {
        type: Number,
        required: [true, "Please provide a baseRate for this sales entry."],
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
      discount: {
        type: Number,
        required: [true, "Please provide a discount for this sales entry."],
      },
      originaldiscount: {
        type: Number,
        required: [true, "Please provide a originaldiscount for this sales entry."],
      },
      sgst: {
        type: Number,
        required: [true, "Please provide a sgst for this sales entry."],
      },
      cgst: {
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
  dispatch: [
    {
      transAgency: { type: String, required: false },
      docketNo: { type: String, required: false },
      vehicleNo: { type: String, required: false },
      fromStation: { type: String, required: false },
      fromDistrict: { type: String, required: false },
      transMode: { type: String, required: false },
      parcel: { type: String, required: false },
      freight: { type: String, required: false },
      kms: { type: String, required: false },
      toState: { type: String, required: false },
      ewayBill: { type: String, required: false },
      billingAddress: { type: String, required: false },
      shippedTo: { type: String, required: false },
      shippingAddress: { type: String, required: false },
      phoneNo: { type: String, required: false },
      gstNo: { type: String, required: false },
      remarks: { type: String, required: false },
      licenceNo: { type: String, required: false },
      issueState: { type: String, required: false },
      name: { type: String, required: false },
      address: { type: String, required: false },
    },
  ],

  multimode: [
    {
      cash: { type: Number, required: false },
      debit: { type: Number, required: false },
      adjustedamount: { type: Number, required: false },
      pending: { type: Number, required: false },
      finalamount: { type: Number, required: false },
    }
  ],
  moredetails: [
    {
      advpayment: { type: String, required: false },
      advpaymentdate: { type: String, required: false },
      installment: { type: String, required: false },
      toteldebitamount: { type: String, required: false },
    }
  ],

  remark: {
    type: String,
    trim: true,
    required: [false, "Please provide a remark for this sales entry."],
  },
});

module.exports = mongoose.model("SalesEntry", SalesEntrySchema);
