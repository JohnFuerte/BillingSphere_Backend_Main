const mongoose = require("mongoose");

const sundrySchema = new  mongoose.Schema({
    sundryName: { type: String, required: true },
    sundryAmount: { type: Number, required: true },

});

const SundryModel = mongoose.model("Sundry",sundrySchema);
module.exports = SundryModel;