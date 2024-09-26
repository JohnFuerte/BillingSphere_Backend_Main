const mongoose = require("mongoose");

const barcodePrintSchema = new mongoose.Schema({
  barcode: {
    type: String,
    required: [true, "Please provide barcode number."],
  },
});

module.exports = mongoose.model("BarcodePrint", barcodePrintSchema);
