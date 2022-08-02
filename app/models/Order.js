const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  idClient: {
    type: String,
    required: true,
  },
  orderEmail: {
    type: String,
    required: true,
  },
  orderName: {
    type: String,
  },
  orderPhone: {
    type: String,
  },
  pickUpDate: {
    type: String,
  },
  fontPlayerName: {
    type: String,
  },
  fontBackNumber: {
    type: String,
  },
  cloth: {
    type: String,
  },
  motive: {
    type: String,
  },
  players: [
    {
      name: String,
      backNumber: String,
      size: String,
    },
  ],
  sample: {
    type: String,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
