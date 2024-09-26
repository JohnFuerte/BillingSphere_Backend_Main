const { Schema, model } = require("mongoose");

const storeLocationSchema = new Schema({
  location: { type: String, required: [true, "Store location is required"] },
  updatedOn: { type: Date },
  createdOn: { type: Date },
});

storeLocationSchema.pre("save", function (next) {
  this.updatedOn = new Date();
  this.createdOn = new Date();
  next();
});

storeLocationSchema.pre(
  ["update", "findOneAndUpdate", "updateOne"],
  function (next) {
    const update = this.getUpdate();
    delete update._id;
    this.updatedOn = new Date();
    next();
  }
);

const StoreLocationModel = model("StoreLocation", storeLocationSchema);
module.exports = StoreLocationModel;
