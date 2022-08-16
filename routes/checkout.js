const express = require("express");
const { checkout } = require("../app/controllers");

const router = express.Router();
router.post("/", checkout.CreateCheckout);
router.get("/AllCheckout", checkout.getAllCheckout);
router.get("/AllCheckoutByClient/:idClient", checkout.getAllCheckoutByIdClient);
router.get("/AllCheckoutByIdCheckout/:id", checkout.getAllCheckoutByIdCheckout);
router.put("/updateStatusPayment/:id", checkout.updateStatus);
router.put("/updatePaymentReceipt/:id", checkout.UpdatePaymentReceipt);

module.exports = router;
