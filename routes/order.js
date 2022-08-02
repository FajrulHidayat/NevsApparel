const express = require("express");
const { order } = require("../app/controllers");

const router = express.Router();
router.post("/", order.Order);
router.get("/AllOrder", order.getAllOrder);
router.get("/AllOrderByClient/:idClient", order.getAllOrderByIdClient);
router.get("/AllOrderByIdOrder/:idOrder", order.getAllOrderByIdOrder);
router.get("/updateStatusPayment/:idOrder", order.updateStauts);

module.exports = router;
