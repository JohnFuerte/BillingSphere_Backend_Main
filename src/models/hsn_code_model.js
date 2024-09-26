const { Schema, model } = require("mongoose");

const hsnCodeSchema = new Schema({
  hsn: { type: String, required: [true, "hsn is required"] },
  description: { type: String, required: [false, "description"] },
  updatedOn: { type: Date },
  createdOn: { type: Date },
});

hsnCodeSchema.pre("save", function (next) {
  this.updatedOn = new Date();
  this.createdOn = new Date();
  next();
});

hsnCodeSchema.pre(["update", "findOneAndUpdate", "updateOne"], function (next) {
  const update = this.getUpdate();
  delete update._id;
  this.updateOn = new Date();
  next();
});

const HSNModel = model("HSN", hsnCodeSchema);
module.exports = HSNModel;
