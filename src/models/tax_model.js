const { Schema, model } = require("mongoose");

const taxRateSchema = new Schema({
  rate: { type: String, required: [true, "tax rate is required"] },
  updatedOn: { type: Date, default: Date.now },
  createdOn: { type: Date, default: Date.now },
});

taxRateSchema.pre("save", function (next) {
  this.updateOn = new Date();
  this.createdOn = new Date();
  next();
});

taxRateSchema.pre(["update", "findOneAndUpdate", "updateOne"], function (next) {
  const update = this.getUpdate();
  delete update._id;
  this.updateOn = new Date();
  next();
});

const TaxModel = model("TaxRate", taxRateSchema);
module.exports = TaxModel;
