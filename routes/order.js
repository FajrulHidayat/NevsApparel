const express = require("express");
const { order } = require("../app/controllers");

const router = express.Router();
router.post("/", order.Order);
router.get("/AllOrder", order.getAllOrder);
router.get("/AllOrderByClient/:idClient", order.getAllOrderByIdClient);
router.get("/AllOrderByIdOrder/:idOrder", order.getAllOrderByIdOrder);
router.put("/updateStatusPayment/:idOrder", order.updateStatus);
router.put("/updateProcess/:idOrder", order.updateProcess);
router.put("/updatePaymentReceipt/:idOrder", order.UpdatePaymentReceipt);
router.delete("/", order.DeleteAllOrder);

module.exports = router;
