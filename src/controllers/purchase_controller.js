const PurchaseModel = require("../models/purchase_model");
const Items = require("../models/items_model");
const Ledger = require("../models/ledger_model");
const { get } = require("mongoose");

const PurchaseController = {
  // For creating purchase entry
  createPurchase: async function (req, res) {
    try {
      const purchaseData = req.body;
      purchaseData.totalamount = parseFloat(purchaseData.totalamount);
      purchaseData.cashAmount = parseFloat(purchaseData.cashAmount);
      purchaseData.dueAmount = parseFloat(purchaseData.dueAmount);
      const newPurchaseData = PurchaseModel(purchaseData);

      // Extract Data
      const ledgerID = purchaseData.ledger;
      const purchaseType = purchaseData.type;

      if (purchaseType === "Debit") {
        const ledger = await Ledger.findById(ledgerID);
        ledger.debitBalance += purchaseData.totalamount;
        await ledger.save();
      }

      if (purchaseType === "Cash") {
        newPurchaseData.cashAmount = purchaseData.totalamount;
      }

      const existingPurchase = await PurchaseModel.findOne({
        $or: [{ billNumber: req.body.billNumber }],
      });

      if (existingPurchase) {
        return res.json({
          success: false,
          message: "Bill No already exists.",
        });
      }

      await newPurchaseData.save();

      for (const entry of purchaseData.entries) {
        const productId = entry.itemName;
        const quantity = entry.qty;
        const sellingPrice = entry.sellingPrice;

        const product = await Items.findById(productId);

        if (!product) {
          return res.json({
            success: false,
            message: "Product not found.",
          });
        }

        await Items.updateOne(
          { _id: productId },
          { $inc: { maximumStock: quantity }, price: sellingPrice }
        );
      }

      return res.json({
        success: true,
        message: "Purchase entry created successfully!",
        data: newPurchaseData,
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  //  Get all purchase
  getAllpurchase: async function (req, res) {
    try {
      const purchase = await PurchaseModel.find({});
      return res.json({ success: true, data: purchase });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  //For Fetching all Purchase

  fetchAllPurchase: async function (req, res) {
    try {
      const { companyCode } = req.params;
      const fetchAllPurchase = await PurchaseModel.find({
        companyCode: companyCode,
      });
      return res.json({ success: true, data: fetchAllPurchase });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  //For Fetching purchase by id
  fetchPurchseById: async function (req, res) {
    try {
      const id = req.params.id;
      const foundPurchaseById = await PurchaseModel.findById(id);
      if (!foundPurchaseById) {
        return res.json({
          success: false,
          message: "Purchase entry not found.",
        });
      }
      return res.json({ success: true, data: foundPurchaseById });
    } catch (ex) {
      res.json({ success: false, message: ex });
    }
  },

  // For Fetching Purchase by Bill Number
  fetchPurchaseByBillNumber: async function (req, res) {
    try {
      const billNumber = req.params.billNumber;
      const foundPurchaseByBillNumber = await PurchaseModel.findOne({
        billNumber,
      });
      if (!foundPurchaseByBillNumber) {
        return res.json({
          success: false,
          message: "Purchase entry not found.",
        });
      }
      return res.json({ success: true, data: foundPurchaseByBillNumber });
    } catch (ex) {
      res.json({ success: false, message: ex });
    }
  },
  //For Deleting Purchase Entry

  deletePurchaseById: async function (req, res) {
    try {
      const id = req.params.id;
      const getPurchase = await PurchaseModel.findOne({ _id: id });
      const ledgerID = getPurchase.ledger;
      const purchaseType = getPurchase.type;
      const purchaseTotalAmount = parseFloat(getPurchase.totalamount);
      // purchaseData.cashAmount = parseFloat(purchaseData.cashAmount);
      const purchaseDueAmount = parseFloat(getPurchase.dueAmount);

      // Iterate over the entries of the purchase
      for (const entry of getPurchase.entries) {
        const productId = entry.itemName;
        const quantity = entry.qty;
        const product = await Items.findById(productId);
        // product.maximumStock -= quantity;
        // await product.save();

        if (!product) {
          return res.json({
            success: false,
            message: "product not found.",
          });
        }
        await Items.updateOne(
          { _id: productId },
          { $inc: { maximumStock: -quantity } }
        );
      }

      if (purchaseType === "Debit") {
        const ledger = await Ledger.findById(ledgerID);

        if (purchaseDueAmount == 0) {
          const op = ledger.openingBalance + purchaseTotalAmount;
          ledger.openingBalance = op;
        } else if (getPurchase.dueAmount > 0) {
          const op = purchaseTotalAmount - purchaseDueAmount;
          ledger.openingBalance = op;
        }
        await ledger.save();
      }

      const getPurchaseAndDelete = await PurchaseModel.findByIdAndDelete(id);

      if (!getPurchaseAndDelete) {
        return res.json({ success: false, message: "Purchase not found" });
      }
      return res.json({ success: true, message: "Deleted Successfully!" });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  //For updating Purchase Entry
  updatePurchase: async function (req, res) {
    try {
      const purchaseData = req.body;
      const currentPurchaseId = purchaseData.id;

      // Fetch current purchase entry and ledger
      const currentPurchase = await PurchaseModel.findById(currentPurchaseId);
      const currentPurchaseLedger = await Ledger.findById(purchaseData.ledger);

      if (!currentPurchase || !currentPurchaseLedger) {
        return res.status(404).json({
          success: false,
          message: "Purchase entry or ledger not found.",
        });
      }

      const {
        type: currentPurchaseTypeBeforeEdit,
        totalamount: totalAmountBeforeEdit,
        entries: currentEntriesBeforeUpdate,
      } = currentPurchase;

      const {
        type: currentPurchaseTypeAfterEdit,
        totalamount: totalAmountAfterEdit,
        entries: newEntries,
        cashAmount,
        dueAmount,
      } = purchaseData;

      const parsedTotalAmountBeforeEdit = parseFloat(totalAmountBeforeEdit);
      const parsedTotalAmountAfterEdit = parseFloat(totalAmountAfterEdit);
      const parsedCashAmount = parseFloat(cashAmount);
      const parsedDueAmount = parseFloat(dueAmount);

      // Update ledger balances based on sales type changes
      if (currentPurchaseTypeBeforeEdit === "DEBIT") {
        currentSalesLedger.debitBalance -= parsedTotalAmountBeforeEdit;
      } else if (currentPurchaseTypeBeforeEdit === "CASH") {
        currentPurchaseLedger.cashBalance -= parsedTotalAmountBeforeEdit;
      }

      if (currentPurchaseTypeAfterEdit === "DEBIT") {
        currentSalesLedger.debitBalance += parsedTotalAmountAfterEdit;
      } else if (currentPurchaseTypeAfterEdit === "CASH") {
        currentPurchaseLedger.cashBalance += parsedTotalAmountAfterEdit;
      }

      // Update stock quantities for removed items
      for (const entry of currentEntriesBeforeUpdate) {
        const { itemName, qty } = entry;
        await Items.updateOne(
          { _id: itemName },
          { $inc: { maximumStock: -qty } }
        );
      }

      // Update stock quantities for new items
      for (const entry of newEntries) {
        const { itemName, qty } = entry;
        await Items.updateOne(
          { _id: itemName },
          { $inc: { maximumStock: qty } }
        );
      }

      // Update sales entry with new data from req.body
      currentPurchase.type = currentPurchaseTypeAfterEdit;
      currentPurchase.totalamount = parsedTotalAmountAfterEdit;
      currentPurchase.cashAmount = parsedCashAmount;
      currentPurchase.dueAmount = parsedDueAmount;
      currentPurchase.entries = newEntries;

      // Save the updated sales entry
      await currentPurchase.save();

      // Save the updated ledger
      await currentPurchaseLedger.save();

      return res.json({ success: true, data: currentPurchase });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },
};

module.exports = PurchaseController;
