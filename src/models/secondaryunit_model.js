const { Schema, model } = require("mongoose");

const secondaryUnitSchema = new Schema({
  secondaryUnit: {
    type: String,
    required: [true, "secondary unit is required"],
  },
  updatedOn: { type: Date },
  createdOn: { type: Date },
});

secondaryUnitSchema.pre("save", function (next) {
  this.updateOn = new Date();
  this.createdOn = new Date();
  next();
});

secondaryUnitSchema.pre(
  ["update", "findOneAndUpdate", "updateOne"],
  function (next) {
    const update = this.getUpdate();
    delete update._id;
    this.updateOn = new Date();
    next();
  }
);

const SecondaryUnitModel = model("SecondaryUnit", secondaryUnitSchema);
module.exports = SecondaryUnitModel;
