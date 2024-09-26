const { Schema, model, mongoose } = require("mongoose");

const priceSchema = new Schema({
  companyCode: {
    type: String,
    ref: "NewCompany",
    required: true,
},
priceCategoryType: {
    type: String,
    required: [true, "price category is required"],
  },
  updatedOn: { type: Date },
  createdOn: { type: Date },
});

priceSchema.pre("save", function (next) {
  this.updateOn = new Date();
  this.createdOn = new Date();
  next();
});

priceSchema.pre(["update", "findOneAndUpdate", "updateOne"], function (next) {
  const update = this.getUpdate();
  delete update._id;
  this.updateOn = new Date();
  next();
});

const PriceModel = model("Price", priceSchema);
module.exports = PriceModel;
