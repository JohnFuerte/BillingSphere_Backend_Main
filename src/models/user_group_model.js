const mongoose = require("mongoose");

// Define the schema
const userGroupSchema = new mongoose.Schema({
  userGroupName: { type: String, required: true },
  ownerGroup: { type: String, default: "" },
  misReport: { type: String, default: "" },
  report: { type: String, default: "" },
  addMaster: { type: String, default: "" },
  editMaster: { type: String, default: "" },
  deleteMaster: { type: String, default: "" },
  purchase: { type: String, default: "" },
  sales: { type: String, default: "" },
  purchaseReturn: { type: String, default: "" },
  salesReturn: { type: String, default: "" },
  stock: { type: String, default: "" },
  shortage: { type: String, default: "" },
  jobcard: { type: String, default: "" },
  receiptNote: { type: String, default: "" },
  deliveryNote: { type: String, default: "" },
  purchaseOrder: { type: String, default: "" },
  salesOrder: { type: String, default: "" },
  salesQuotation: { type: String, default: "" },
  purchaseEnquiry: { type: String, default: "" },
  journal: { type: String, default: "" },
  conta: { type: String, default: "" },
  receipt2: { type: String, default: "" },
  payment: { type: String, default: "" },
});

// Create model
const UserGroup = mongoose.model("UserGroup", userGroupSchema);

module.exports = UserGroup;
