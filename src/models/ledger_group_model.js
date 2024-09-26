const mongoose = require("mongoose");

const LedgerGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

LedgerGroupSchema.pre("remove", { document: true }, async function (next) {
  try {
    console.log(`Middleware executing for LedgerGroup ID: ${this._id}`);

    await this.model("Ledger").updateMany(
      { ledgerGroup: this._id },
      { $set: { ledgerGroup: null } }
    );

    console.log(`Update successful for LedgerGroup ID: ${this._id}`);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("LedgerGroup", LedgerGroupSchema);
