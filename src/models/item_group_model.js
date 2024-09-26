const mongoose = require("mongoose");

const ItemsGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: false,
  },
  images: [
    {
      data: {
        type: Buffer,
        required: false,
      },
      contentType: {
        type: String,
        required: false,
      },
      filename: {
        type: String,
        required: false,
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

ItemsGroupSchema.pre("remove", { document: true }, async function (next) {
  try {
    console.log(`Middleware executing for ItemGroup ID: ${this._id}`);

    await this.model("Items").updateMany(
      { itemGroup: this._id },
      { $set: { itemGroup: null } }
    );

    console.log(`Update successful for ItemsGroup ID: ${this._id}`);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("ItemsGroup", ItemsGroupSchema);
