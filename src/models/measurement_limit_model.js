const { Schema, model } = require("mongoose");

const measurementLimitSchema = new Schema({
  measurement: { type: String, required: [true, "measurement is required"] },
  updatedOn: { type: Date },
  createdOn: { type: Date },
});

measurementLimitSchema.pre("save", function (next) {
  this.updateOn = new Date();
  this.createdOn = new Date();
  next();
});

measurementLimitSchema.pre(
  ["update", "findOneAndUpdate", "updateOne"],
  function (next) {
    const update = this.getUpdate();
    delete update._id;
    this.updateOn = new Date();
    next();
  }
);

const MeasurementLimitModel = model("MeasurementLimit", measurementLimitSchema);
module.exports = MeasurementLimitModel;
