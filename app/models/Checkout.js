const mongoose = require("mongoose");

const CheckoutSchema = mongoose.Schema({
  idClient: {
    type: String,
    required: true,
  },
  idOrder: [String],
  payStatus: {
    type: String,
  },
  paymentReceipt: { type: String },
  price: { type: Number },
});

module.exports = mongoose.model("Checkout", CheckoutSchema);
