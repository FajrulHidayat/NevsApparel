const express = require("express");
const { order } = require("../app/controllers");

const router = express.Router();
router.post("/", order.Order);
router.get("/AllOrder", order.getAllOrder);

module.exports = router;
