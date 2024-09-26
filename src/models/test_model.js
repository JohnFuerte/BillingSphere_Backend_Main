const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
  itemGroup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ItemGroup",
    required: true,
  },
  itemBrand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ItemBrand",
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  printName: {
    type: String,
    required: true,
  },
  codeNo: {
    type: String,
    required: true,
  },
  taxCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TaxRate",
    required: true,
  },
  hsnCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HSN",
    required: true,
  },
  barcode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BarcodePrint",
    required: false,
  },
  storeLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StoreLocation",
    required: true,
  },
  measurementUnit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MeasurementUnit",
    required: true,
  },
  secondaryUnit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SecondaryUnit",
    required: true,
  },
  minimumStock: {
    type: Number,
    required: true,
  },
  maximumStock: {
    type: Number,
    required: true,
  },
  monthlySalesQty: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dealer: {
    type: Number,
    required: false,
    default: "",
  },
  subDealer: {
    type: Number,
    required: false,
    default: "",
  },
  retail: {
    type: Number,
    required: false,
    default: "",
  },
  mrp: {
    type: Number,
    required: false,
    default: "",
  },
  openingStock: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
    default: "",
  },
  images: [
    {
      data: {
        type: Buffer,
        required: true,
      },
      contentType: {
        type: String,
        required: true,
      },
      filename: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("TestImages", TestSchema);
