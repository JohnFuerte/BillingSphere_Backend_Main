const Payment = require("../models/payment_model");

const PaymentController = {
  createPayment: async (req, res) => {
    try {
      const paymentData = req.body;
      const payment = new Payment(paymentData); // Create a new instance of Payment
      await payment.save(); // Save the payment instance to the database
      return res.status(201).json({ success: true, message: 'Payment saved successfully' });
    } catch (ex) {
      return res.status(500).json({ success: false, message: ex.message });
    }
  },

  getPayments: async (req, res) => {
    try {
      const payments = await Payment.find();
      res.json({ success: true, data: payments });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getPaymentById: async (req, res) => {
    try {
      const { id } = req.params;

      const payment = await Payment.findById(id);
      if (!payment) {
        return res.status(404).json({ success: false, error: "Entry not found" });
      }
      res.json({ success: true, data: payment });
    } catch (error) {
      res.json({ success: false, message: ex });
    }
  },

  updatePayment: async (req, res) => {
    try {
      const updatedPayment = await Payment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedPayment) {
        return res.status(404).json({ error: "Payment not found" });
      }
      res.status(200).json(updatedPayment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deletePayment: async (req, res) => {
    try {
      const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
      if (!deletedPayment) {
        return res.status(404).json({ error: "Payment not found" });
      }
      res.status(200).json({ message: "Payment deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = PaymentController;


