const user = require("./UserController");
const order = require("./OrderController");
const motif = require("./MotifController");
const checkout = require("./CheckoutController");

const controller = {
  user,
  order,
  motif,
  checkout,
};

module.exports = controller;
