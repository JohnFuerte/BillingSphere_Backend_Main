const mongoose = require("mongoose");

const ItemsBrandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

ItemsBrandSchema.pre("remove", { document: true }, async function (next) {
  try {
    console.log(`Middleware executing for ItemBrand ID: ${this._id}`);

    await this.model("Items").updateMany(
      { itemBrand: this._id },
      { $set: { itemBrand: null } }
    );

    console.log(`Update successful for ItemsBrand ID: ${this._id}`);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("ItemsBrand", ItemsBrandSchema);
